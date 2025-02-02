<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
}>();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const { turnRecords, burgs, provinces } = await useFetchPopulationReport(
	props.turn,
	props.state,
	!['moderator', 'admin'].includes(currentUser.value?.role),
	currentUser.value?.id ? `"${currentUser.value.id}"` : null
);
</script>

<template>
	<div class="grid grid-cols-12">
		<div class="col-span-4 flex w-full flex-col items-center justify-center">
			<PopulationGrowth
				class="mb-5"
				:rural="state.ruralPopulation"
				:urban="state.urbanPopulation"
				:growthRate="0.5"
			/>
		</div>

		<PopulationAccordion
			:turnRecords="turnRecords"
			:burgs="burgs"
			:provinces="provinces"
			class="col-span-8"
		/>
	</div>
</template>
