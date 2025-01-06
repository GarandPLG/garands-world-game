<script lang="ts" setup>
// TODO: Administracja (GovCap, Prowincje, Miasta)
import type {
	BurgsResponse,
	ProvincesResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';
import type { AuthModel } from 'pocketbase';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const user = computed<AuthModel | null>(() =>
	currentUser.value ? `"${currentUser.value?.id}"` : null
);
const isUserNotAdmin =
	currentUser.value?.role === 'moderator' || currentUser.value?.role === 'admin'
		? null
		: user.value;

const provincesData = ref<ProvincesResponse<unknown>[]>(
	await useCachedData({
		key: `reportProvinces-${props.turn.value + 1}-${props.state.name}-${isUserNotAdmin ? user.value : 'Administration'}`,
		collection: 'provinces',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${props.turn.id}" && state = "${props.state.id}"`
			// fields: ['id,name']
		}
	})
);

const burgsData = ref<BurgsResponse<unknown>[]>(
	await useCachedData({
		key: `reportBurgs-${props.turn.value + 1}-${props.state.name}-${isUserNotAdmin ? user.value : 'Administration'}`,
		collection: 'burgs',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${props.turn.id}" && state = "${props.state.id}"`
			// fields: ['id,name,population']
		}
	})
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
		type: 'chart',
		chartType: 'pie'
	},
	{
		title: 'Religie',
		content: religionsChartData,
		len: religionsChartData.length,
		type: 'chart',
		chartType: 'pie'
	},
	{
		title: 'Kultury',
		content: culturesChartData,
		len: culturesChartData.length,
		type: 'chart',
		chartType: 'pie'
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
		<div class="col-span-5 rounded-md border p-2">
			<AdministrationAccordion :accordionItems="accordionItems" :turn="props.turn" />
		</div>

		<div class="col-span-7 rounded-md border p-2">Zawartość</div>
	</div>
</template>
