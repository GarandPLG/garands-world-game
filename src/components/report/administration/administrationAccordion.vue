<script lang="ts" setup>
import type { BurgsResponse, ProvincesResponse } from '@/types/pb-types';

type ChartContent = Array<{ name: string; amount: number; color: string }>;

interface AccordionItems {
	title: string;
	content: ProvincesResponse<unknown>[] | BurgsResponse<unknown>[] | ChartContent;
	len: number;
	type: 'provinces' | 'burgs' | 'chart';
}

const props = defineProps<{
	accordionItems: AccordionItems[];
}>();

const provinces = (props.accordionItems.find(item => item.type === 'provinces')?.content ??
	[]) as ProvincesResponse<unknown>[];
const burgs = (props.accordionItems.find(item => item.type === 'burgs')?.content ??
	[]) as BurgsResponse<unknown>[];

const colorsFromContent = (content: ChartContent): string[] => content.map(c => c.color);
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
						<AdministrationBurgCard v-for="burg in burgs" :key="burg.id" :burg="burg" />
					</div>
				</ScrollArea>
			</AccordionContent>

			<AccordionContent v-else-if="item.type === 'chart'">
				<div class="m-2 p-2">
					<DonutChart
						index="name"
						category="amount"
						:data="item.content as ChartContent"
						:colors="colorsFromContent(item.content as ChartContent)"
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
