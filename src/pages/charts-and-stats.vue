<script setup lang="ts">
useHead({
	title: "Garand's WG | Wykresy i statystyki"
});

import type { ChartData, Config, DataForCharts } from '@/types/chartsTypes';
import type { BurgsResponse } from '@/types/pb-types';

const data = cacheFullListResponses();

const turnsData = await data.fetchTurnsData();
const statesData = await data.fetchStatesData();
const provincesData = await data.fetchProvincesData();
const burgsData = await data.fetchBurgsData();
const culturesData = await data.fetchCulturesData();
const religionsData = await data.fetchReligionsData();

const dataForCharts: DataForCharts = {
	states: {
		config: { categories: [], colors: [] },
		charts: {
			burgs: [],
			provinces: [],
			cells: [],
			ruralPopulation: [],
			urbanPopulation: []
		}
	},
	provinces: {
		config: { categories: [], colors: [] },
		charts: {
			burgs: [],
			cells: [],
			ruralPopulation: [],
			urbanPopulation: []
		}
	},
	burgs: {
		config: { categories: [], colors: [] },
		charts: {
			population: []
			// features: []
		}
	},
	cultures: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			burgs: []
		}
	},
	religions: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			burgs: []
		}
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
	else if (!dataset.data[0].color && dataset.key === 'burgs')
		config.colors = dataset.data.map(
			burg => statesData.find(state => state.id === (burg as BurgsResponse).state)?.color
		);
}

for (let i = 0; i < turnsData.length - 1; i++) {
	const turn = turnsData[i];

	const statesDataItems: ChartData[] = [
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value }
	];

	for (let i = 0; i < statesData.length; i++) {
		const state = statesData[i];

		statesDataItems[0][state.name] = state.burgs;
		statesDataItems[1][state.name] = provincesData.filter(
			province => province.turn === turn.id && province.state === state.id
		).length;
		statesDataItems[2][state.name] = state.cells;
		statesDataItems[3][state.name] = state.ruralPopulation;
		statesDataItems[4][state.name] = state.urbanPopulation;
	}

	dataForCharts.states.charts.burgs.push(statesDataItems[0]);
	dataForCharts.states.charts.provinces.push(statesDataItems[1]);
	dataForCharts.states.charts.cells.push(statesDataItems[2]);
	dataForCharts.states.charts.ruralPopulation.push(statesDataItems[3]);
	dataForCharts.states.charts.urbanPopulation.push(statesDataItems[4]);

	const provincesDataItems: ChartData[] = [
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value }
	];

	for (let i = 0; i < provincesData.length; i++) {
		const province = provincesData[i];

		provincesDataItems[0][province.name] = province.burgs;
		provincesDataItems[1][province.name] = province.cells;
		provincesDataItems[2][province.name] = province.ruralPopulation;
		provincesDataItems[3][province.name] = province.urbanPopulation;
	}

	dataForCharts.provinces.charts.burgs.push(provincesDataItems[0]);
	dataForCharts.provinces.charts.cells.push(provincesDataItems[1]);
	dataForCharts.provinces.charts.ruralPopulation.push(provincesDataItems[2]);
	dataForCharts.provinces.charts.urbanPopulation.push(provincesDataItems[3]);

	const burgsDataItems: ChartData[] = [
		{ turn: turn.value }
		// { turn: turn.value }
	];

	const burgsBuildings = [0, 0, 0, 0, 0, 0, 0];
	for (let i = 0; i < burgsData.length; i++) {
		const burg = burgsData[i];
		burgsDataItems[0][burg.name] = burg.population;

		// if (burg.isCapital) burgsBuildings[0]++;
		// if (burg.isPort) burgsBuildings[1]++;
		// if (burg.isCitadel) burgsBuildings[2]++;
		// if (burg.isWalls) burgsBuildings[3]++;
		// if (burg.isPlaza) burgsBuildings[4]++;
		// if (burg.isTemple) burgsBuildings[5]++;
		// if (burg.isShantyTown) burgsBuildings[6]++;

		// burgsDataItems[1]['Capitals'] = burgsBuildings[0];
		// burgsDataItems[1]['Ports'] = burgsBuildings[1];
		// burgsDataItems[1]['Citadels'] = burgsBuildings[2];
		// burgsDataItems[1]['Walls'] = burgsBuildings[3];
		// burgsDataItems[1]['Plazas'] = burgsBuildings[4];
		// burgsDataItems[1]['Temples'] = burgsBuildings[5];
		// burgsDataItems[1]['Shanty Towns'] = burgsBuildings[6];
	}

	dataForCharts.burgs.charts.population.push(burgsDataItems[0]);
	// dataForCharts.burgs.charts.features.push(burgsDataItems[1]);

	const culturesDataItems: ChartData[] = [
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value }
	];

	for (let i = 0; i < culturesData.length; i++) {
		const culture = culturesData[i];
		const burgsCount = burgsData.filter(burg => burg.culture === culture.id).length;

		culturesDataItems[0][culture.name] = culture.cells;
		culturesDataItems[1][culture.name] = culture.population;
		culturesDataItems[2][culture.name] = burgsCount;
	}

	dataForCharts.cultures.charts.cells.push(culturesDataItems[0]);
	dataForCharts.cultures.charts.population.push(culturesDataItems[1]);
	dataForCharts.cultures.charts.burgs.push(culturesDataItems[2]);

	const religionsDataItems: ChartData[] = [
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value }
	];

	for (let i = 0; i < religionsData.length; i++) {
		const religion = religionsData[i];
		const burgsCount = burgsData.filter(burg => burg.religion === religion.id).length;

		religionsDataItems[0][religion.name] = religion.cells;
		religionsDataItems[1][religion.name] = religion.population;
		religionsDataItems[2][religion.name] = burgsCount;
	}

	dataForCharts.religions.charts.cells.push(religionsDataItems[0]);
	dataForCharts.religions.charts.population.push(religionsDataItems[1]);
	dataForCharts.religions.charts.burgs.push(religionsDataItems[2]);
}

const tabs: {
	name: string;
	label: string;
	description: string;
	props: {
		config: Config;
		labels: string[];
		charts: Record<string, ChartData[]>;
	};
}[] = [
	{
		name: 'states',
		label: 'Państwa',
		description: 'Statystyki państw',
		props: {
			config: dataForCharts.states.config,
			labels: [
				'Ilość miast',
				'Ilość prowincji',
				'Ilość kratek',
				'Ilość populacji wiejskiej ',
				'Ilość populacji miejskiej'
			],
			charts: dataForCharts.states.charts
		}
	},
	{
		name: 'provinces',
		label: 'Prowincje',
		description: 'Statystyki prowincji',
		props: {
			config: dataForCharts.provinces.config,
			labels: [
				'Ilość miast',
				'Ilość kratek',
				'Ilość populacji wiejskiej ',
				'Ilość populacji miejskiej'
			],
			charts: dataForCharts.provinces.charts
		}
	},
	{
		name: 'burgs',
		label: 'Miasta',
		description: 'Statystyki miast',
		props: {
			config: dataForCharts.burgs.config,
			labels: ['Ilość populacji', 'Ilość specjalnych budynków'],
			charts: dataForCharts.burgs.charts
		}
	},
	{
		name: 'cultures',
		label: 'Kultury',
		description: 'Statystyki kultur',
		props: {
			config: dataForCharts.cultures.config,
			labels: ['Ilość kratek', 'Ilość populacji', 'Ilość miast'],
			charts: dataForCharts.cultures.charts
		}
	},
	{
		name: 'religions',
		label: 'Religie',
		description: 'Statystyki religii',
		props: {
			config: dataForCharts.religions.config,
			labels: ['Ilość kratek', 'Ilość populacji', 'Ilość miast'],
			charts: dataForCharts.religions.charts
		}
	}
];

console.log(tabs);
</script>

<template>
	<div class="mt-12 flex h-screen items-center justify-center">
		<Tabs class="flex w-full flex-col items-center justify-center" :default-value="tabs[0].name">
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="tab in tabs" :key="tab.name" :value="tab.name">
					{{ tab.label }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="tab in tabs"
				:key="tab.name"
				:value="tab.name"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<Card>
					<CardHeader>
						<CardTitle>
							{{ tab.label }}
						</CardTitle>

						<CardDescription class="flex flex-col">
							{{ tab.description }}
						</CardDescription>
					</CardHeader>

					<Separator />

					<CardContent class="space-y-2 py-6">
						<ChartComponent
							:config="tab.props.config"
							:charts="tab.props.charts"
							:labels="tab.props.labels"
						/>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
