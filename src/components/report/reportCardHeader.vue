<script lang="ts" setup>
import type { CulturesResponse } from '@/types/pb-types';

const { state, turn } = storeToRefs(useReportStore());

const { redisKeyPrefix, isUserNotAdmin } = useRedisKeyPrefix(state.value.name, turn.value.value);

const culture = ref<CulturesResponse<unknown>>(
	await useCachedData({
		key: `${redisKeyPrefix} -- reportCultureTechnologyGroup`,
		collection: 'cultures',
		ttl: 1800,
		func: 'getFirstListItem',
		filter: computed(() => {
			const baseQuery = `turn = "${turn.value.id}" && id = "${state.value.culture}"`;
			return isUserNotAdmin ? `${baseQuery} && user = "${isUserNotAdmin}"` : baseQuery;
		}).value,
		requestArgs: {
			fields: ['namesbase']
		}
	})
);

const technologyGroup = ref<string>(
	constCultureToTechnologyGroup.has(culture.value.namesbase)
		? constCultureToTechnologyGroup.get(culture.value.namesbase)!
		: 'Human'
);
</script>

<template>
	<CardHeader class="mb-[-0.6rem]">
		<CardTitle class="flex items-center justify-center">
			<figure v-html="state.emblemSVG" class="my-[-3rem]"></figure>

			<div class="mt-[-0.5rem]">
				<p>
					{{ state.nameFull }}
					(
					<span class="text-primary">
						{{ state.name }}
					</span>
					)
				</p>

				<p>
					Tura: <span class="text-primary">{{ (turn?.value ?? 0) + 1 }}</span>
				</p>

				<p>
					Gracz:
					<span class="text-primary">
						{{ state.user ? state.user : 'Nieprzypisany' }}
					</span>
				</p>

				<p>
					Stolica:
					<span class="text-primary">{{ state.capital }}</span>
				</p>

				<p>
					Grupa technologii:
					<span class="text-primary">{{ technologyGroup }}</span>
				</p>
			</div>
		</CardTitle>

		<CardDescription> </CardDescription>
	</CardHeader>
</template>
