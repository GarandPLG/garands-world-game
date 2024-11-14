<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import { parse as parseCSV } from '@std/csv';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

const pb = usePocketBase();
const router = useRouter();
const { toast } = useToast();
const props = defineProps<{
	title: string;
	description: string;
}>();

let turn = (await pb.collection('turns').getFullList({ sort: '-value', limit: 1 }))[0];

if (turn === undefined)
	try {
		turn = await pb.collection('turns').create({ value: 0 });
	} catch (error: unknown) {
		if (error instanceof Error) throw error;
		else console.error('Błąd przy tworzeniu tury zerowej:', 'Nieznany błąd.');
	}

const formSchema = toTypedSchema(
	// FIXME: Naprawić walidację zod'a dla pól plikowych
	z.object({
		turn: z.number(),
		statesCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		burgsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		culturesCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		religionsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		provincesCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		statesByNumberOfCellsGroupedByBiomeCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		statesByNumberOfCellsGroupedByReligionsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		statesByNumberOfCellsGroupedByCulturesCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		religionsByNumberOfCellsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		provincesByNumberOfCellsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		map: z
			.instanceof(File)
			.refine(file => file.name.endsWith('.map'), 'Tylko pliki z rozszerzeniem .map są dozwolone')
	})
);

const CSVFilesForms = [
	createCSVForm('statesCSV', 'Państw', 'get-states-csv', 'Plik CSV'),
	createCSVForm('burgsCSV', 'Miast', 'get-burgs-csv', 'Plik CSV'),
	createCSVForm('culturesCSV', 'Kultur', 'get-cultures-csv', 'Plik CSV'),
	createCSVForm('religionsCSV', 'Religii', 'get-religions-csv', 'Plik CSV'),
	createCSVForm('provincesCSV', 'Prowincje', 'get-provinces-csv', 'Plik CSV')
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
	validationSchema: formSchema,
	initialValues: {
		turn: turn.value
	}
});

const onSubmit = handleSubmit(async values => {
	const statesData = await parseCSVFile(values.statesCSV);
	const burgsData = await parseCSVFile(values.burgsCSV);
	const culturesData = await parseCSVFile(values.culturesCSV);
	const religionsData = await parseCSVFile(values.religionsCSV);
	const provincesData = await parseCSVFile(values.provincesCSV);
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
		!statesByNumberOfCellsGroupedByBiomeData ||
		!statesByNumberOfCellsGroupedByReligionsData ||
		!statesByNumberOfCellsGroupedByCulturesData ||
		!religionsByNumberOfCellsData ||
		!provincesByNumberOfCellsData
	)
		return;

	const statesResponses: Record<string, string> = {};
	const provincesResponses: Record<string, string> = {};
	const religionsResponses: Record<string, string> = {};
	const culturesResponses: Record<string, string> = {};

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

	for (let i = 0; i < religionsData.length; i++) {
		try {
			const response = await pb.collection('religions').create({
				name: religionsData[i].Name,
				turn: turn.id,
				color: religionsData[i].Color,
				cells: religionsCellsFinalData[religionsData[i].Name],
				type: religionsData[i].Type,
				form: religionsData[i].Form,
				supremeDeity: religionsData[i]['Supreme Deity'],
				population: parseInt(religionsData[i].Believers)
			});

			religionsResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error) throw error;
			else console.error('Błąd przy tworzeniu religii:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < culturesData.length; i++) {
		try {
			const response = await pb.collection('cultures').create({
				name: culturesData[i].Name,
				turn: turn.id,
				color: culturesData[i].Color,
				cells: culturesData[i].Cells,
				type: culturesData[i].Type,
				population: parseInt(culturesData[i].Population),
				namesbase: culturesData[i].Namesbase
			});

			culturesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error) throw error;
			else console.error('Błąd przy tworzeniu kultury:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < statesData.length; i++) {
		try {
			// const user = await pb.collection('states').getFirstListItem()

			const response = await pb.collection('states').create({
				user: 'esfa1bg2ovpxd0h', // TODO: poprawić pobieranie usera
				turn: turn.id,
				name: statesData[i].State,
				nameFull: statesData[i]['Full Name'],
				form: statesData[i].Form,
				color: statesData[i].Color,
				cells: parseInt(statesData[i].Cells),
				burgs: parseInt(statesData[i].Burgs),
				urbanPopulation: parseInt(statesData[i]['Urban Population']),
				ruralPopulation: parseInt(statesData[i]['Rural Population']),
				capital: statesData[i].Capital,
				culture: culturesResponses[statesData[i].Culture],
				culturesCells: statesByNumberOfCellsGroupedByCulturesFinalData[statesData[i].State],
				religionsCells: statesByNumberOfCellsGroupedByReligionsFinalData[statesData[i].State],
				biomesCells: statesByNumberOfCellsGroupedByBiomeFinalData[statesData[i].State]
			});

			statesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error) throw error;
			else console.error('Błąd przy tworzeniu państwa:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < provincesData.length; i++) {
		try {
			const response = await pb.collection('provinces').create({
				turn: turn.id,
				name: provincesData[i].Province,
				nameFull: provincesData[i]['Full Name'],
				state: statesResponses[provincesData[i].State],
				color: provincesData[i].Color,
				cells: parseInt(provincesCellsFinalData[provincesData[i].Province]),
				burgs: parseInt(provincesData[i].Burgs),
				ruralPopulation: parseInt(provincesData[i]['Rural Population']),
				urbanPopulation: parseInt(provincesData[i]['Urban Population']),
				capital: provincesData[i].Capital,
				form: provincesData[i].Form
			});

			provincesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error) throw error;
			else console.error('Błąd przy tworzeniu prowincji:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < burgsData.length; i++) {
		try {
			await pb.collection('burgs').create({
				turn: turn.id,
				name: burgsData[i].Burg,
				province: provincesResponses[burgsData[i].Province],
				state: statesResponses[burgsData[i].State],
				culture: culturesResponses[burgsData[i].Culture],
				religion: religionsResponses[burgsData[i].Religion],
				population: parseInt(burgsData[i].Population),
				isCapital: burgsData[i].Capital === 'capital' ? true : false,
				isPort: burgsData[i].Port === 'port' ? true : false,
				isCitadel: burgsData[i].Citadel === 'citadel' ? true : false,
				isWalls: burgsData[i].Walls === 'walls' ? true : false,
				isPlaza: burgsData[i].Plaza === 'plaza' ? true : false,
				isTemple: burgsData[i].Temple === 'temple' ? true : false,
				isShantyTown: burgsData[i]['Shanty Town'] === 'shanty town' ? true : false,
				emblem: burgsData[i].Emblem,
				cityGeneratorLink: burgsData[i]['City Generator Link']
			});
		} catch (error: unknown) {
			if (error instanceof Error) throw error;
			else console.error('Błąd przy tworzeniu miasta:', 'Nieznany błąd.');
		}
	}
	// FIXME: Poprawić drawio, żeby znowu odwzorowywał obecną bazę danych

	try {
		const nextTurn = await pb.collection('turns').create({ value: turn.value + 1 });

		await pb.collection('maps').create({
			turn: nextTurn.id,
			name: values.map.name.split(/ (?=\d{4}-\d{2}-\d{2}-\d{2}-\d{2})/)[0],
			file: values.map
		});
	} catch (error: unknown) {
		if (error instanceof Error) throw error;
		else console.error('Błąd przy tworzeniu mapy:', 'Nieznany błąd.');
	}

	toast({
		title: 'Udało się zakończyć turę!',
		description: 'Dane z plików csv zostały wgrane do bazy danych.'
	});
});

async function parseCSVFile(file: File) {
	try {
		return parseCSV(await file.text(), {
			skipFirstRow: true
		});
	} catch (error: unknown) {
		if (error instanceof Error) throw error;
		else console.error('Błąd przy parsowaniu pliku:', 'Nieznany błąd.');
	}
}

function createCSVForm(
	name: string,
	label: string,
	gif: string,
	title: string
): {
	name: string;
	label: string;
	gif: string;
	title: string;
} {
	return {
		name,
		label,
		gif,
		get title() {
			return `${title} ${this.label}`;
		}
	};
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
