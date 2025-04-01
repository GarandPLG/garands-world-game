<script lang="ts" setup>
const props = defineProps<{
	title: string;
	description: string;
}>();

const {
	tradeDealsPresentTurn,
	tradeDealsFollowingTurn,
	presentTurn,
	followingTurn,
	rePullTradeDeals
} = await useFetchTradeAdminTab();

const handleRefresh = async () => {
	await rePullTradeDeals();
};
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle> {{ props.title }} </CardTitle>

			<CardDescription>{{ props.description }}</CardDescription>
		</CardHeader>

		<Separator />

		<CardContent class="h-full space-y-2 py-6">
			<Tabs default-value="presentTurn" class="w-full">
				<TabsList class="w-full gap-10">
					<TabsTrigger value="presentTurn"> Umowy handlowe z obecnej tury </TabsTrigger>

					<TabsTrigger value="followingTurn"> Umowy handlowe na przyszłą turę </TabsTrigger>
				</TabsList>

				<TabsContent value="presentTurn">
					<TradeDetailsTableAdmin
						:tradeDeals="tradeDealsPresentTurn"
						:turn="presentTurn"
						@refresh-table="handleRefresh"
					/>
				</TabsContent>

				<TabsContent value="followingTurn">
					<TradeDetailsTableAdmin
						:tradeDeals="tradeDealsFollowingTurn"
						:turn="followingTurn"
						@refresh-table="handleRefresh"
					/>
				</TabsContent>
			</Tabs>
		</CardContent>
	</Card>
</template>
