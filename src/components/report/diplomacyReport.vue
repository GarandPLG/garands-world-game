<script lang="ts" setup>
// TODO: Dyplomacja
import _ from 'lodash';

interface Flag {
	name: string;
	emblemSVG: string;
	color: string;
}

interface GroupedRelations {
	Ally?: Flag[];
	Friendly?: Flag[];
	Neutral?: Flag[];
	Suspicion?: Flag[];
	Enemy?: Flag[];
	Rival?: Flag[];
	Vassal?: Flag[];
	Suzerain?: Flag[];
}
const { state, turn } = storeToRefs(useReportStore());

const { redisKeyPrefix } = useRedisKeyPrefix(state.value.name, turn.value.value);

const flags: Flag[] = await useCachedData({
	key: `${redisKeyPrefix} -- reportDiplomacyFlags`,
	collection: 'states',
	ttl: 1800,
	requestArgs: {
		filter: `turn = "${turn.value.id}" && name != "${state.value.name}" && name != "Neutrals"`,
		fields: ['name,emblemSVG,color']
	}
});

if (!flags.length) throw new Error('Nie znaleziono flag');

// Grupuje według relacji (z pominięciem Unknown), po czym usuwa pole 'relation' z tych obiektów
const groupedRelations: GroupedRelations = _.pickBy(
	_.mapValues(
		_.groupBy(
			flags.map(flag => ({
				...flag,
				relation: (state.value.relations as { [key: string]: string })[flag.name]
			})),
			'relation'
		),
		relations => relations.map(({ relation, ...rest }) => rest)
	),
	(value, key) => key !== 'Unknown'
);

const relationsTab = [
	{ key: 'Vassal', label: 'Jesteś wasalem kraju' },
	{ key: 'Enemy', label: 'Jesteś w stanie wojny z' },
	{ key: 'Rival', label: 'Jesteś rywalem kraju' },
	{ key: 'Ally', label: 'Jesteś w sojuszu z' },
	{ key: 'Suzerain', label: 'Jesteś suzerenem nad' },
	{ key: 'Friendly', label: 'Jesteś w przyjaznych relacjach z' },
	{ key: 'Neutral', label: 'Jesteś w neutralnych relacjach z' },
	{ key: 'Suspicion', label: 'Jesteś w nieufnych relacjach z' }
];
</script>

<template>
	<div class="mt-[-2rem]">
		<div v-for="(relation, index) in relationsTab" :key="index">
			<div v-if="groupedRelations[relation.key]">
				<Separator class="my-10" :label="relation.label" />

				<GroupOfFlags :flags="groupedRelations[relation.key]" />
			</div>
		</div>
	</div>
</template>
