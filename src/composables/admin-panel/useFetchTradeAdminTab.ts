import type { StatesResponse, TradesResponse, TurnsResponse } from '@/types/pb-types';

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

	const tradeDealsPresentTurn = ref<TradesResponse<unknown>[] | []>(
		await useCachedData({
			key: `TradeDealsPresentTurn-${presentTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}"`,
				fields: ['importState,exportState,volume,product,price,isDiscontinued']
			}
		})
	);

	const tradeDealsFollowingTurn = ref<TradesResponse<unknown>[] | []>(
		await useCachedData({
			key: `TradeDealsFollowingTurn-${followingTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'trades',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${followingTurn.value.id}"`,
				fields: ['importState,exportState,volume,product,price,isDiscontinued']
			}
		})
	);

	const statesTradeEmblems = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `Emblems-${presentTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}" && name != "Neutrals"`,
				fields: ['id,name,emblemSVG,color']
			}
		})
	);

	const presentTurnStates = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `presentTurnStates-${presentTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${presentTurn.value.id}"`,
				fields: ['id,name']
			}
		})
	);

	const followingTurnStates = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `followingTurnStates-${followingTurn.value.value + 1} -- adminPanelTrade`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${followingTurn.value.id}"`,
				fields: ['id,name']
			}
		})
	);

	return {
		presentTurn,
		followingTurn,
		tradeDealsPresentTurn,
		tradeDealsFollowingTurn,
		statesTradeEmblems,
		presentTurnStates,
		followingTurnStates
	};
}
