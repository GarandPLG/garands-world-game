<script lang="ts" setup>
import type { TradesResponse } from '@/types/pb-types';
import { Icon } from '@iconify/vue';

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
					<ShowEmblemFrame
						:state="
							statesTrade.find(
								state => state.id === (tradeDeal.exportState || tradeDeal.importState)
							)
						"
					/>
				</div>

				<TradeDealDetails
					:volume="tradeDeal.volume"
					:price="tradeDeal.price"
					:is-export="!!tradeDeal.exportState"
				/>
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
