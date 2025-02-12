<script lang="ts" setup>
const { tradeDeals, statesTradeEmblems } = await useFetchTradeAdminTab();
</script>

<template>
	<Table class="h-full w-full">
		<TableHeader>
			<TableRow>
				<TableHead class="w-[52px] text-center"> Produkt </TableHead>

				<TableHead class="w-[200px] text-center"> Eksport z </TableHead>

				<TableHead class="w-[200px] text-center"> Import do </TableHead>

				<TableHead class="text-center"> Cena </TableHead>

				<TableHead class="text-center"> Ilość </TableHead>

				<TableHead class="text-center"> Wartość </TableHead>

				<TableHead class="w-[25px] text-center"> Zapisz </TableHead>

				<TableHead class="w-[25px] text-center"> Usuń </TableHead>
			</TableRow>
		</TableHeader>

		<TableBody class="h-full">
			<TableRow v-for="tradeDeal in tradeDeals" :key="tradeDeal.id" class="h-full">
				<TableCell class="w-[52px] text-center">
					<ProductTooltip :product="tradeDeal.product" />
				</TableCell>

				<TableCell>
					<ShowEmblemFrame
						:state="statesTradeEmblems.find(state => state.id === tradeDeal.importState)"
					/>
				</TableCell>

				<TableCell>
					<ShowEmblemFrame
						:state="statesTradeEmblems.find(state => state.id === tradeDeal.exportState)"
					/>
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					{{ useFormatNumber(tradeDeal.price) }}
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					{{ useFormatNumber(tradeDeal.volume) }}
				</TableCell>

				<TableCell class="text-center text-xl font-bold">
					{{ useFormatNumber(tradeDeal.price * tradeDeal.volume) }}
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
