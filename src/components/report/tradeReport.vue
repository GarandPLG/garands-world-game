<script lang="ts" setup>
// TODO: Handel

const { imports, exports } = await useFetchTradeReport();
</script>

<template>
	<div class="grid h-full w-full grid-cols-2 gap-10 space-x-1">
		<div class="col-span-1">
			<h2 class="mb-4 text-center text-2xl font-bold text-primary">Import</h2>

			<TradeDeal v-if="imports.length" :tradeType="imports" />
			<div v-else class="text-center text-gray-500">Brak umów handlowych na import</div>
		</div>

		<div class="col-span-1">
			<h2 class="mb-4 text-center text-2xl font-bold text-primary">Eksport</h2>

			<TradeDeal v-if="exports.length" :tradeType="exports" />
			<div v-else class="text-center text-gray-500">Brak umów handlowych na eksport</div>
		</div>
	</div>
</template>
