<script lang="ts" setup>
const props = defineProps<{
	title: string;
	description: string;
}>();

const { fetchTurnsData, fetchStatesData } = cacheFullListResponsesStore();

const cd = storeToRefs(cacheFullListResponsesStore());

if (!cd.turnsData.value.length) await fetchTurnsData();
if (!cd.statesData.value.length) await fetchStatesData();

const turns = [...cd.turnsData.value].slice(1);

const states = [
	...new Set(
		cd.statesData.value.filter(state => state.name !== 'Neutrals').map(state => state.name)
	)
];

const reportsData: string[] = [];
for (let i = 0; i < states.length; i++) {
	for (let j = turns.length - 1; j >= 0; j--) {
		reportsData.push(`${turns[j].value}/${states[i]}`);
	}
}

const groupedReportsData = reportsData.reduce((acc, str) => {
	const key = str.split('/')[1];
	acc[key] = acc[key] || [];
	acc[key].push(str);
	return acc;
}, {});

const reports = Object.values(groupedReportsData);
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
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead v-for="turn in turns.reverse()" :key="turn.id" class="text-center">
								{{ turn.value }}
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						<TableRow v-for="(states, index) in reports" :key="index">
							<TableCell v-for="state in states" :key="state" class="text-center">
								<Button variant="link" as-child>
									<RouterLink :to="`reports/${state}`">
										{{ state.split('/')[1] }}
									</RouterLink>
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	</div>
</template>
