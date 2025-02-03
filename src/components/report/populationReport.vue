<script lang="ts" setup>
const { state } = storeToRefs(useReportStore());
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

		<PopulationAccordion class="col-span-8" />
	</div>
</template>
