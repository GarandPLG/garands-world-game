import type { StatesResponse, TurnsResponse } from '@/types/pb-types';

export const useReportStore = defineStore('useReportStore', () => {
	const state = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>>();
	const turn = ref<TurnsResponse<unknown>>();

	function setState(newState: StatesResponse<unknown, unknown, unknown, unknown, unknown>): void {
		state.value = newState;
	}

	function setTurn(newTurn: TurnsResponse<unknown>): void {
		turn.value = newTurn;
	}

	function initReportStore(
		newState: StatesResponse<unknown, unknown, unknown, unknown, unknown>,
		newTurn: TurnsResponse<unknown>
	): void {
		setState(newState);
		setTurn(newTurn);
	}

	return { state, turn, setState, setTurn, initReportStore };
});
