import type {
	BurgsResponse,
	ProvincesResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';

export default async function (
	turn: TurnsResponse<unknown>,
	state: StatesResponse<unknown, unknown, unknown, unknown, unknown>,
	isUserNotAdmin?: boolean,
	user?: string | null
) {
	const provincesData = ref<ProvincesResponse<unknown>[]>(
		await useCachedData({
			key: `${state.name}-${turn.value + 1}-${isUserNotAdmin ? user : 'Administration'} -- reportAdministrationProvinces`,
			collection: 'provinces',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.id}" && state = "${state.id}"`,
				fields: [
					'color,name,nameFull,emblemSVG,capital,ruralPopulation,urbanPopulation,burgs,cells'
				]
			}
		})
	);

	const burgsData = ref<BurgsResponse<unknown>[]>(
		await useCachedData({
			key: `${state.name}-${turn.value + 1}-${isUserNotAdmin ? user : 'Administration'} -- reportAdministrationBurgs`,
			collection: 'burgs',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.id}" && state = "${state.id}"`,
				fields: [
					'name,cityGeneratorLink,emblemSVG,culture,religion,population,isCapital,isPort,isCitadel,isWalls,isPlaza,isTemple,isShantyTown'
				]
			}
		})
	);

	const cultureNames: { id: string; name: string }[] = await useCachedData({
		key: `${state.name}-${turn.value + 1}-${isUserNotAdmin ? user : 'Administration'} -- cultureNames`,
		collection: 'cultures',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${turn.id}"`,
			fields: ['id,name']
		}
	});

	const religionNames: { id: string; name: string }[] = await useCachedData({
		key: `${state.name}-${turn.value + 1}-${isUserNotAdmin ? user : 'Administration'} -- religionNames`,
		collection: 'religions',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${turn.id}"`,
			fields: ['id,name']
		}
	});

	return {
		provincesData,
		burgsData,
		cultureNames,
		religionNames
	};
}
