<script lang="ts" setup>
// TODO: Populacja
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

const burgsTab = [];
for (let i = 0; i < turnRecords.value.length - 1; i++) {
	const turn = turnRecords.value[i];
	console.log(turn.value);
	const burgsInTurn = burgs.value.filter(burg => burg.turn === turn.id);

	burgsTab.push({
		turn: turn.value,
		...burgsInTurn.reduce((acc, curr) => {
			acc[curr.name] = curr.population;
			return acc;
		}, {})
	});
}

const burgsTabCategories = Object.keys(burgsTab[burgsTab.length - 1]).filter(key => key !== 'turn');
</script>

<template>
	<div>
		<div class="h-[500px]"> content </div>

		<Accordion type="single" class="w-full" collapsible>
			<AccordionItem value="provinces">
				<AccordionTrigger class="items-center justify-center space-x-1">
					<h3 class="text-lg font-bold text-primary"> </h3>

					<p> ( ) </p>
				</AccordionTrigger>

				<AccordionContent>
					<div class="m-2 p-2"> </div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="burgs">
				<AccordionTrigger class="items-center justify-center space-x-1">
					<h3 class="text-lg font-bold text-primary"> Miasta </h3>

					<p> ( {{ burgsTabCategories.length }} ) </p>
				</AccordionTrigger>

				<AccordionContent>
					<div class="m-2 p-2">
						<ChartLineWithPagination
							:categories="burgsTabCategories"
							:data="burgsTab"
							:index="'turn'"
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
</template>
