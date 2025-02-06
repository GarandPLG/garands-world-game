<script lang="ts" setup>
import type { TradesResponse } from '@/types/pb-types';
import { Icon }                from '@iconify/vue';

const props = defineProps<{ tradeType: TradesResponse<unknown>[]; header: string }>();

const { statesNames } = await useFetchTradeReport();
</script>

<template>
	<div class="trade-card m-2 rounded-lg border-2 p-4">
		<h2 class="mb-4 text-center text-2xl font-bold text-primary">
			{{ header }}
		</h2>

		<div v-for="tradeDeal in tradeType" :key="tradeDeal.id" class="mb-4 last:mb-0">
			<div class="grid grid-cols-3 items-center gap-4">
				<div class="flex h-full w-full flex-col items-center justify-center rounded-md border">
					<span class="mb-3 font-semibold text-primary">
						{{ constProductsData[tradeDeal.product].translation }}
					</span>

					<Icon
						:icon="constProductsData[tradeDeal.product].icon"
						width="52"
						height="52"
						class="mb-2"
					/>
				</div>

				<div class="flex h-full w-full flex-col items-center justify-center rounded-md border">
					<span class="font-semibold text-primary">
						{{
							statesNames.find(
								state => state.id === (tradeDeal.exportState || tradeDeal.importState)
							)?.name
						}}
					</span>

					<div class="mb-2 h-[120px] w-[180px] rounded-md border">
						<!-- TODO: Dodać flagę danego kraju, dodać nowe zapytanie w useFetchTradeReport -->
					</div>
				</div>

				<div class="flex h-full w-full items-center justify-center rounded-md border p-3">
					<div class="space-y-2">
						<div class="flex justify-between gap-4">
							<span>Ilość:</span>

							<span class="text-primary">
								{{ useFormatNumber(tradeDeal.volume) }}
							</span>
						</div>

						<div class="flex justify-between gap-4">
							<span>Cena:</span>

							<span class="text-primary">
								{{ useFormatNumber(tradeDeal.price) }}
							</span>
						</div>

						<div class="flex justify-between gap-4">
							<span>Wartość:</span>

							<span class="text-primary">
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
	</div>
</template>
