<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import type { StatesResponse } from '@/types/pb-types';
import { ELEMENT_NODE, parse, render, walk } from '@michaelhthomas/fluxhtml';
import { parse as parseCSV } from '@std/csv';
import { useForm } from 'vee-validate';

const props = defineProps<{
	title: string;
	description: string;
}>();

const pb = usePocketBase();
const { toast } = useToast();
const redis = useRedis();

const turnsData = ref<TurnsResponse<unknown>[]>(
	await useCachedData('turnsDataTurnEnd', 'turns', 1800, {
		fields: ['id,value']
	})
);

const statesData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
	await useCachedData('statesDataTurnEnd', 'states', 1800, {
		fields: ['turn']
	})
);

const turns = ref(turnsData.value.slice().reverse());
const turn = ref(turns.value[0]);

const statesFromPreviousTurn = statesData.value.filter(state => state.turn === turns.value[1].id);

const CSVFilesForms = [
	createCSVForm('statesCSV', 'Państw', 'get-states-csv', 'Plik CSV'),
	createCSVForm('burgsCSV', 'Miast', 'get-burgs-csv', 'Plik CSV'),
	createCSVForm('culturesCSV', 'Kultur', 'get-cultures-csv', 'Plik CSV'),
	createCSVForm('religionsCSV', 'Religii', 'get-religions-csv', 'Plik CSV'),
	createCSVForm('provincesCSV', 'Prowincje', 'get-provinces-csv', 'Plik CSV'),
	createCSVForm('relationsCSV', 'Relacje dyplomatyczne', 'get-provinces-csv', 'Plik CSV')
];

const GroupedCSVFilesForms = [
	createCSVForm(
		'statesByNumberOfCellsGroupedByBiomeCSV',
		'Biomy',
		'get-cells-grouped-biomes-csv',
		'Pliki CSV ilości kratek państw pogrupowane na'
	),
	createCSVForm(
		'statesByNumberOfCellsGroupedByCulturesCSV',
		'Kultury',
		'get-cells-grouped-cultures-csv',
		'Pliki CSV ilości kratek państw pogrupowane na'
	),
	createCSVForm(
		'statesByNumberOfCellsGroupedByReligionsCSV',
		'Religie',
		'get-cells-grouped-religions-csv',
		'Pliki CSV ilości kratek państw pogrupowane na'
	)
];

const CellsCSVFilesForms = [
	createCSVForm(
		'religionsByNumberOfCellsCSV',
		'Religie',
		'get-cells-religions-csv',
		'Pliki CSV ilości kratek jakie posiadają'
	),
	createCSVForm(
		'provincesByNumberOfCellsCSV',
		'Prowincje',
		'get-cells-provinces-csv',
		'Pliki CSV ilości kratek jakie posiadają'
	)
];

const { handleSubmit } = useForm({
	validationSchema: turnEndFormSchema,
	initialValues: {
		turn: turn.value.value
	}
});

const svgMaps = {
	state: new Map<string, string>(),
	province: new Map<string, string>(),
	burg: new Map<string, string>()
};

const onSubmit = handleSubmit(async values => {
	svgMaps.state.clear();
	svgMaps.province.clear();
	svgMaps.burg.clear();

	const statesData = await parseCSVFile(values.statesCSV);
	const burgsData = await parseCSVFile(values.burgsCSV);
	const culturesData = await parseCSVFile(values.culturesCSV);
	const religionsData = await parseCSVFile(values.religionsCSV);
	const provincesData = await parseCSVFile(values.provincesCSV);
	const relationsData = await parseCSVFile(values.relationsCSV);
	const statesByNumberOfCellsGroupedByBiomeData = await parseCSVFile(
		values.statesByNumberOfCellsGroupedByBiomeCSV
	);
	const statesByNumberOfCellsGroupedByReligionsData = await parseCSVFile(
		values.statesByNumberOfCellsGroupedByReligionsCSV
	);
	const statesByNumberOfCellsGroupedByCulturesData = await parseCSVFile(
		values.statesByNumberOfCellsGroupedByCulturesCSV
	);
	const religionsByNumberOfCellsData = await parseCSVFile(values.religionsByNumberOfCellsCSV);
	const provincesByNumberOfCellsData = await parseCSVFile(values.provincesByNumberOfCellsCSV);

	if (
		!statesData ||
		!burgsData ||
		!culturesData ||
		!religionsData ||
		!provincesData ||
		!relationsData ||
		!statesByNumberOfCellsGroupedByBiomeData ||
		!statesByNumberOfCellsGroupedByReligionsData ||
		!statesByNumberOfCellsGroupedByCulturesData ||
		!religionsByNumberOfCellsData ||
		!provincesByNumberOfCellsData ||
		!values.emblemsHTML
	)
		return;

	// TODO: uprościć ten pierdolnik
	// =============================================================================
	const relationsFinalData = relationsData.reduce((acc, relation) => {
		const state = relation[''];
		const { ['']: _1, [state]: _2, ...rest } = relation;
		acc[state] = rest;
		return acc;
	}, {});

	const statesByNumberOfCellsGroupedByCulturesFinalData =
		statesByNumberOfCellsGroupedByCulturesData.reduce((acc, current) => {
			acc[current.Name] = acc[current.Name] || {};
			acc[current.Name][current.Group] = current.Value;
			return acc;
		}, {});

	const statesByNumberOfCellsGroupedByReligionsFinalData =
		statesByNumberOfCellsGroupedByReligionsData.reduce((acc, current) => {
			acc[current.Name] = acc[current.Name] || {};
			acc[current.Name][current.Group] = current.Value;
			return acc;
		}, {});

	const statesByNumberOfCellsGroupedByBiomeFinalData =
		statesByNumberOfCellsGroupedByBiomeData.reduce((acc, current) => {
			acc[current.Name] = acc[current.Name] || {};
			acc[current.Name][current.Group] = current.Value;
			return acc;
		}, {});

	const religionsCellsFinalData = religionsByNumberOfCellsData.reduce((acc, current) => {
		acc[current.Name] = current.Value;
		return acc;
	}, {});

	const provincesCellsFinalData = provincesByNumberOfCellsData.reduce((acc, current) => {
		acc[current.Name] = current.Value;
		return acc;
	}, {});
	// =============================================================================

	const startTimeAll = new Date().getTime();

	let startTime = new Date().getTime();

	try {
		const fileContent = await readFileAsync(values.emblemsHTML);
		const ast = parse(fileContent as string);

		await walk(ast, async node => {
			if (node.type === ELEMENT_NODE && node.name === 'figure' && node.attributes.id) {
				const id = node.attributes.id;
				if (id.includes('state')) await extractSVG(node, 'state');
				else if (id.includes('province')) await extractSVG(node, 'province');
				else if (id.includes('burg')) await extractSVG(node, 'burg');
			}
		});
	} catch (error) {
		toast({
			title: 'Błąd parsowaniu pliku HTML Emblemów!',
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	}

	let endTime = new Date().getTime();

	toast({
		title: 'Emblemy zostały przepracowane',
		description: `Przepracowano ${svgMaps.burg.size + svgMaps.province.size + svgMaps.state.size} emblemów w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});

	const religionsResponses = await useProcessEndTurnCollectionsData(
		'religions',
		religionsData,
		religion => ({
			name: religion.Name,
			turn: turn.value.id,
			color: religion.Color,
			cells: religionsCellsFinalData[religion.Name],
			type: religion.Type,
			form: religion.Form,
			supremeDeity: religion['Supreme Deity'],
			population: parseInt(religion.Believers)
		}),
		'Religie'
	);

	const culturesResponses = await useProcessEndTurnCollectionsData(
		'cultures',
		culturesData,
		culture => ({
			name: culture.Name,
			turn: turn.value.id,
			color: culture.Color,
			cells: culture.Cells,
			type: culture.Type,
			population: parseInt(culture.Population),
			namesbase: culture.Namesbase
		}),
		'Kultury'
	);

	const statesResponses = await useProcessEndTurnCollectionsData(
		'states',
		statesData,
		state => {
			const stateFromPreviousTurn = statesFromPreviousTurn.find(s => s.name === state.State);
			const user = stateFromPreviousTurn?.user || null;

			return {
				user: user,
				turn: turn.value.id,
				name: state.State,
				nameFull: state['Full Name'],
				form: state.Form,
				color: state.Color,
				cells: parseInt(state.Cells),
				burgs: parseInt(state.Burgs),
				urbanPopulation: parseInt(state['Urban Population']),
				ruralPopulation: parseInt(state['Rural Population']),
				capital: state.Capital,
				culture: culturesResponses[state.Culture],
				culturesCells: statesByNumberOfCellsGroupedByCulturesFinalData[state.State],
				religionsCells: statesByNumberOfCellsGroupedByReligionsFinalData[state.State],
				biomesCells: statesByNumberOfCellsGroupedByBiomeFinalData[state.State],
				relations: relationsFinalData[state.State],
				emblemSVG: svgMaps.state.get(state['Full Name'])
			};
		},
		'Państwa'
	);

	const provincesResponses = await useProcessEndTurnCollectionsData(
		'provinces',
		provincesData,
		province => ({
			turn: turn.value.id,
			name: province.Province,
			nameFull: province['Full Name'],
			state: statesResponses[province.State],
			color: province.Color,
			cells: parseInt(provincesCellsFinalData[province.Province]),
			burgs: parseInt(province.Burgs),
			ruralPopulation: parseInt(province['Rural Population']),
			urbanPopulation: parseInt(province['Urban Population']),
			capital: province.Capital,
			form: province.Form,
			emblemSVG: svgMaps.province.get(province['Full Name'])
		}),
		'Prowincje'
	);

	await useProcessEndTurnCollectionsData(
		'burgs',
		burgsData,
		burg => ({
			turn: turn.value.id,
			name: burg.Burg,
			province: provincesResponses[burg.Province],
			state: statesResponses[burg.State],
			culture: culturesResponses[burg.Culture],
			religion: religionsResponses[burg.Religion],
			population: parseInt(burg.Population),
			isCapital: burg.Capital === 'capital',
			isPort: burg.Port === 'port',
			isCitadel: burg.Citadel === 'citadel',
			isWalls: burg.Walls === 'walls',
			isPlaza: burg.Plaza === 'plaza',
			isTemple: burg.Temple === 'temple',
			isShantyTown: burg['Shanty Town'] === 'shanty town',
			cityGeneratorLink: burg['City Generator Link'],
			emblemSVG: svgMaps.burg.get(burg.Burg)
		}),
		'Miasta'
	);

	// FIXME: Poprawić drawio, żeby znowu odwzorowywał obecną bazę danych

	// TODO: uprościć ten pierdolnik 2
	// =============================================================================
	startTime = new Date().getTime();
	try {
		turn.value = await pb.collection('turns').create({ value: turn.value.value + 1 });
		await redis.del('turnsDataTurnEnd');
	} catch (error) {
		toast({
			title: `Błąd przy tworzeniu następnej tury!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	}

	try {
		turns.value = await pb.collection('turns').getFullList({ sort: '-value' });
		await redis.del('turnsDataTurnEnd');
	} catch (error) {
		toast({
			title: `Błąd przy tworzeniu nowej listy tur!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	}

	await pb
		.collection('maps')
		.create({
			turn: turn.value.id,
			name: values.map.name.split(/ (?=\d{4}-\d{2}-\d{2}-\d{2}-\d{2})/)[0],
			file: values.map
		})
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy tworzeniu mapy!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});
	endTime = new Date().getTime();
	const endTimeAll = new Date().getTime();

	toast({
		title: 'Mapa i nowa tura zostały dodane!',
		description: `Dodano mapę i nową turę w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});
	// =============================================================================

	toast({
		title: 'Udało się zakończyć turę!',
		description: `Zakończono turę w czasie: ${((endTimeAll - startTimeAll) / 1000).toFixed(3)} s`
	});
});

async function parseCSVFile(file: File) {
	try {
		return parseCSV(await file.text(), {
			skipFirstRow: true
		});
	} catch (error) {
		if (error instanceof Error) {
			toast({
				title: 'Błąd przy parsowaniu pliku CSV!',
				description: `${error.name}: ${error.message}`
			});
			throw error;
		} else
			toast({
				title: 'Błąd przy parsowaniu pliku CSV!',
				description: 'Nieznany błąd.'
			});
	}
}

function createCSVForm(name: string, label: string, gif: string, title: string) {
	return {
		name,
		label,
		gif,
		get title() {
			return `${title} ${this.label}`;
		}
	};
}

async function extractSVG(node: any, type: keyof typeof svgMaps) {
	const fullName: string =
		type === 'burg'
			? node.children[0].children[0]?.value
			: node.children[0].children[0].children[0]?.value;
	const svg = await render(type === 'burg' ? node.children[1] : node.children[0].children[1]);
	if (fullName) svgMaps[type].set(fullName, svg);
}

async function readFileAsync(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsText(file);
	});
}
</script>

<template>
	<div>
		<Card>
			<CardHeader>
				<CardTitle>
					{{ props.title }} Numer <span class="text-primary">{{ turn.value }}</span>
				</CardTitle>

				<CardDescription> {{ props.description }} </CardDescription>
			</CardHeader>

			<Separator />

			<CardContent class="space-y-2 py-6">
				<form @submit.prevent="onSubmit">
					<Separator class="mb-9" label="Pliki CSV" />

					<div class="grid grid-cols-3 gap-6">
						<FormField
							v-slot="{ componentField }"
							:name="form.name"
							v-for="form in CSVFilesForms"
							:key="form.name"
						>
							<FormItem>
								<FormLabel> {{ form.label }} </FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Gdzie można znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> {{ form.title }} </DialogTitle>

												<DialogDescription>
													<img :src="`@/assets/turnEndGifs/${form.gif}`" :alt="form.gif" />
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-9" label="Pliki CSV ilości kratek państw pogrupowane na" />

					<div class="grid grid-cols-3 gap-6">
						<FormField
							v-slot="{ componentField }"
							:name="form.name"
							v-for="form in GroupedCSVFilesForms"
							:key="form.name"
						>
							<FormItem>
								<FormLabel> {{ form.label }} </FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Gdzie można znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> {{ form.title }} </DialogTitle>

												<DialogDescription>
													<img :src="`@/assets/turnEndGifs/${form.gif}.gif`" :alt="form.gif" />
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-9" label="Pliki CSV ilości kratek jakie posiadają" />

					<div class="grid grid-cols-2 gap-6">
						<FormField
							v-slot="{ componentField }"
							:name="form.name"
							v-for="form in CellsCSVFilesForms"
							:key="form.name"
						>
							<FormItem>
								<FormLabel> {{ form.label }} </FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Gdzie można znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> {{ form.title }} </DialogTitle>

												<DialogDescription>
													<img :src="`@/assets/turnEndGifs/${form.gif}.gif`" :alt="form.gif" />
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-9" />

					<FormField v-slot="{ componentField }" name="emblemsHTML">
						<FormItem>
							<FormLabel>Plik HTML Emblemów</FormLabel>

							<FormControl>
								<Input type="file" placeholder="" v-bind="componentField" />
							</FormControl>

							<FormDescription>
								<Dialog>
									<DialogTrigger> Gdzie można znaleźć ten plik? </DialogTrigger>

									<DialogContent>
										<DialogHeader>
											<DialogTitle class="mb-2"> Plik HTML Emblemów </DialogTitle>

											<DialogDescription>
												<img
													src="@/assets/turnEndGifs/get-map-save-csv.gif"
													alt="get-map-save-csv"
												/>
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</FormDescription>

							<FormMessage />
						</FormItem>
					</FormField>

					<Separator class="my-9" />

					<FormField v-slot="{ componentField }" name="map">
						<FormItem>
							<FormLabel>Plik Mapy</FormLabel>

							<FormControl>
								<Input type="file" placeholder="" v-bind="componentField" />
							</FormControl>

							<FormDescription>
								<Dialog>
									<DialogTrigger> Gdzie można znaleźć ten plik? </DialogTrigger>

									<DialogContent>
										<DialogHeader>
											<DialogTitle class="mb-2"> Plik Mapy </DialogTitle>

											<DialogDescription>
												<img
													src="@/assets/turnEndGifs/get-map-save-csv.gif"
													alt="get-map-save-csv"
												/>
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</FormDescription>

							<FormMessage />
						</FormItem>
					</FormField>

					<Separator class="my-9" />

					<div class="flex justify-center">
						<Button class="w-1/2" type="submit"> Submit </Button>
					</div>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
