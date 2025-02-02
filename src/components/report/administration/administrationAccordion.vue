<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

interface AccordionItem {
	title: string;
	content: any[];
	len: number;
	type: 'provinces' | 'burgs' | 'chart';
}

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
	accordionItems: AccordionItem[];
}>();

const provinces = props.accordionItems.find(item => item.type === 'provinces')?.content ?? [];
const burgs = props.accordionItems.find(item => item.type === 'burgs')?.content ?? [];
</script>

<template>
	<Accordion
		type="single"
		class="w-full p-2"
		collapsible
		:default-value="props.accordionItems[0].title"
	>
		<AccordionItem v-for="item in props.accordionItems" :key="item.title" :value="item.title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary"> {{ item.title }} </h3>

				<p> ( {{ item.len }} ) </p>
			</AccordionTrigger>

			<AccordionContent v-if="item.type === 'provinces'">
				<ScrollArea class="h-[500px]">
					<div class="flex flex-wrap justify-center gap-6">
						<AdministrationProvincesCard
							v-for="province in provinces"
							:key="province.id"
							:province="province"
						/>
					</div>
				</ScrollArea>
			</AccordionContent>

			<AccordionContent v-else-if="item.type === 'burgs'">
				<ScrollArea class="h-[500px]">
					<div class="flex flex-wrap justify-center gap-6">
						<AdministrationBurgCard
							v-for="burg in burgs"
							:key="burg.id"
							:burg="burg"
							:turn="props.turn"
							:state="props.state"
						/>
					</div>
				</ScrollArea>
			</AccordionContent>

			<AccordionContent v-else-if="item.type === 'chart'">
				<div class="m-2 p-2">
					<DonutChart
						index="name"
						:category="'amount'"
						:data="item.content"
						type="donut"
						:sort-function="(a, b) => b.amount - a.amount"
						:valueFormatter="value => `${useFormatNumber(value)}`"
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</template>

<style>
figure {
	display: inline-block;
	transition: 0.2s;
}
figcaption {
	text-align: center;
	margin: 0.4em 0;
	font-family: 'Overlock SC';
}
address {
	width: 100%;
	max-width: 1018px;
	margin: 0 auto;
}
figure > a {
	text-decoration: none;
}
</style>
