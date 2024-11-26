<script setup lang="ts">
import customChartTooltip from '@/components/charts-and-stats/customChartTooltip.vue';
import type { DataForChart } from '@/types/chartsTypes';

useHead({
	title: `Garand's WG | Wykresy i statystyki | Prowincje`
});

const route = useRoute();
const group = ref('provinces');
const subgroup = computed<string>(() => route.params.subgroup);

const chartsSubcategories = computed(
	() => chartsCategories.filter(category => category.name === group.value)[0].labels
);

const { fetchTurnsData, fetchProvincesData } = cacheFullListResponsesStore();

const cd = storeToRefs(cacheFullListResponsesStore());

if (!cd.turnsData.value.length) await fetchTurnsData();
if (!cd.provincesData.value.length) await fetchProvincesData();

const dataForCharts = computed<DataForChart>(() => ({
	group: group.value,
	subgroup: subgroup.value,
	config: dFCh[group.value].config,
	chart: dFCh[group.value].charts[subgroup.value]
}));

const provincesDataItem = cd.provincesData.value.filter(
	item => item.turn === cd.turnsData.value[cd.turnsData.value.length - 2].id
);

dataForCharts.value.config.categories = provincesDataItem.map(item => item.name);

dataForCharts.value.config.colors = provincesDataItem.map(item => item.color);

const { generateChartContent } = useChartData(cd, dataForCharts);

generateChartContent();

const chartData = computed(() => {
	dataForCharts.value.chart = [];
	generateChartContent();
	return dataForCharts.value.chart;
});

watch([subgroup], async () => {
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
