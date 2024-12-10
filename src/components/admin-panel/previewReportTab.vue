<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

const props = defineProps<{
	title: string;
	description: string;
}>();

const turnsData = ref<TurnsResponse<unknown>[]>(
	await useCachedData({
		key: 'turnsDataPreviewReport',
		collection: 'turns',
		ttl: 1800,
		requestArgs: {
			fields: ['value']
		}
	})
);

const statesData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
	await useCachedData({
		key: 'statesDataPreviewReport',
		collection: 'states',
		ttl: 1800,
		requestArgs: {
			fields: ['name']
		}
	})
);

const turns = [...turnsData.value].slice(1);

// TODO: Może dałoby się to uprościć
const states = [
	...new Set(statesData.value.filter(state => state.name !== 'Neutrals').map(state => state.name))
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
