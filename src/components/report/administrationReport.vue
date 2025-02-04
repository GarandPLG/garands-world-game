<script lang="ts" setup>
// TODO: Administracja (GovCap, Prowincje, Miasta)
import type { BurgsResponse, ProvincesResponse } from '@/types/pb-types';

interface AccordionItems {
	title: string;
	content:
		| ProvincesResponse<unknown>[]
		| BurgsResponse<unknown>[]
		| { name: string; amount: number }[];
	len: number;
	type: 'provinces' | 'burgs' | 'chart';
}

const { state, turn } = storeToRefs(useReportStore());

const { provincesData, burgsData } = await useFetchAdministrationReport(turn.value, state.value);

const biomesChartData = prepareChartData(state.value.biomesCells as object);
const religionsChartData = prepareChartData(state.value.religionsCells as object);
const culturesChartData = prepareChartData(state.value.culturesCells as object);

const accordionItems: AccordionItems[] = [
	{
		title: 'Prowincje',
		content: provincesData.value as ProvincesResponse<unknown>[],
		len: provincesData.value.length as number,
		type: 'provinces'
	},
	{
		title: 'Miasta',
		content: burgsData.value as BurgsResponse<unknown>[],
		len: burgsData.value.length as number,
		type: 'burgs'
	},
	{
		title: 'Biomy',
		content: biomesChartData,
		len: biomesChartData.length,
		type: 'chart'
	},
	{
		title: 'Religie',
		content: religionsChartData,
		len: religionsChartData.length,
		type: 'chart'
	},
	{
		title: 'Kultury',
		content: culturesChartData,
		len: culturesChartData.length,
		type: 'chart'
	}
];

function prepareChartData(content: object) {
	return Object.entries(content).map(([name, value]) => ({
		name,
		amount: parseInt(value)
	}));
}
</script>

<template>
	<div class="grid grid-cols-12 gap-3">
		<AdministrationAccordion class="col-span-4" :accordionItems="accordionItems" />

		<AdministrationDetails
			class="col-span-8 flex w-full flex-col items-center justify-center"
			:state="state"
			:turn="turn"
		/>
	</div>
</template>
