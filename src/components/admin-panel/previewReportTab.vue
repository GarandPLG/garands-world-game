<script lang="ts" setup>
// TODO: Strona z podglądem raportów wszystkich krajów z ze wszystkich tur
const props = defineProps<{
	title: string;
	description: string;
}>();

const fetchData = cacheFullListResponses();

const turnsData = await fetchData.fetchTurnsData();
const statesData = await fetchData.fetchStatesData();

const data: string[][] = []; // TODO: Linki do report/[turn]/[state] + status raportu
for (let i = 0; i < turnsData.length; i++) {
	const statesInTurn = statesData.filter(state => state.turn === turnsData[i].id);
	// data.push(statesInTurn);
}
console.log(data);
</script>

<template>
	<div>
		<Card>
			<CardHeader>
				<CardTitle> {{ props.title }} </CardTitle>

				<CardDescription>{{ props.description }}</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent class="space-y-2 py-6">
				<p>Jeżyk</p>
			</CardContent>
		</Card>
	</div>
</template>
