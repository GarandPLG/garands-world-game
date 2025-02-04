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

const { provincesData, burgsData, cultureData, religionData } = await useFetchAdministrationReport(
	turn.value,
	state.value
);

const biomesChartData = prepareChartData(
	state.value.biomesCells as Record<string, string>,
	constBiomesColors
);
const religionsChartData = prepareChartData(
	state.value.religionsCells as Record<string, string>,
	religionData
);
const culturesChartData = prepareChartData(
	state.value.culturesCells as Record<string, string>,
	cultureData
);

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

function prepareChartData(
	content: Record<string, string>,
	colors: { id?: string; name: string; color: string }[]
): { name: string; amount: number; color: string }[] {
	return Object.entries(content).map(([name, value]) => ({
		name,
		amount: parseInt(value),
		color: colors.find(c => c.name === name)?.color ?? ''
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
