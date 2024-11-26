<script setup lang="ts">
import customChartTooltip from '@/components/charts-and-stats/customChartTooltip.vue';
import type { DataForChart } from '@/types/chartsTypes';

useHead({
	title: `Garand's WG | Wykresy i statystyki | Państwa`
});

const route = useRoute();
const group = ref('states');
const subgroup = computed<string>(() => route.params.subgroup);
const pb = usePocketBase();

const chartsSubcategories = computed(
	() => chartsCategories.filter(category => category.name === group.value)[0].labels
);

const { fetchTurnsData, fetchStatesData, fetchProvincesData } = cacheFullListResponsesStore();

const cd = storeToRefs(cacheFullListResponsesStore());

if (!cd.turnsData.value.length) await fetchTurnsData();
if (!cd.statesData.value.length) await fetchStatesData();
if (subgroup.value === 'provinces' && !cd.provincesData.value.length) await fetchProvincesData();

const dataForCharts = computed<DataForChart>(() => ({
	group: group.value,
	subgroup: subgroup.value,
	config: dFCh[group.value].config,
	chart: dFCh[group.value].charts[subgroup.value]
}));

const statesDataItem = cd.statesData.value.filter(
	item => item.turn === cd.turnsData.value[cd.turnsData.value.length - 2].id
);

dataForCharts.value.config.categories = statesDataItem.map(item => item.name);

dataForCharts.value.config.colors = statesDataItem.map(item => item.color);

const { generateChartContent } = useChartData(cd, dataForCharts);

generateChartContent();

const chartData = computed(() => {
	dataForCharts.value.chart = [];
	generateChartContent();
	return dataForCharts.value.chart;
});

// const turnsSubscription = await pb.collection('turns').subscribe('*', e => {
// 	switch (e.action) {
// 		case 'create':
// 			cd.turnsData.value.push(e.record);
// 			cacheData('turnsData', cd.turnsData.value);
// 			break;

// 		case 'update':
// 			cd.turnsData.value = cd.turnsData.value.map(turn => {
// 				if (turn.id === e.record.id) return e.record;
// 				return turn;
// 			});
// 			cacheData('turnsData', cd.turnsData.value);
// 			break;

// 		case 'delete':
// 			cd.turnsData.value = cd.turnsData.value.filter(turn => turn.id !== e.record.id);
// 			cacheData('turnsData', cd.turnsData.value);
// 			break;
// 	}
// });

// const statesSubscription = await pb.collection('states').subscribe('*', e => {
// 	switch (e.action) {
// 		case 'create':
// 			cd.statesData.value.push(e.record);
// 			cacheData('statesData', cd.statesData.value);
// 			break;

// 		case 'update':
// 			cd.statesData.value = cd.statesData.value.map(state => {
// 				if (state.id === e.record.id) return e.record;
// 				return state;
// 			});
// 			cacheData('statesData', cd.statesData.value);
// 			break;

// 		case 'delete':
// 			cd.statesData.value = cd.statesData.value.filter(state => state.id !== e.record.id);
// 			cacheData('statesData', cd.statesData.value);
// 			break;
// 	}
// });

// let provincesSubscription: UnsubscribeFunc;
// if (subgroup.value === 'provinces') {
// 	provincesSubscription = await pb.collection('provinces').subscribe('*', e => {
// 		switch (e.action) {
// 			case 'create':
// 				cd.provincesData.value.push(e.record);
// 				cacheData('provincesData', cd.provincesData.value);
// 				break;

// 			case 'update':
// 				cd.provincesData.value = cd.provincesData.value.map(province => {
// 					if (province.id === e.record.id) return e.record;
// 					return province;
// 				});
// 				cacheData('provincesData', cd.provincesData.value);
// 				break;

// 			case 'delete':
// 				cd.provincesData.value = cd.provincesData.value.filter(
// 					province => province.id !== e.record.id
// 				);
// 				cacheData('provincesData', cd.provincesData.value);
// 				break;
// 		}
// 	});
// }
// onUnmounted(() => {
// 	turnsSubscription();
// 	statesSubscription();
// 	if (subgroup.value === 'provinces') provincesSubscription();
// });

// watch(
// 	[cd.turnsData, cd.statesData, cd.provincesData, cd.burgsData, cd.culturesData, cd.religionsData],
// 	() => {
// 		dataForCharts.value.chart = [];
// 		generateChartContent();
// 	},
// 	{ deep: true }
// );

watch([subgroup], async () => {
	if (subgroup.value === 'provinces' && !cd.provincesData.value.length) await fetchProvincesData();

	dataForCharts.value.chart = [];
	generateChartContent();
});
</script>

<template>
	<div class="mt-2 flex h-screen flex-col items-center">
		<NavigationMenu class="max-h-10">
			<NavigationMenuList>
				<NavigationMenuItem
					v-for="category in chartsCategories"
					:key="category.name"
					class="mb-4 gap-5"
				>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<RouterLink
							:to="`/charts-and-stats/${category.name}/${Object.keys(category.labels)[0]}/`"
						>
							{{ category.label }}
						</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>

		<NavigationMenu class="max-h-10">
			<NavigationMenuList>
				<NavigationMenuItem
					v-for="(subcategory, subcategoryKey) in chartsSubcategories"
					:key="subcategory"
					class="gap-5"
				>
					<NavigationMenuLink :class="navigationMenuTriggerStyle()" class="flex items-center gap-1">
						<RouterLink :to="`/charts-and-stats/${group}/${subcategoryKey}/`">
							{{ subcategory }}
						</RouterLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>

		<Card class="mx-10 w-screen">
			<CardHeader>
				<CardTitle class="ps-10 text-primary">
					{{ chartsCategories.find(config => config.name === group)?.label }}
				</CardTitle>

				<CardDescription class="flex flex-col ps-10">
					{{ chartsSubcategories[subgroup] }}
				</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent class="space-y-2 overflow-x-auto py-6">
				<LineChart
					:categories="dataForCharts.config.categories"
					index="turn"
					:colors="dataForCharts.config.colors"
					:data="chartData"
					class="mb-3 mt-6 h-[800px]"
					:custom-tooltip="customChartTooltip"
				/>
			</CardContent>
		</Card>
	</div>
</template>
