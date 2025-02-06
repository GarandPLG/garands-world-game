import type { StatesResponse, TradesResponse } from '@/types/pb-types';

export default async function () {
	const { state, turn } = storeToRefs(useReportStore());

	const { redisKeyPrefix } = useRedisKeyPrefix(state.value.name, turn.value.value);

	const imports = ref<TradesResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportTradeImports`,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.value.id}" && importState = "${state.value.id}"`,
				fields: ['exportState,volume,product,price,isDiscontinued']
			}
		})
	);

	const exports = ref<TradesResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportTradeExports`,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.value.id}" && exportState = "${state.value.id}"`,
				fields: ['importState,volume,product,price,isDiscontinued']
			}
		})
	);

	const statesTrade = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportTradeStatesData`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.value.id}"`,
				fields: ['id,name,emblemSVG,color']
			}
		})
	);

	return {
		imports,
		exports,
		statesTrade
	};
}
