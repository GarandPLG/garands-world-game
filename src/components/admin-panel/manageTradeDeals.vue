<script lang="ts" setup>
const props = defineProps<{
	title: string;
	description: string;
}>();

// const { presentTurn, followingTurn, tradeDeals, statesTradeEmblems } =
// 	await useFetchTradeAdminTab();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle> {{ props.title }} </CardTitle>

			<CardDescription>{{ props.description }}</CardDescription>
		</CardHeader>

		<Separator />

		<CardContent class="h-full space-y-2 py-6">
			<TradeDetailsTableAdmin />
		</CardContent>
	</Card>
</template>
