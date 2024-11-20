<script lang="ts" setup>
// TODO: Strona z podglądem raportów wszystkich krajów z ze wszystkich tur
const props = defineProps<{
	title: string;
	description: string;
}>();

const cd = cacheFullListResponsesStore();

if (!cd.turnsData.length) await cd.fetchTurnsData();
if (!cd.statesData.length) await cd.fetchStatesData();

const turnsData = cd.turnsData;
const statesData = cd.statesData;

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
