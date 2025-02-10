<script lang="ts" setup>
import type { TradesResponse } from '@/types/pb-types';
import { Icon } from '@iconify/vue';

const props = defineProps<{ tradeType: TradesResponse<unknown>[] }>();

const { statesTrade } = await useFetchTradeReport();

const tradeSums: Record<string, number> = {
	volume: props.tradeType.length ? props.tradeType.reduce((acc, curr) => acc + curr.volume, 0) : 0,
	value: props.tradeType.length
		? props.tradeType.reduce((acc, curr) => acc + curr.price * curr.volume, 0) *
			(props.tradeType[0].exportState ? -1 : 1)
		: 0
};
</script>

<template>
	<div class="h-full w-full">
		<Table class="h-full w-full">
			<TableHeader>
				<TableRow>
					<TableHead class="w-[52px] text-center"> Produkt </TableHead>

					<TableHead class="w-[200px] text-center"> Kraj </TableHead>

					<TableHead class="text-center"> Cena </TableHead>

					<TableHead class="text-center"> Ilość </TableHead>

					<TableHead class="text-center"> Wartość </TableHead>
				</TableRow>
			</TableHeader>

			<TableBody class="h-full">
				<TableRow v-for="tradeDeal in tradeType" :key="tradeDeal.id">
					<TableCell class="w-[52px] text-center">
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
					</TableCell>

					<TableCell>
						<ShowEmblemFrame
							:state="
								statesTrade.find(
									state => state.id === (tradeDeal.exportState || tradeDeal.importState)
								)
							"
						/>
					</TableCell>

					<TableCell class="text-center text-xl font-bold">
						{{ useFormatNumber(tradeDeal.price) }}
					</TableCell>

					<TableCell class="text-center text-xl font-bold">
						{{ useFormatNumber(tradeDeal.volume) }}
					</TableCell>

					<TableCell class="text-center text-xl font-bold">
						{{
							useFormatNumber(tradeDeal.price * tradeDeal.volume * (tradeDeal.exportState ? -1 : 1))
						}}
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell class="w-[52px] text-center"> </TableCell>

					<TableCell class="text-center text-xl font-bold"> Suma </TableCell>

					<TableCell class="text-center text-xl font-bold"> = </TableCell>

					<TableCell class="text-center text-xl font-bold text-primary">
						{{ useFormatNumber(tradeSums.volume) }}
					</TableCell>

					<TableCell class="text-center text-xl font-bold text-primary">
						{{ useFormatNumber(tradeSums.value) }}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
</template>
