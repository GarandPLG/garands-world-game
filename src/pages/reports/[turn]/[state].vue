<script lang="ts" setup>
import AdministrationReport from '@/components/report/administrationReport.vue';
import BuildingsReport from '@/components/report/buildingsReport.vue';
import DiplomacyReport from '@/components/report/diplomacyReport.vue';
import FinanceReport from '@/components/report/financeReport.vue';
import MilitaryReport from '@/components/report/militaryReport.vue';
import PopulationReport from '@/components/report/populationReport.vue';
import SummaryReport from '@/components/report/summaryReport.vue';
import TradeReport from '@/components/report/tradeReport.vue';
import type { CulturesResponse, StatesResponse, TurnsResponse } from '@/types/pb-types';
import type { AuthModel } from 'pocketbase';
import type { Component } from 'vue';

type RouteParams = {
	turn: number;
	state: string;
};

interface ReportTabs {
	name: string;
	component: Component;
	props: {
		turn: TurnsResponse<unknown>;
		state: StatesResponse<unknown, unknown, unknown, unknown, unknown>;
	};
}

const route = useRoute();
const router = useRouter();

const { currentUser } = storeToRefs(listenCurrentUserStore());

const turn = computed<string>(() => (route.params as RouteParams).turn - 1);
const state = computed<string>(() => (route.params as RouteParams).state);

useHead({
	title: `Garand's WG | Raport | Tura ${turn.value} | ${state.value}`
});

const user = computed<AuthModel | null>(() =>
	currentUser.value?.id ? `"${currentUser.value.id}"` : null
);
const isUserNotAdmin = !['moderator', 'admin'].includes(currentUser.value?.role);

const { redisKeyPrefix } = useRedisKeyPrefix(state.value, turn.value);

const turnData = ref<TurnsResponse<unknown>>();
const stateData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>>();
const cultureData = ref<CulturesResponse<unknown>>();

if (!user.value) router.push('/');
else {
	turnData.value = await useCachedData({
		key: `${redisKeyPrefix} -- reportTurn`,
		collection: 'turns',
		ttl: 1800,
		func: 'getFirstListItem',
		filter: computed(() => `value = "${turn.value}"`).value,
		requestArgs: {
			fields: ['id,value']
		}
	});

	if (!turnData.value) throw new Error('Nie znaleziono tury');

	stateData.value = await useCachedData({
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
	});

	if (!stateData.value) throw new Error('Nie znaleziono kraju');

	cultureData.value = await useCachedData({
		key: `${redisKeyPrefix} -- reportCultureTechnologyGroup`,
		collection: 'cultures',
		ttl: 1800,
		func: 'getFirstListItem',
		filter: computed(() => {
			const baseQuery = `turn = "${turnData.value.id}" && id = "${stateData.value.culture}"`;
			return isUserNotAdmin ? `${baseQuery} && user = "${isUserNotAdmin}"` : baseQuery;
		}).value,
		requestArgs: {
			fields: ['namesbase']
		}
	});

	if (!stateData.value) throw new Error('Nie znaleziono kultury');
}

const cultureToTechnologyGroup = {
	Orc: 'Orkish',
	Goblin: 'Orkish',
	Elven: 'Elfish',
	'Dark Elven': 'Elfish',
	Dwarven: 'Dwarven',
	Giant: 'Giants',
	Draconic: 'Draconic',
	Arachnid: 'Arachnid',
	Serpents: 'Serpents'
};

const technologyGroup = ref<string>(
	cultureData.value.namesbase in cultureToTechnologyGroup
		? cultureToTechnologyGroup[cultureData.value.namesbase]
		: 'Human'
);

const tabs = new Map<string, ReportTabs>([
	[
		'buildings',
		{
			name: 'Budynki',
			component: BuildingsReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'trade',
		{
			name: 'Handel',
			component: TradeReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'military',
		{
			name: 'Wojsko',
			component: MilitaryReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'administration',
		{
			name: 'Administracja',
			component: AdministrationReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'diplomacy',
		{
			name: 'Dyplomacja',
			component: DiplomacyReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'population',
		{
			name: 'Populacja',
			component: PopulationReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'finance',
		{
			name: 'Finanse',
			component: FinanceReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	],
	[
		'summary',
		{
			name: 'Podsumowanie',
			component: SummaryReport,
			props: { turn: turnData.value, state: stateData.value }
		}
	]
]);
</script>

<template>
	<div class="mb-10 mt-6 flex flex-col items-center justify-center">
		<Tabs default-value="summary" class="flex w-full flex-col items-center justify-center px-20">
			<TabsList class="w-full items-center justify-center">
				<TabsTrigger v-for="[key, value] in tabs" :key="key" :value="key">
					{{ value.name }}
				</TabsTrigger>
			</TabsList>

			<TabsContent
				v-for="[key, value] in tabs"
				:key="key"
				:value="key"
				class="h-screen w-full flex-col items-center justify-center"
			>
				<Card>
					<CardHeader class="mb-[-0.6rem]">
						<CardTitle class="flex items-center justify-center">
							<figure v-html="value.props.state.emblemSVG" class="my-[-3rem]"></figure>

							<div class="mt-[-0.5rem]">
								<p>
									{{ value.props.state.nameFull }}
									(
									<span class="text-primary">
										{{ value.props.state.name }}
									</span>
									)
								</p>

								<p>
									Tura: <span class="text-primary">{{ (turnData?.value ?? 0) + 1 }}</span>
								</p>

								<p>
									Gracz:
									<span class="text-primary">
										{{ value.props.state.user ? value.props.state.user : 'Nieprzypisany' }}
									</span>
								</p>

								<p>
									Stolica:
									<span class="text-primary">{{ value.props.state.capital }}</span>
								</p>

								<p>
									Grupa technologii:
									<span class="text-primary">{{ technologyGroup }}</span>
								</p>
							</div>
						</CardTitle>

						<CardDescription> </CardDescription>
					</CardHeader>

					<Separator />

					<CardContent class="space-y-2 py-6">
						<component :is="value.component" v-bind="value.props"></component>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
