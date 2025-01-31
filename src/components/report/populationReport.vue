<script lang="ts" setup>
// TODO: Populacja
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

const createDataTab = (data: any[], field: string) =>
	turnRecords.value.slice(0, -1).map(turn => ({
		turn: turn.value,
		...data
			.filter(item => item.turn === turn.id)
			.reduce(
				(acc: object, item: any) => ({
					...acc,
					[item.name]: item[field]
				}),
				{}
			)
	}));

const burgsTab = createDataTab(burgs.value, 'population');
const burgsTabCategories: string[] = Object.keys(burgsTab[burgsTab.length - 1]).filter(
	key => key !== 'turn'
);

const provincesColorsTab = createDataTab(provinces.value, 'color');
const provincesRuralPopulationsTab = createDataTab(provinces.value, 'ruralPopulation');
const provincesUrbanPopulationsTab = createDataTab(provinces.value, 'urbanPopulation');

const lastRecord = provincesColorsTab[provincesColorsTab.length - 1];
const provincesCategories = Object.keys(lastRecord).filter(key => key !== 'turn');
const provincesColors: string[] = Object.values(lastRecord).filter(
	value => typeof value !== 'number'
);

const tabs = [
	{
		name: 'Populacja wiejska',
		value: 'ruralPopulation',
		tab: provincesRuralPopulationsTab
	},
	{
		name: 'Populacja Miejska',
		value: 'urbanPopulation',
		tab: provincesUrbanPopulationsTab
	}
];

const sections = [
	{
		value: 'provinces',
		title: 'Prowincje',
		count: provincesCategories.length,
		type: 'provinces'
	},
	{
		value: 'burgs',
		title: 'Miasta',
		count: burgsTabCategories.length,
		type: 'burgs'
	}
];
</script>

<template>
	<div>
		<div class="h-[500px]">placeholder content</div>

		<Separator class="my-2" />

		<PopulationAccordion
			:sections="sections"
			:tabs="tabs"
			:provincesCategories="provincesCategories"
			:provincesColors="provincesColors"
			:burgsTabCategories="burgsTabCategories"
			:burgsTab="burgsTab"
		/>
	</div>
</template>
