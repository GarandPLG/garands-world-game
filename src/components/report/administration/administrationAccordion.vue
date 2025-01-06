<script lang="ts" setup>
import type { TurnsResponse } from '@/types/pb-types';

interface AccordionItem {
	title: string;
	content: any[];
	len: number;
	type: 'provinces' | 'burgs' | 'chart';
	chartType?: 'pie' | 'donut';
}

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	accordionItems: AccordionItem[];
}>();

const provinces = props.accordionItems.find(item => item.type === 'provinces')?.content ?? [];
const burgs = props.accordionItems.find(item => item.type === 'burgs')?.content ?? [];

const cultureNames = await useCachedData({
	key: 'cultureNames',
	collection: 'cultures',
	ttl: 1800,
	requestArgs: {
		filter: `turn = "${props.turn.id}"`,
		fields: ['id,name']
	}
});

const religionNames = await useCachedData({
	key: 'religionNames',
	collection: 'religions',
	ttl: 1800,
	requestArgs: {
		filter: `turn = "${props.turn.id}"`,
		fields: ['id,name']
	}
});
</script>

<template>
	<Accordion type="single" class="w-full" collapsible>
		<AccordionItem v-for="item in props.accordionItems" :key="item.title" :value="item.title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ item.title }}</h3>

				<p> ( {{ item.len }} )</p>
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
							:cultures="cultureNames"
							:religions="religionNames"
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
						:type="item.chartType"
						:sort-function="(a, b) => b.amount - a.amount"
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</template>

<!-- <script lang="ts" setup>
import type { BurgsResponse, ProvincesResponse, TurnsResponse } from '@/types/pb-types';

interface AccordionItem {
	title: string;
	content: ProvincesResponse<unknown>[] | BurgsResponse<unknown>[] | object;
	len: number;
}

const props = defineProps<{
	turn: TurnsResponse<unknown>;
	accordionItems: AccordionItem[];
}>();

const provinces = props.accordionItems[0].content as ProvincesResponse<unknown>[];
const burgs = props.accordionItems[1].content as BurgsResponse<unknown>[];

const cultures = await useCachedData({
	key: 'cultureNames',
	collection: 'cultures',
	ttl: 1800,
	requestArgs: {
		filter: `turn = "${props.turn.id}"`,
		fields: ['id,name']
	}
});

const religions = await useCachedData({
	key: 'religionNames',
	collection: 'religions',
	ttl: 1800,
	requestArgs: {
		filter: `turn = "${props.turn.id}"`,
		fields: ['id,name']
	}
});

const biomesChartType = ref<'pie' | 'donut'>('pie');
const biomesContent = props.accordionItems[2].content;

const biomesChartData = Object.entries(biomesContent).map(([name, value]) => ({
	name,
	amount: parseInt(value)
}));

const religionsChartType = ref<'pie' | 'donut'>('pie');
const religionsContent = props.accordionItems[3].content;

const religionsChartData = Object.entries(religionsContent).map(([name, value]) => ({
	name,
	amount: parseInt(value)
}));

const culturesChartType = ref<'pie' | 'donut'>('pie');
const culturesContent = props.accordionItems[4].content;

const culturesChartData = Object.entries(culturesContent).map(([name, value]) => ({
	name,
	amount: parseInt(value)
}));
</script>

<template>
	<Accordion type="single" class="w-full" collapsible>
		<AccordionItem :value="props.accordionItems[0].title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ props.accordionItems[0].title }}</h3>
				<p> ( {{ props.accordionItems[0].len }} )</p>
			</AccordionTrigger>

			<AccordionContent>
				<ScrollArea class="h-[500px]">
					<div class="flex flex-wrap justify-center gap-6">
						<div
							v-for="province in provinces"
							:key="province.id"
							class="flex h-[165px] w-[500px] flex-col gap-2 rounded-md border"
						>
							<div class="flex items-center justify-center">
								<span class="mr-2 h-3 w-3" :if="province.color">
									<svg width="100%" height="100%" viewBox="0 0 30 30">
										<path
											d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
											:stroke="province.color"
											:fill="province.color"
											stroke-width="1"
										/>
									</svg>
								</span>

								<h3 class="text-center text-lg font-bold">
									{{ province.nameFull }} (
									<span class="text-primary">{{ province.name }}</span>
									)
								</h3>
							</div>

							<div class="flex flex-row">
								<figure v-html="province.emblemSVG" class="my-[-3rem]"></figure>

								<div class="mt-[-0.6rem] flex flex-col">
									<p class="text-base">
										Stolica:
										<span class="text-primary">
											{{ province.capital }}
										</span>
									</p>

									<p class="text-base">
										Populacja wiejska:
										<span class="text-primary">
											{{ province.ruralPopulation }}
										</span>
									</p>

									<p class="text-base">
										Populacja miejska:
										<span class="text-primary">
											{{ province.urbanPopulation }}
										</span>
									</p>

									<p class="text-base">
										Ilość miast:
										<span class="text-primary">
											{{ province.burgs }}
										</span>
									</p>

									<p class="text-base">
										Ilość kratek:
										<span class="text-primary">
											{{ province.cells }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</AccordionContent>
		</AccordionItem>

		<AccordionItem :value="props.accordionItems[1].title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ props.accordionItems[1].title }}</h3>
				<p> ( {{ props.accordionItems[1].len }} )</p>
			</AccordionTrigger>

			<AccordionContent>
				<ScrollArea class="h-[500px]">
					<div class="flex flex-wrap justify-center gap-6">
						<div
							v-for="burg in burgs"
							:key="burg.id"
							class="flex h-[177px] w-[500px] flex-col gap-2 rounded-md border"
						>
							<div class="flex items-center justify-center">
								<Button variant="link" as-child class="text-lg font-bold text-foreground">
									<a :href="burg.cityGeneratorLink" target="_blank">
										{{ burg.name }}
									</a>
								</Button>
							</div>

							<div class="flex flex-row">
								<figure v-html="burg.emblemSVG" class="my-[-3rem]"></figure>

								<div class="mt-[-0.6rem] flex flex-col">
									<p class="text-base">
										Populacja:
										<span class="text-primary">
											{{ burg.population }}
										</span>
									</p>

									<p class="text-base">
										Kultura:
										<span class="text-primary">
											{{ cultures.find(culture => culture.id === burg.culture)?.name }}
										</span>
									</p>

									<p class="text-base">
										Religia:
										<span class="text-primary">
											{{ religions.find(religion => religion.id === burg.religion)?.name }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</AccordionContent>
		</AccordionItem>

		<AccordionItem :value="props.accordionItems[2].title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ props.accordionItems[2].title }}</h3>
				<p> ( {{ props.accordionItems[2].len }} )</p>
			</AccordionTrigger>

			<AccordionContent>
				<div class="m-2 p-2">
					<DonutChart
						index="name"
						:category="'amount'"
						:data="biomesChartData"
						:type="biomesChartType"
						@click="biomesChartType = biomesChartType === 'donut' ? 'pie' : 'donut'"
					/>
				</div>
			</AccordionContent>
		</AccordionItem>

		<AccordionItem :value="props.accordionItems[3].title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ props.accordionItems[3].title }}</h3>
				<p> ( {{ props.accordionItems[3].len }} )</p>
			</AccordionTrigger>

			<AccordionContent>
				<div class="m-2 p-2">
					<DonutChart
						index="name"
						:category="'amount'"
						:data="religionsChartData"
						:type="religionsChartType"
						@click="religionsChartType = religionsChartType === 'donut' ? 'pie' : 'donut'"
					/>
				</div>
			</AccordionContent>
		</AccordionItem>

		<AccordionItem :value="props.accordionItems[4].title">
			<AccordionTrigger class="items-center justify-center space-x-1">
				<h3 class="text-lg font-bold text-primary">{{ props.accordionItems[4].title }}</h3>
				<p> ( {{ props.accordionItems[4].len }} )</p>
			</AccordionTrigger>

			<AccordionContent>
				<div class="m-2 p-2">
					<DonutChart
						index="name"
						:category="'amount'"
						:data="culturesChartData"
						:type="culturesChartType"
						@click="culturesChartType = culturesChartType === 'donut' ? 'pie' : 'donut'"
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
</style> -->
