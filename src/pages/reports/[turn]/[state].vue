<script lang="ts" setup>
import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

type RouteParams = {
	turn: number;
	state: string;
};

const route = useRoute();
const router = useRouter();

const turn = computed<number>(() => (route.params as RouteParams).turn - 1);
const state = computed<string>(() => (route.params as RouteParams).state);

useHead({
	title: `Garand's WG | Raport | Tura ${turn.value} | ${state.value}`
});

const { redisKeyPrefix, user, isUserNotAdmin } = useRedisKeyPrefix(state.value, turn.value);
const { initReportStore } = useReportStore();

if (!user) router.push('/');
else {
	const turnData = ref<TurnsResponse<unknown>>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportTurn`,
			collection: 'turns',
			ttl: 1800,
			func: 'getFirstListItem',
			filter: computed(() => `value = "${turn.value}"`).value,
			requestArgs: {
				fields: ['id,value']
			}
		})
	);

	const stateData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportState`,
			collection: 'states',
			ttl: 1800,
			func: 'getFirstListItem',
			filter: computed(() => {
				const baseQuery = `name = "${state.value}" && turn = "${turnData.value.id}"`;
				return isUserNotAdmin ? `${baseQuery} && user = "${isUserNotAdmin}"` : baseQuery;
			}).value,
			requestArgs: {
				fields: [
					'id,name,nameFull,emblemSVG,cells,color,culture,form,relations,biomesCells,culturesCells,religionsCells,capital,ruralPopulation,urbanPopulation'
				]
			}
		})
	);

	initReportStore(stateData.value, turnData.value);
}
</script>

<template>
	<div class="mb-10 mt-6 flex flex-col items-center justify-center">
		<Tabs default-value="summary" class="flex w-full flex-col items-center justify-center px-20">
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="tab in reportTabsData" :key="tab.value" :value="tab.value">
					{{ tab.name }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="tab in reportTabsData"
				:key="tab.value"
				:value="tab.value"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<Card>
					<ReportCardHeader />

					<Separator />

					<CardContent class="space-y-2 py-6">
						<component :is="tab.component"></component>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
