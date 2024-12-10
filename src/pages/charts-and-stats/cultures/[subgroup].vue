<script setup lang="ts">
import customChartTooltip from '@/components/charts-and-stats/customChartTooltip.vue';
import type { DataForChart } from '@/types/chartsTypes';
import type { BurgsResponse, CulturesResponse, TurnsResponse } from '@/types/pb-types';

useHead({
	title: `Garand's WG | Wykresy i statystyki | Kultury`
});

const route = useRoute();
const group = ref('cultures');
const subgroup = computed<string>(() => route.params.subgroup);

const chartsSubcategories = computed(
	() => chartsCategories.filter(category => category.name === group.value)[0].labels
);

const turnsData = ref<TurnsResponse<unknown>[]>(
	await useCachedData({
		key: 'turnsDataCharts',
		collection: 'turns',
		ttl: 1800,
		func: 'getFullList',
		requestArgs: {
			fields: ['id,value']
		}
	})
);

const culturesData = ref<CulturesResponse<unknown>[]>(
	await useCachedData({
		key: 'culturesDataCharts',
		collection: 'cultures',
		ttl: 1800,
		requestArgs: {
			fields: ['id,color,turn,name,cells,population']
		}
	})
);

const burgsData = ref<BurgsResponse<unknown, unknown>[]>(
	await useCachedData({
		key: 'burgsDataCharts',
		collection: 'burgs',
		ttl: 1800,
		requestArgs: {
			fields: ['id,name,state,turn,population,culture']
		}
	})
);

const dataForCharts = computed<DataForChart>(() => ({
	group: group.value,
	subgroup: subgroup.value,
	config: dFCh[group.value].config,
	chart: dFCh[group.value].charts[subgroup.value]
}));

const culturesDataItem = culturesData.value.filter(
	item => item.turn === turnsData.value[turnsData.value.length - 2].id
);

dataForCharts.value.config.categories = culturesDataItem.map(item => item.name);

dataForCharts.value.config.colors = culturesDataItem.map(item => item.color);

const { generateChartContent } = useChartData(
	{
		turnsData: turnsData.value,
		burgsData: burgsData.value,
		culturesData: culturesData.value
	},
	dataForCharts
);

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
