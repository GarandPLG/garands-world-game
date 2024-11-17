<script lang="ts" setup>
import type { ChartData, Config } from '@/types/chartsTypes';

defineProps<{
	config: Config;
	labels: string[];
	charts: Record<string, ChartData[]>;
}>();
</script>

<template>
	<div v-for="(chart, _, index) in charts" :key="index" class="mb-4 flex flex-col">
		<Label class="my-4 text-center text-5xl font-bold text-primary"> {{ labels[index] }} </Label>

		<LineChart
			:categories="config.categories"
			index="turn"
			:colors="config.colors"
			:data="chart"
			class="h-[900px]"
			:show-legend="true"
			:show-tooltip="true"
		/>
	</div>
</template>
