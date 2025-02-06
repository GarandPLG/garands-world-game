<script lang="ts" setup>
const { state } = storeToRefs(useReportStore());

const { cultureData, burgsData } = await useFetchAdministrationReport();

const primaryCulture = cultureData.find(c => c.id === state.value.culture);

const nonPrimaryCultureCells: number = (
	Object.entries(state.value.culturesCells as Record<string, string>) as [string, string][]
).reduce(
	(sum: number, [key, value]: [string, string]) =>
		key === primaryCulture?.name ? sum : sum + parseInt(value),
	0
);

const nonPrimaryCultureBurgs = burgsData.value.filter(b => b.culture !== primaryCulture?.id).length;

const governmentCapacityPoints =
	state.value.cells + nonPrimaryCultureCells + burgsData.value.length + nonPrimaryCultureBurgs;

const technologieGovernmentCapacityLimit = 1 * 50;

const governmentCapacityLimit =
	(constGovernmentTypes.find(g => g.name === state.value.form)?.governmentCapacityLimit || 0) +
	technologieGovernmentCapacityLimit;

const governmentCapacity = Math.round((governmentCapacityPoints / governmentCapacityLimit) * 100);
const progress = ref(Math.min(governmentCapacity, 100));

const governmentCapacityRows = [
	{ type: 'Kratki', points: 1, value: state.value.cells },
	{ type: 'Kratki ob. kultura', points: 1, value: nonPrimaryCultureCells },
	{ type: 'Miasta', points: 1, value: burgsData.value.length },
	{ type: 'Miasta ob. kultura', points: 1, value: nonPrimaryCultureBurgs }
];

const governmentCapacityLimitRows = [
	{
		type: 'Forma rządu',
		value: constGovernmentTypes.find(g => g.name === state.value.form)?.governmentCapacityLimit || 0
	},
	{ type: 'Technologia', value: technologieGovernmentCapacityLimit }
];
</script>

<template>
	<div class="w-full p-2">
		<Label class="mt-3 text-xl" for="progress">
			Wykorzystanie: {{ useFormatNumber(governmentCapacityPoints) }} /
			{{ useFormatNumber(governmentCapacityLimit) }} (
			<span class="text-primary"> {{ governmentCapacity }}</span>
			% )
		</Label>

		<Progress v-model="progress" class="mt-1 w-3/5" id="progress" />

		<div class="mt-9 grid grid-cols-2 gap-10">
			<div class="relative mt-2 h-auto w-full rounded-md border p-5">
				<span class="absolute -top-4 left-2 bg-background px-2 text-2xl text-primary">
					Koszty administracyjne
				</span>

				<Table class="mb-7 text-lg">
					<TableHeader>
						<TableRow>
							<TableHead> Typ </TableHead>

							<TableHead> Punkty </TableHead>

							<TableHead class="text-right"> Ilość </TableHead>
						</TableRow>
					</TableHeader>

					<TableBody class="font-medium">
						<TableRow v-for="row in governmentCapacityRows" :key="row.type">
							<TableCell> {{ row.type }} </TableCell>

							<TableCell> {{ row.points }} </TableCell>

							<TableCell class="text-right"> {{ useFormatNumber(row.value) }} </TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<p class="absolute bottom-3 start-1/3 mt-4 text-center text-2xl">
					Suma:
					<span class="text-primary"> {{ useFormatNumber(governmentCapacityPoints) }} </span>
				</p>
			</div>

			<div class="relative mt-2 h-auto w-full rounded-md border p-5">
				<span class="absolute -top-4 left-2 bg-background px-2 text-2xl text-primary">
					Limit administracyjny
				</span>

				<Table class="mb-7 text-lg">
					<TableHeader>
						<TableRow>
							<TableHead> Typ </TableHead>

							<TableHead class="text-right"> Ilość </TableHead>
						</TableRow>
					</TableHeader>

					<TableBody class="font-medium">
						<TableRow v-for="row in governmentCapacityLimitRows" :key="row.type">
							<TableCell> {{ row.type }} </TableCell>

							<TableCell class="text-right"> {{ useFormatNumber(row.value) }} </TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<p class="absolute bottom-3 start-1/3 mt-4 text-center text-2xl">
					Suma:
					<span class="text-primary"> {{ useFormatNumber(governmentCapacityLimit) }} </span>
				</p>
			</div>
		</div>
	</div>
</template>
