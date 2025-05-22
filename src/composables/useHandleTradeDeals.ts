import type { StatesResponse, TradesResponse, TurnsResponse } from '@/types/pb-types';

export default async function useHandleTradeDeals(
	tradeDeals: TradesResponse<unknown>[],
	statesFromPreviousTurn: StatesResponse<unknown, unknown, unknown, unknown, unknown>[],
	turn: TurnsResponse<unknown>,
	responses: { [key: string]: string },
	operation: string,
	errorMessage: string
) {
	function getNewStateID(id: string, responses: { [key: string]: string }): string {
		const state = statesFromPreviousTurn.find(s => s.id === id);
		return state && statesFromPreviousTurn ? responses[state.name] : '';
	}

	const pb = usePocketBase();
	const { toast } = useToast();

	return async () => {
		try {
			await Promise.all(
				tradeDeals.map(tradeDeal => {
					const newTradeDeal = {
						turn: operation === 'create' ? turn.id : tradeDeal.turn,
						product: tradeDeal.product,
						exportState: getNewStateID(tradeDeal.exportState, responses),
						importState: getNewStateID(tradeDeal.importState, responses),
						volume: tradeDeal.volume,
						isDiscontinued: tradeDeal.isDiscontinued,
						...(operation === 'create' && { price: tradeDeal.price })
					};

					return operation === 'create'
						? pb.collection('trades').create(newTradeDeal)
						: pb.collection('trades').update(tradeDeal.id, newTradeDeal);
				})
			);
		} catch (error) {
			toast({
				title: errorMessage,
				description: error instanceof Error ? error.message : 'Wystąpił nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};
}
