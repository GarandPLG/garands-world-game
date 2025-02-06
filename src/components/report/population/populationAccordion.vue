<script lang="ts" setup>
const { turnRecords, burgs, provinces } = await useFetchPopulationReport();

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
const provincesColors = Object.values(lastRecord).filter(value => typeof value !== 'number');

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
	<Accordion type="single" class="w-full" collapsible :default-value="sections[0].value">
		<AccordionItem v-for="section in sections" :key="section.value" :value="section.value">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary"> {{ section.title }} </h3>

				<p>({{ section.count }})</p>
			</AccordionTrigger>

			<AccordionContent>
				<div
					class="m-2 p-2"
					:class="{
						'flex flex-col items-center justify-center': section.type === 'provinces'
					}"
				>
					<template v-if="section.type === 'provinces'">
						<Tabs
							default-value="ruralPopulation"
							class="flex w-full flex-col items-center justify-center"
						>
							<TabsList class="mb-2">
								<TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
									{{ tab.name }}
								</TabsTrigger>
							</TabsList>

							<TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="w-full">
								<ChartLineWithPagination
									:categories="provincesCategories"
									:index="'turn'"
									:colors="provincesColors"
									:data="tab.tab"
								/>
							</TabsContent>
						</Tabs>
					</template>

					<template v-else>
						<ChartLineWithPagination
							:categories="burgsTabCategories"
							:data="burgsTab"
							:index="'turn'"
						/>
					</template>
				</div>
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</template>
