<script lang="ts" setup>
import buildingsSummary from './buildings/buildingsSummary.vue';
import buildingsTable from './buildings/buildingsTable.vue';
import productsTable from './buildings/productsTable.vue';

// TODO: Budynki
const { state, turn } = storeToRefs(useReportStore());

// const carouselContent = {
// 	buildings: buildingsTable
// };
const carouselContent = new Map<string, Component>([
	['buildings', buildingsTable],
	['products', productsTable],
	['summary', buildingsSummary]
]);
</script>

<template>
	<!-- <div class="grid grid-cols-12">
		<div class="col-span-12 flex w-full flex-col items-center justify-center px-10">

		</div>
	</div> -->
	<div class="px-10">
		<Carousel class="w-full">
			<CarouselContent>
				<CarouselItem v-for="[name, component] in carouselContent" :key="name">
					<div class="m-1 border p-1">
						<component :is="component" />
						<!-- <Card>
							<CardContent class="flex aspect-square items-center justify-center p-6">
							</CardContent>
						</Card> -->
					</div>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</div>
</template>
