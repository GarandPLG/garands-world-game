import type {
	BurgsResponse,
	ProvincesResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';

export default async function useFetchPopulationReport(
	turn: TurnsResponse<unknown>,
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>,
	isUserNotAdmin: string | null,
	user: string | null
) {
	const stateRecords = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>(
		await useCachedData({
			key: `reportPopulationStateRecordsIDs-${turn.value + 1}-${state.name}-${isUserNotAdmin ? user : 'Administration'}`,
			collection: 'states',
			ttl: 1800,
			requestArgs: {
				filter: `name = "${state.name}"`,
				fields: ['id']
			}
		})
	);

	const turnRecords = ref<TurnsResponse<unknown>[]>(
		await useCachedData({
			key: `reportPopulationTurnRecords-${turn.value + 1}-${state.name}-${isUserNotAdmin ? user : 'Administration'}`,
			collection: 'turns',
			ttl: 1800,
			requestArgs: {
				filter: `value <= ${turn.value + 1}`,
				fields: ['id,value']
			}
		})
	);

	const burgs = ref<BurgsResponse<unknown>[]>(
		await useCachedData({
			key: `reportPopulationBurgs-${turn.value + 1}-${state.name}-${isUserNotAdmin ? user : 'Administration'}`,
			collection: 'burgs',
			ttl: 1800,
			requestArgs: {
				filter: stateRecords.value.map(state => `(state~'${state.id}')`).join('||'),
				fields: ['id,name,population,turn']
			}
		})
	);

	const provinces = ref<ProvincesResponse<unknown>[]>(
		await useCachedData({
			key: `reportPopulationProvinces-${turn.value + 1}-${state.name}-${isUserNotAdmin ? user : 'Administration'}`,
			collection: 'provinces',
			ttl: 1800,
			requestArgs: {
				filter: stateRecords.value.map(state => `(state~'${state.id}')`).join('||'),
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
