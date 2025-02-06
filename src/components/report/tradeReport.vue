<script lang="ts" setup>
// TODO: Handel

const { imports, exports } = await useFetchTradeReport();

// TODO: Rozwiązać problem z redisem, gdy nie ma danych o imporcie lub eksporcie
</script>

<template>
	<div class="grid grid-cols-2 gap-4 space-x-1">
		<div class="col-span-1">
			<TradeDeal :tradeType="imports" header="Import" />
		</div>

		<div class="col-span-1">
			<TradeDeal :tradeType="exports" header="Eksport" />
		</div>
	</div>
</template>
