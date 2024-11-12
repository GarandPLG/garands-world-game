<script lang="ts" setup>
import { FormField } from '@/components/ui/form';
import { parse as parseCSV } from '@std/csv';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

const props = defineProps<{
	title: string;
	description: string;
}>();
const pb = usePocketBase();
const router = useRouter();
const { toast } = useToast();

const turn = (await pb.collection('turns').getFullList({ sort: '-value', limit: 1 }))[0];
const presentTurn = ref(turn.value ?? 1);

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
		numberOfCellsGroupedByBiomeCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		religionsByNumberOfCellsCSV: z
			.instanceof(File)
			.refine(file => file.type === 'text/csv', 'Tylko pliki CSV są dozwolone'),
		map: z
			.instanceof(File)
			.refine(file => file.name.endsWith('.map'), 'Tylko pliki z rozszerzeniem .map są dozwolone')
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
	initialValues: {
		turn: presentTurn.value
	}
});

const onSubmit = handleSubmit(async values => {
	const statesData = await parseCSVFile(values.statesCSV);
	const burgsData = await parseCSVFile(values.burgsCSV);
	const culturesData = await parseCSVFile(values.culturesCSV);
	const religionsData = await parseCSVFile(values.religionsCSV);
	const provincesData = await parseCSVFile(values.provincesCSV);
	const biomesData = await parseCSVFile(values.numberOfCellsGroupedByBiomeCSV);
	const religionsCellsData = await parseCSVFile(values.religionsByNumberOfCellsCSV);

	const statesResponses: Record<string, string> = {};
	const provincesResponses: Record<string, string> = {};
	const religionsResponses: Record<string, string> = {};
	const culturesResponses: Record<string, string> = {};

	const biomesFinalData = biomesData.reduce((acc, current) => {
		acc[current.Name] = acc[current.Name] || {};
		acc[current.Name][current.Group] = current.Value;
		return acc;
	}, {});

	const religionsCellsFinalData = religionsCellsData.reduce((acc, current) => {
		acc[current.Name] = current.Value;
		return acc;
	}, {});

	for (let i = 0; i < religionsData.length; i++) {
		const data = {
			name: religionsData[i].Name,
			turn: turn.id,
			color: religionsData[i].Color,
			cells: religionsCellsFinalData[religionsData[i].Name],
			type: religionsData[i].Type,
			form: religionsData[i].Form,
			supremeDeity: religionsData[i]['Supreme Deity'],
			population: parseInt(religionsData[i].Believers)
		};
		try {
			const response = await pb.collection('religions').create(data);
			religionsResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error)
				console.error(`Błąd przy tworzeniu religii. ${error.name}:`, error.message);
			else console.error('Błąd przy tworzeniu religii:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < culturesData.length; i++) {
		const data = {
			name: culturesData[i].Name,
			turn: turn.id,
			color: culturesData[i].Color,
			cells: culturesData[i].Cells,
			type: culturesData[i].Type,
			population: parseInt(culturesData[i].Population),
			namesbase: culturesData[i].Namesbase
		};
		try {
			const response = await pb.collection('cultures').create(data);
			culturesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error)
				console.error(`Błąd przy tworzeniu kultury. ${error.name}:`, error.message);
			else console.error('Błąd przy tworzeniu kultury:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < statesData.length; i++) {
		const data = {
			user: 'esfa1bg2ovpxd0h',
			turn: turn.id,
			name: statesData[i].State,
			nameFull: statesData[i]['Full Name'],
			color: statesData[i].Color,
			culture: culturesResponses[statesData[i].Culture],
			cells: parseInt(culturesData[i].Cells),
			biomes: biomesFinalData[statesData[i].State],
			burgs: parseInt(statesData[i].Burgs),
			urbanPopulation: parseInt(statesData[i]['Urban Population']),
			ruralPopulation: parseInt(statesData[i]['Rural Population']),
			occupiedRuralPopulation: 0,
			occupiedUrbanPopulation: 0,
			capital: statesData[i].Capital,
			form: statesData[i].Form
		};

		try {
			const response = await pb.collection('states').create(data);
			statesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error)
				console.error(`Błąd przy tworzeniu państwa. ${error.name}:`, error.message);
			else console.error('Błąd przy tworzeniu państwa:', 'Nieznany błąd.');
		}
	}

	for (let i = 0; i < provincesData.length; i++) {
		const data = {
			turn: turn.id,
			name: provincesData[i].Province,
			nameFull: provincesData[i]['Full Name'],
			state: statesResponses[provincesData[i].State],
			color: provincesData[i].Color,
			burgs: parseInt(provincesData[i].Burgs),
			ruralPopulation: parseInt(provincesData[i]['Rural Population']),
			urbanPopulation: parseInt(provincesData[i]['Urban Population']),
			capital: provincesData[i].Capital,
			form: provincesData[i].Form
		};

		try {
			const response = await pb.collection('provinces').create(data);
			provincesResponses[response.name] = response.id;
		} catch (error: unknown) {
			if (error instanceof Error)
				console.error(`Błąd przy tworzeniu prowincji. ${error.name}:`, error.message);
			else console.error('Błąd przy tworzeniu prowincji:', 'Nieznany błąd.');
		}
	}

	console.log(burgsData.length);

	for (let i = 0; i < burgsData.length; i++) {
		const data = {
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
		};

		try {
			await pb.collection('burgs').create(data);
		} catch (error: unknown) {
			if (error instanceof Error)
				console.error(`Błąd przy tworzeniu miasta. ${error.name}:`, error.message);
			else console.error('Błąd przy tworzeniu miasta:', 'Nieznany błąd.');
		}
	}

	// TODO: Dodać inkrementalne tury w pocketbase
	// TODO: Nowa mapa ma mieć turę po zwiększeniu wartości
	// FIXME: Poprawić drawio, żeby znowu odwzorowywał obecną bazę danych

	try {
		const data = {
			turn: turn.id,
			name: values.map.name.split(/ (?=\d{4}-\d{2}-\d{2}-\d{2}-\d{2})/)[0],
			file: values.map
		};
		await pb.collection('maps').create(data);
	} catch (error: unknown) {
		if (error instanceof Error)
			console.error(`Błąd przy tworzeniu mapy. ${error.name}:`, error.message);
		else console.error('Błąd przy tworzeniu mapy:', 'Nieznany błąd.');
	}
});

async function parseCSVFile(file: File) {
	try {
		return parseCSV(await file.text(), {
			skipFirstRow: true
		});
	} catch (error) {
		console.error(`Błąd podczas parsowania pliku ${file.name}:`, error);
		throw error;
	}
}
</script>

<template>
	<div>
		<Card>
			<CardHeader>
				<CardTitle>
					{{ props.title }} <span class="text-primary">{{ presentTurn }}</span>
				</CardTitle>

				<CardDescription> {{ props.description }} </CardDescription>
			</CardHeader>

			<Separator />

			<CardContent class="space-y-2 py-6">
				<form @submit.prevent="onSubmit">
					<div class="grid grid-cols-3 gap-6">
						<FormField v-slot="{ componentField }" name="statesCSV">
							<FormItem>
								<FormLabel>Plik CSV Państw</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> Plik CSV Państw </DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="burgsCSV">
							<FormItem>
								<FormLabel>Plik CSV Miast</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> Plik CSV Miast </DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="culturesCSV">
							<FormItem>
								<FormLabel>Plik CSV Kultur</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> Plik CSV Kultur </DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="religionsCSV">
							<FormItem>
								<FormLabel>Plik CSV Religii</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> Plik CSV Religii </DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="provincesCSV">
							<FormItem>
								<FormLabel>Plik CSV Prowincji</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2"> Plik CSV Prowincji </DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-6" />

					<div class="grid grid-cols-2 gap-6">
						<FormField v-slot="{ componentField }" name="numberOfCellsGroupedByBiomeCSV">
							<FormItem>
								<FormLabel>Plik CSV Ilości kratek pogrupowanych na biomy</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2">
													Plik CSV Ilości kratek pogrupowanych na biomy
												</DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField v-slot="{ componentField }" name="religionsByNumberOfCellsCSV">
							<FormItem>
								<FormLabel>Plik CSV Ilości kratek jakie posiada religia</FormLabel>

								<FormControl>
									<Input type="file" placeholder="" v-bind="componentField" />
								</FormControl>

								<FormDescription>
									<Dialog>
										<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle class="mb-2">
													Plik CSV Ilości kratek jakie posiada religia
												</DialogTitle>

												<DialogDescription>
													<!-- TODO: Podmienić placeholdery dialogów na gify -->
													<img
														src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
														alt="attack-on-titan-mikasa-ackerman"
													/>
												</DialogDescription>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</FormDescription>

								<FormMessage />
							</FormItem>
						</FormField>
					</div>

					<Separator class="my-6" />

					<FormField v-slot="{ componentField }" name="map">
						<FormItem>
							<FormLabel>Plik Mapy</FormLabel>

							<FormControl>
								<Input type="file" placeholder="" v-bind="componentField" />
							</FormControl>

							<FormDescription>
								<Dialog>
									<DialogTrigger> Skąd znaleźć ten plik? </DialogTrigger>

									<DialogContent>
										<DialogHeader>
											<DialogTitle class="mb-2"> Plik Mapy </DialogTitle>

											<DialogDescription>
												<!-- TODO: Podmienić placeholdery dialogów na gify -->
												<img
													src="@/assets/turnEndGifs/attack-on-titan-mikasa-ackerman.jpg"
													alt="attack-on-titan-mikasa-ackerman"
												/>
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</FormDescription>

							<FormMessage />
						</FormItem>
					</FormField>

					<Separator class="my-6" />

					<div class="flex justify-center">
						<Button class="w-1/2" type="submit"> Submit </Button>
					</div>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
