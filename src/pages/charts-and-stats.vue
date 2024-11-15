<script setup lang="ts">
useHead({
	title: "Garand's WG | Wykresy i statystyki"
});

import type { ChartData, Config, DataForCharts } from '@/types/chartsTypes';

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
		}
	},
	cultures: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			types: [],
			namesbases: []
		}
	},
	religions: {
		config: { categories: [], colors: [] },
		charts: {
			cells: [],
			population: [],
			types: [],
			forms: []
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
}

for (let i = 0; i < turnsData.length - 0; i++) {
	const turn = turnsData[i];

	const statesDataItems: ChartData[] = [
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value },
		{ turn: turn.value }
	];

	const provincesDataItems: ChartData[] = [
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
}

console.log(dataForCharts);

// TODO: dodać wykresy z shadcn-vue https://www.shadcn-vue.com/docs/charts.html

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
			charts: dataForCharts.burgs.charts
		}
	},
	{
		name: 'cultures',
		label: 'Kultury',
		description: 'Statystyki kultur',
		props: {
			config: dataForCharts.cultures.config,
			charts: dataForCharts.cultures.charts
		}
	},
	{
		name: 'religions',
		label: 'Religie',
		description: 'Statystyki religii',
		props: {
			config: dataForCharts.religions.config,
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

							<Label class="mb-2 mt-5"> Jakiego tooltip'a użyć? </Label>

							<div>
								<RadioGroup default-value="option-one">
									<div class="flex items-center space-x-2">
										<RadioGroupItem id="option-one" value="option-one" />
										<Label for="option-one">Klasycznego</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroupItem id="option-two" value="option-two" />
										<Label for="option-two">Uproszczonego</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroupItem id="option-three" value="option-three" />
										<Label for="option-three">Najlepsi i najgorsi</Label>
									</div>
								</RadioGroup>
							</div>
						</CardDescription>
					</CardHeader>

					<Separator />

					<CardContent class="space-y-2 py-6">
						<!-- <component :is="tab.component" v-bind="tab.props" /> -->
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
