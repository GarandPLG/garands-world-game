<script lang="ts" setup>
// TODO: Administracja (GovCap, Prowincje, Miasta)
import type {
	BurgsResponse,
	ProvincesResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const { provincesData, burgsData } = await useFetchAdministrationReport(
	props.turn,
	props.state,
	!['moderator', 'admin'].includes(currentUser.value?.role),
	currentUser.value?.id ? `"${currentUser.value.id}"` : null
);

const biomesChartData = prepareChartData(props.state.biomesCells as object);
const religionsChartData = prepareChartData(props.state.religionsCells as object);
const culturesChartData = prepareChartData(props.state.culturesCells as object);

const accordionItems = [
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
		<div class="col-span-4 rounded-md border p-2">
			<AdministrationAccordion
				:accordionItems="accordionItems"
				:turn="props.turn"
				:state="props.state"
			/>
		</div>

		<div class="col-span-8 rounded-md border p-2">Zawartość</div>
	</div>
</template>
