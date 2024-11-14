<script setup lang="ts">
useHead({
	title: "Garand's WG | Wykresy i statystyki"
});

interface DataForCharts {
	states: {
		config: Config;
		burgs: ChartData[];
		provinces: ChartData[];
		cells: ChartData[];
		culturesCells: ChartData[];
		religionCells: ChartData[];
		biomesCells: ChartData[];
		ruralPopulation: ChartData[];
		urbanPopulation: ChartData[];
		forms: ChartData[];
	};
	provinces: {
		config: Config;
		burgs: ChartData[];
		cells: ChartData[];
		ruralPopulation: ChartData[];
		urbanPopulation: ChartData[];
		forms: ChartData[];
	};
	burgs: {
		config: Config;
		population: ChartData[];
		religions: ChartData[];
		cultures: ChartData[];
		capitals: ChartData[];
		ports: ChartData[];
		cities: ChartData[];
		walls: ChartData[];
		plazas: ChartData[];
		temples: ChartData[];
		shantyTowns: ChartData[];
	};
	cultures: {
		config: Config;
		cells: ChartData[];
		population: ChartData[];
		types: ChartData[];
		namesbases: ChartData[];
	};
	religions: {
		config: Config;
		cells: ChartData[];
		population: ChartData[];
		types: ChartData[];
		forms: ChartData[];
	};
}

interface ChartData {
	turn: number;
	[key: string]: number;
}

interface Config {
	categories: string[];
	colors?: string[];
}

const pb = usePocketBase();
const data = useChartsAndStatsStore();

const turnsData = await data.fetchTurnsData();
const statesData = await data.fetchStatesData();
const provincesData = await data.fetchProvincesData();
const burgsData = await data.fetchBurgsData();
const culturesData = await data.fetchCulturesData();
const religionsData = await data.fetchReligionsData();

const dataForCharts: DataForCharts = {
	states: {
		config: { categories: [], colors: [] },
		burgs: [],
		provinces: [],
		cells: [],
		culturesCells: [],
		religionCells: [],
		biomesCells: [],
		ruralPopulation: [],
		urbanPopulation: [],
		forms: []
	},
	provinces: {
		config: { categories: [], colors: [] },
		burgs: [],
		cells: [],
		ruralPopulation: [],
		urbanPopulation: [],
		forms: []
	},
	burgs: {
		config: { categories: [], colors: [] },
		population: [],
		religions: [],
		cultures: [],
		capitals: [],
		ports: [],
		cities: [],
		walls: [],
		plazas: [],
		temples: [],
		shantyTowns: []
	},
	cultures: {
		config: { categories: [], colors: [] },
		cells: [],
		population: [],
		types: [],
		namesbases: []
	},
	religions: {
		config: { categories: [], colors: [] },
		cells: [],
		population: [],
		types: [],
		forms: []
	}
};

const configsDataSets = [
	{ data: statesData, key: 'states' },
	{ data: provincesData, key: 'provinces' },
	{ data: burgsData, key: 'burgs' },
	{ data: culturesData, key: 'cultures' },
	{ data: religionsData, key: 'religions' }
];

for (let i = 0; i < configsDataSets.length; i++) {
	const dataset = configsDataSets[i];
	const config = dataForCharts[dataset.key].config;

	config.categories = dataset.data.map(item => item.name);
	if (dataset.data[0].color) config.colors = dataset.data.map(item => item.color);
}

for (let i = 0; i < turnsData.length - 1; i++) {
	const turn = turnsData[i];
	const statesBurgsDataItem: ChartData = { turn: turn.value };
	const statesProvincesDataItem: ChartData = { turn: turn.value };
	const statesCellsDataItem: ChartData = { turn: turn.value };
	const culturesCellsDataItem: ChartData = { turn: turn.value };
	const religionCellsDataItem: ChartData = { turn: turn.value };
	const biomesCellsDataItem: ChartData = { turn: turn.value };
	const ruralPopulationDataItem: ChartData = { turn: turn.value };
	const urbanPopulationDataItem: ChartData = { turn: turn.value };
	const formsDataItem: ChartData = { turn: turn.value };

	// TODO: Dokończyć resztę DataItems'ów

	for (let j = 0; j < statesData.length; j++) {
		const state = statesData[j];

		statesBurgsDataItem[state.name] = state.burgs;
		statesProvincesDataItem[state.name] = provincesData.filter(
			province => province.turn === turn.id && province.state === state.id
		).length;
		statesCellsDataItem[state.name] = state.cells;
	}

	dataForCharts.states.burgs.push(statesBurgsDataItem);
	dataForCharts.states.provinces.push(statesProvincesDataItem);
	dataForCharts.states.cells.push(statesCellsDataItem);
}

console.log(dataForCharts);

// console.log(provincesData);

// console.table(statesData);
// console.table(provincesData);
// console.table(burgsData);
// console.table(culturesData);
// console.table(religionsData);

// console.log(statesData);

// TODO: dodać wykresy z shadcn-vue https://www.shadcn-vue.com/docs/charts.html

// TODO: Statystyki państw na przestrzeni tur, kolor z pola color:
//       - ilość miast - liniowy,
//       - ilość prowincji - liniowy,
//       - ilość kratek - liniowy,
//       - ilość kratek danej kultury - słupkowy,
//       - ilość kratek danej religii - słupkowy,
//       - ilość kratek danego biomu - słupkowy,z
//       - ilość populacji wiejskiej - liniowy,
//       - ilość populacji miejskiej - liniowy,
//       - ilość danych form rządu - liniowy

// TODO: Statystyki prowincji na przestrzeni tur, kolor z pola color:
//       - ilość miast - liniowy,
//       - ilość kratek - liniowy,
//       - ilość populacji wiejskiej - liniowy,
//       - ilość populacji miejskiej - liniowy,
//       - ilość danych form rządu - liniowy

// TODO: Statystyki miast na przestrzeni tur, kolor z pola color:
//       - ilość populacji - liniowy,
//       - ilość religii - liniowy,
//       - ilość kultur - liniowy,
//       - ilość stolic - liniowy,
//       - ilość portów - liniowy,
//       - ilość zamków - liniowy,
//       - ilość murów - liniowy,
//       - ilość placów - liniowy,
//       - ilość świątyń - liniowy,
//       - ilość przedmieść - liniowy

// TODO: Statystyki kultur na przestrzeni tur, kolor z pola color:
//       - ilość kratek - liniowy,
//       - ilość populacji - liniowy,
//       - ilość danych typów kultury - liniowy,
//       - ilość danych namesbase'ów kultury - liniowy,

// TODO: Statystyki religii na przestrzeni tur, kolor z pola color:
//       - ilość kratek - liniowy,
//       - ilość populacji - liniowy,
//       - ilość danych typów religii - liniowy,
//       - ilość danych form religii - liniowy,

const tabs: { [key: string]: string } = {
	states: 'Państwa',
	provinces: 'Prowincje',
	burgs: 'Miasta',
	cultures: 'Kultury',
	religions: 'Religie'
};
</script>

<template>
	<div class="mt-12 flex h-screen items-center justify-center">
		<Tabs
			class="flex w-full flex-col items-center justify-center"
			:default-value="tabs[Object.keys(tabs)[0]]"
		>
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="(tab, key) in tabs" :key="key" :value="tab"> {{ tab }}</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="(tab, key) in tabs"
				:key="key"
				:value="tab"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<Card>
					<CardHeader>
						<CardTitle>
							{{ tab }}
							<!-- {{ props.title }} Numer <span class="text-primary">{{ turn.value }}</span> -->
						</CardTitle>

						<CardDescription> Jeżyk </CardDescription>
					</CardHeader>

					<Separator />

					<CardContent class="space-y-2 py-6"> </CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
