<script lang="ts" setup>
import type { TradesResponse } from '@/types/pb-types';
import { Icon }                from '@iconify/vue';

const props = defineProps<{ tradeType: TradesResponse<unknown>[]; header: string }>();

const { statesTrade } = await useFetchTradeReport();
</script>

<template>
	<div>
		<h2 class="mb-4 text-center text-2xl font-bold text-primary">
			{{ header }}
		</h2>

		<div class="grid grid-cols-2 gap-4">
			<div v-for="tradeDeal in tradeType" :key="tradeDeal.id" class="rounded-lg border-2 p-4">
				<div class="mb-4 flex justify-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger as-child>
								<Icon
									:icon="constProductsData[tradeDeal.product].icon"
									width="52"
									height="52"
									class="text-primary"
								/>
							</TooltipTrigger>

							<TooltipContent>
								<p class="text-center">
									{{ constProductsData[tradeDeal.product].translation }}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div class="flex justify-center">
					<div class="flex h-[165px] w-[200px] flex-col gap-3 rounded-md border">
						<div class="flex items-center justify-center">
							<span class="mr-2 h-3 w-3">
								<svg width="100%" height="100%" viewBox="0 0 30 30">
									<path
										d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
										:stroke="
											statesTrade.find(
												state => state.id === (tradeDeal.exportState || tradeDeal.importState)
											)?.color
										"
										:fill="
											statesTrade.find(
												state => state.id === (tradeDeal.exportState || tradeDeal.importState)
											)?.color
										"
										stroke-width="1"
									/>
								</svg>
							</span>

							<h3 class="text-center text-lg font-bold">{{
								statesTrade.find(
									state => state.id === (tradeDeal.exportState || tradeDeal.importState)
								)?.name
							}}</h3>
						</div>

						<figure
							v-html="
								statesTrade.find(
									state => state.id === (tradeDeal.exportState || tradeDeal.importState)
								)?.emblemSVG
							"
							class="my-[-3rem]"
						></figure>
					</div>
				</div>

				<div class="mt-5 rounded-md border p-3">
					<div class="grid grid-cols-2 gap-2">
						<span>Ilość:</span>
						<span class="text-right text-primary">
							{{ useFormatNumber(tradeDeal.volume) }}
						</span>

						<span>Cena:</span>
						<span class="text-right text-primary">
							{{ useFormatNumber(tradeDeal.price) }}
						</span>

						<span>Wartość:</span>
						<span class="text-right text-primary">
							{{
								useFormatNumber(
									tradeDeal.price * tradeDeal.volume * (tradeDeal?.exportState ? -1 : 1)
								)
							}}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
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
