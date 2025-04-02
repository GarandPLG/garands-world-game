import type { StatesResponse, TradesResponse, TurnsResponse } from '@/types/pb-types';
const redis = useRedis();

export default async function () {
	const turns = ref<TurnsResponse<unknown>[]>(
		await useCachedData({
			key: 'turnsDataTurnEnd',
			collection: 'turns',
			ttl: 1800,
			requestArgs: {
				fields: ['id,value']
			}
		})
	);

	const presentTurn = computed<TurnsResponse<unknown>>(
		() => turns.value.at(-2) ?? ({} as TurnsResponse<unknown>)
	);

	const followingTurn = computed<TurnsResponse<unknown>>(
		() => turns.value.at(-1) ?? ({} as TurnsResponse<unknown>)
	);

	const tradeDealsPresentTurnKey = `TradeDealsPresentTurn-${presentTurn.value.value + 1} -- adminPanelTrade`;
	const tradeDealsFollowingTurnKey = `TradeDealsFollowingTurn-${followingTurn.value.value + 1} -- adminPanelTrade`;

	const tradeDealsPresentTurn = ref<TradesResponse<unknown>[] | []>(
		await useCachedData({
			key: tradeDealsPresentTurnKey,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}"`,
				fields: ['id,importState,exportState,volume,product,price,isDiscontinued']
			}
		})
	);

	const tradeDealsFollowingTurn = ref<TradesResponse<unknown>[] | []>(
		await useCachedData({
			key: tradeDealsFollowingTurnKey,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${followingTurn.value.id}"`,
				fields: ['id,importState,exportState,volume,product,price,isDiscontinued']
			}
		})
	);

	const tradeDealsStates = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `tradeDealsStates-${presentTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}" && name != "Neutrals"`,
				fields: ['id,name,emblemSVG,color']
			}
		})
	);

	const flushTradeDealsCache = async () => {
		await redis.del(tradeDealsPresentTurnKey);
		await redis.del(tradeDealsFollowingTurnKey);
	};

	const rePullTradeDeals = async () => {
		tradeDealsFollowingTurn.value = await useCachedData({
			key: tradeDealsFollowingTurnKey,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${followingTurn.value.id}"`,
				fields: ['id,importState,exportState,volume,product,price,isDiscontinued']
			}
		});

		tradeDealsPresentTurn.value = await useCachedData({
			key: tradeDealsPresentTurnKey,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}"`,
				fields: ['id,importState,exportState,volume,product,price,isDiscontinued']
			}
		});
	};

	return {
		presentTurn,
		followingTurn,
		tradeDealsPresentTurn,
		tradeDealsFollowingTurn,
		tradeDealsStates,
		flushTradeDealsCache,
		rePullTradeDeals
	};
}
