<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import type { AzgaarJSONFull } from '@/types/azgaarJSONFull';
import type { StatesResponse, TradesResponse, TurnsResponse } from '@/types/pb-types';
import { Collections } from '@/types/pb-types';

const props = defineProps<{
	title: string;
	description: string;
}>();

const pb = usePocketBase();
const { toast } = useToast();
const redis = useRedis();

const turnsData = ref<TurnsResponse<unknown>[]>(
	await useCachedData({
		key: 'turnsDataTurnEnd',
		collection: 'turns',
		ttl: 1800,
		requestArgs: {
			fields: ['id,value']
		}
	})
);

const turns = ref(turnsData.value.slice().reverse());
const turn = ref(turns.value[0]);

const statesData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
	await useCachedData({
		key: 'statesDataTurnEnd',
		collection: 'states',
		ttl: 1800,
		requestArgs: {
			fields: ['id,turn,name']
		}
	})
);

const statesFromPreviousTurn = statesData.value.filter(state => state.turn === turns.value[1].id);

const currentTurnTradeDeals = ref<TradesResponse<unknown>[]>(
	turns.value?.[1]?.id
		? await useCachedData({
				key: 'currentTradeDealsTurnEnd',
				collection: 'trades',
				ttl: 1800,
				requestArgs: {
					filter: `turn = "${turns.value[1].id}" && isDiscontinued != true`,
					fields: ['id,product,importState,exportState,volume,price,isDiscontinued']
				}
			})
		: []
);

const nextTurnTradeDeals = ref<TradesResponse<unknown>[]>(
	turns.value?.[0]?.id
		? await useCachedData({
				key: 'nextTradeDealsTurnEnd',
				collection: 'trades',
				ttl: 1800,
				requestArgs: {
					filter: `turn = "${turns.value[0].id}" && isDiscontinued != true`,
					fields: ['id,product,importState,exportState,volume,price,isDiscontinued']
				}
			})
		: []
);

const { handleSubmit } = useForm({
	validationSchema: turnEndFormSchema,
	initialValues: {
		turn: turn.value.value
	}
});

const onSubmit = handleSubmit(async values => {
	const azgaarJSONFull = await values.jsonFullFile.text();
	const { extStatesData, extCulturesData, extReligionsData, extBurgsData, extProvincesData } =
		useExtractMapData(JSON.parse(azgaarJSONFull) as AzgaarJSONFull);

	const startTimeAll = new Date().getTime();

	const svgMaps = await useSVGMaps(values.emblemsHTMLFile);

	const religionsResponses = await useProcessEndTurnCollectionsData(
		Collections.Religions,
		extReligionsData,
		religion => ({
			turn: turn.value.id,
			name: religion.name,
			type: religion.type as unknown as ReligionsTypeOptions,
			form: religion.form,
			supremeDeity: religion.supremeDeity,
			color: religion.color,
			cells: religion.cells,
			ruralPopulation: religion.ruralPopulation,
			urbanPopulation: religion.urbanPopulation
		}),
		'Religie'
	);

	const culturesResponses = await useProcessEndTurnCollectionsData(
		Collections.Cultures,
		extCulturesData,
		culture => ({
			turn: turn.value.id,
			name: culture.name,
			color: culture.color,
			cells: culture.cells,
			type: culture.type as unknown as CulturesTypeOptions,
			ruralPopulation: culture.ruralPopulation,
			urbanPopulation: culture.urbanPopulation,
			namesbase: culture.namesbase as unknown as CulturesNamesbaseOptions
		}),
		'Kultury'
	);

	const statesResponses = await useProcessEndTurnCollectionsData(
		Collections.States,
		extStatesData,
		state => ({
			user: statesFromPreviousTurn.find(s => s.name === state.name)?.user || undefined,
			turn: turn.value.id,
			name: state.name,
			nameFull: state.nameFull,
			form: state.form as unknown as StatesFormOptions,
			color: state.color,
			cells: state.cells,
			burgs: state.burgs,
			provinces: state.provinces,
			urbanPopulation: state.urbanPopulation,
			ruralPopulation: state.ruralPopulation,
			capital: state.capital,
			culture: culturesResponses[state.culture],
			culturesCells: state.culturesCells,
			religionsCells: state.religionsCells,
			biomesCells: state.biomesCells,
			relations: state.relations,
			emblemSVG: svgMaps.state.get(state.nameFull)
		}),
		'Państwa'
	);

	const provincesResponses = await useProcessEndTurnCollectionsData(
		Collections.Provinces,
		extProvincesData,
		province => ({
			turn: turn.value.id,
			name: province.name,
			nameFull: province.nameFull,
			form: province.form as unknown as ProvincesFormOptions,
			state: statesResponses[province.state],
			color: province.color,
			capital: province.capital,
			burgs: province.burgs,
			cells: province.cells,
			ruralPopulation: province.ruralPopulation,
			urbanPopulation: province.urbanPopulation,
			emblemSVG: svgMaps.province.get(province.nameFull)
		}),
		'Prowincje'
	);

	await useProcessEndTurnCollectionsData(
		Collections.Burgs,
		extBurgsData,
		burg => ({
			turn: turn.value.id,
			name: burg.name,
			culture: culturesResponses[burg.culture],
			religion: religionsResponses[burg.religion],
			state: statesResponses[burg.state],
			province: provincesResponses[burg.province],
			population: burg.population,
			isCapital: burg.isCapital,
			isPort: burg.isPort,
			isCitadel: burg.isCitadel,
			isWalls: burg.isWalls,
			isPlaza: burg.isPlaza,
			isTemple: burg.isTemple,
			isShantyTown: burg.isShantyTown,
			cityGeneratorLink: '',
			emblemSVG: svgMaps.burg.get(burg.name)
		}),
		'Miasta'
	);

	let startTime = new Date().getTime();
	// FIXME: Nie przenosi do następnej tury
	// FIXME: Nie przenosi flag, czyli odniesień do states
	await useHandleTradeDeals(
		currentTurnTradeDeals.value,
		statesFromPreviousTurn,
		turn.value,
		statesResponses,
		'create',
		'Błąd podczas powielania obecnych umów handlowych'
	);

	await useHandleTradeDeals(
		nextTurnTradeDeals.value,
		statesFromPreviousTurn,
		turn.value,
		statesResponses,
		'update',
		'Błąd podczas aktualizowania przyszłych umów handlowych'
	);
	let endTime = new Date().getTime();

	toast({
		title: 'Powielono umowy handlowe!',
		description: `Kontynuowano + zaktualizowano ${currentTurnTradeDeals.value.length + nextTurnTradeDeals.value.length} umów handlowych w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});

	startTime = new Date().getTime();
	try {
		turn.value = await pb.collection('turns').create({ value: turn.value.value + 1 });
	} catch (error) {
		toast({
			title: `Błąd przy tworzeniu następnej tury!`,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});
		if (error instanceof Error) throw error;
	}

	try {
		turns.value = await pb.collection('turns').getFullList({ sort: '-value' });
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
			name: values.mapFile.name.split(/ (?=\d{4}-\d{2}-\d{2}-\d{2}-\d{2})/)[0],
			map: values.mapFile
		})
		.catch((error: unknown) => {
			toast({
				title: `Błąd przy tworzeniu mapy!`,
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		});
	endTime = new Date().getTime();

	toast({
		title: 'Mapa i nowa tura zostały dodane!',
		description: `Dodano mapę i nową turę w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});

	redis.flushAll();

	const endTimeAll = new Date().getTime();

	toast({
		title: 'Udało się zakończyć turę!',
		description: `Zakończono turę w czasie: ${((endTimeAll - startTimeAll) / 1000).toFixed(3)} s`
	});
});
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
					<div class="grid grid-cols-3 gap-6">
						<FormField v-slot="{ componentField }" name="jsonFullFile">
							<FormItem>
								<FormLabel>Plik JSON (full) mapy</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<!-- <FormDescription></FormDescription> -->

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="mapFile">
							<FormItem>
								<FormLabel>Plik MAP</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<!-- <FormDescription></FormDescription> -->

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="emblemsHTMLFile">
							<FormItem>
								<FormLabel>Plik HTML Emblemów</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<!-- <FormDescription></FormDescription> -->

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-9" />

					<div class="flex justify-center">
						<Button class="w-1/2" type="submit"> Submit </Button>
					</div>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
