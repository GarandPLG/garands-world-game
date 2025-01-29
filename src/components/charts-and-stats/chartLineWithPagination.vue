<script lang="ts" setup>
// import customChartTooltip from '@/components/charts-and-stats/customChartTooltip.vue';
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationEllipsis,
	PaginationList,
	PaginationListItem
} from '@/components/ui/pagination';
import type { ChartData } from '@/types/chartsTypes';

const props = defineProps<{
	data: ChartData[];
	categories: string[];
	colors?: string[];
	index: string;
}>();

const sortedData = computed(() =>
	props.data.map(obj => Object.fromEntries(Object.entries(obj).sort((a, b) => b[1] - a[1])))
);

const itemsPerPage = 25;

console.log(itemsPerPage);

const totalPages =
	Math.ceil(Object.keys(props.data[props.data.length - 1]).length / itemsPerPage) * 10;
const currentPage = ref(1);

const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	const keys = Object.keys(sortedData.value[0]).filter(key => key !== 'turn');
	const paginatedKeys = keys.slice(start, end);

	return sortedData.value.map(item => {
		const paginatedItem: ChartData = { turn: item.turn };
		paginatedKeys.forEach(key => {
			paginatedItem[key] = item[key];
		});
		return paginatedItem;
	});
});

// const paginatedCategories = computed(() => {
// 	const start = (currentPage.value - 1) * itemsPerPage;
// 	const end = start + itemsPerPage;
// 	return props.categories.slice(start, end);
// });

// const paginatedColors = computed(() => {
// 	const start = (currentPage.value - 1) * itemsPerPage;
// 	const end = start + itemsPerPage;
// 	return props.colors.slice(start, end);
// });

const changePage = (page: number) => {
	currentPage.value = page;
};
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<Pagination
			v-if="totalPages > 10"
			v-slot="{ page }"
			:total="totalPages"
			:sibling-count="1"
			show-edges
			:default-page="1"
		>
			<PaginationList v-slot="{ items }" class="flex items-center gap-1">
				<PaginationPrev @click="changePage(currentPage - 1)" />

				<template v-for="(item, index) in items">
					<PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
						<Button
							class="h-10 w-10 p-0"
							:variant="item.value === page ? 'default' : 'outline'"
							@click="changePage(item.value)"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>

					<PaginationEllipsis v-else :key="item.type" :index="index" />
				</template>

				<PaginationNext @click="changePage(currentPage + 1)" />
			</PaginationList>
		</Pagination>

		<LineChart
			:categories="props.categories"
			:index="props.index"
			:colors="props.colors"
			:data="paginatedData"
			class="mb-3 mt-6 h-[600px]"
			:show-legend="false"
		/>
		<!-- :custom-tooltip="customChartTooltip" -->
	</div>
</template>
