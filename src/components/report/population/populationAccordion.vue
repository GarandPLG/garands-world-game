<script lang="ts" setup>
defineProps<{
	sections: {
		value: string;
		title: string;
		count: number;
		type: string;
	}[];
	tabs: {
		name: string;
		value: string;
		tab: {
			turn: number;
		}[];
	}[];
	provincesCategories: string[];
	provincesColors: string[];
	burgsTabCategories: string[];
	burgsTab: {
		turn: number;
	}[];
}>();
</script>

<template>
	<Accordion type="single" class="w-full" collapsible>
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
