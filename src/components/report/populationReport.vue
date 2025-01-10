<script lang="ts" setup>
// TODO: Populacja
import customChartTooltip from '@/components/charts-and-stats/customChartTooltip.vue';
import type { BurgsResponse, StatesResponse, TurnsResponse } from '@/types/pb-types';
import type { AuthModel } from 'pocketbase';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();

const pb = usePocketBase();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const user = computed<AuthModel | null>(() =>
	currentUser.value ? `"${currentUser.value?.id}"` : null
);
const isUserNotAdmin =
	currentUser.value?.role === 'moderator' || currentUser.value?.role === 'admin'
		? null
		: user.value;

const stateRecords = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
	await useCachedData({
		key: `reportPopulationStateRecordsIDs-${props.turn.value + 1}-${props.state.name}-${isUserNotAdmin ? user.value : 'Administration'}`,
		collection: 'states',
		ttl: 1800,
		requestArgs: {
			filter: `name = "${props.state.name}"`,
			fields: ['id']
		}
	})
);

const turnRecords = ref<TurnsResponse<unknown>[]>(
	await useCachedData({
		key: `reportPopulationTurnRecords-${props.turn.value + 1}-${props.state.name}-${isUserNotAdmin ? user.value : 'Administration'}`,
		collection: 'turns',
		ttl: 1800,
		requestArgs: {
			fields: ['id,value']
		}
	})
);

const burgs = ref<BurgsResponse<unknown>[]>(
	await useCachedData({
		key: `reportPopulationBurgs-${props.turn.value + 1}-${props.state.name}-${isUserNotAdmin ? user.value : 'Administration'}`,
		collection: 'burgs',
		ttl: 1800,
		requestArgs: {
			filter: stateRecords.value.map(state => `(state~'${state.id}')`).join('||'),
			fields: ['id,name,population,turn']
		}
	})
);

const tab = [];
for (let i = 0; i < turnRecords.value.length - 1; i++) {
	const turn = turnRecords.value[i];
	console.log(turn.value);
	const burgsInTurn = burgs.value.filter(burg => burg.turn === turn.id);

	tab.push({
		turn: turn.value,
		...burgsInTurn.reduce((acc, curr) => {
			acc[curr.name] = curr.population;
			return acc;
		}, {})
	});
}

console.log(tab);

// console.log(props.state.id);
// console.log(burgs.value);
// console.log(turnRecords.value);
</script>

<template>
	<div>
		<div class="h-[500px]"> content </div>

		<LineChart
			:data="tab"
			index="turn"
			:categories="Object.keys(tab[tab.length - 1]).filter(key => key !== 'turn')"
			class="mb-3 mt-6 h-[500px] w-full"
			:show-legend="false"
			:custom-tooltip="customChartTooltip"
		/>
	</div>
</template>
