import type {
	BurgsResponse,
	ProvincesResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';

export default async function () {
	const { state, turn } = storeToRefs(useReportStore());

	const { redisKeyPrefix } = useRedisKeyPrefix(state.value.name, turn.value.value);

	const stateRecords = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportPopulationStateRecordsIDs`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `name = "${state.value.name}"`,
				fields: ['id']
			}
		})
	);

	const turnRecords = ref<TurnsResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportPopulationTurnRecords`,
			collection: 'turns',
			ttl: 1800,
			requestArgs: {
				filter: `value <= ${turn.value.value + 1}`,
				fields: ['id,value']
			}
		})
	);

	const burgs = ref<BurgsResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportPopulationBurgs`,
			collection: 'burgs',
			ttl: 1800,
			requestArgs: {
				filter: stateRecords.value.map(stateData => `(state~'${stateData.id}')`).join('||'),
				fields: ['id,name,population,turn']
			}
		})
	);

	const provinces = ref<ProvincesResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportPopulationProvinces`,
			collection: 'provinces',
			ttl: 1800,
			requestArgs: {
				filter: stateRecords.value.map(stateData => `(state~'${stateData.id}')`).join('||'),
				fields: ['id,turn,name,color,ruralPopulation,urbanPopulation']
			}
		})
	);

	return {
		turnRecords,
		burgs,
		provinces
	};
}
