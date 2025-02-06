<script lang="ts" setup>
// TODO: Handel

const { imports, exports } = await useFetchTradeReport();
</script>

<template>
	<div class="grid grid-cols-12">
		<div class="col-span-6">
			<TradeDeal :tradeType="imports" header="Import" />
		</div>

		<div class="col-span-6">
			<TradeDeal :tradeType="exports" header="Eksport" />
		</div>
	</div>
</template>
