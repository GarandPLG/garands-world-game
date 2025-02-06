import type { BurgsResponse, ProvincesResponse } from '@/types/pb-types';

export default async function () {
	const { state, turn } = storeToRefs(useReportStore());

	const { redisKeyPrefix } = useRedisKeyPrefix(state.value.name, turn.value.value);

	const provincesData = ref<ProvincesResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportAdministrationProvinces`,
			collection: 'provinces',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.value.id}" && state = "${state.value.id}"`,
				fields: [
					'color,name,nameFull,emblemSVG,capital,ruralPopulation,urbanPopulation,burgs,cells'
				]
			}
		})
	);

	const burgsData = ref<BurgsResponse<unknown>[]>(
		await useCachedData({
			key: `${redisKeyPrefix} -- reportAdministrationBurgs`,
			collection: 'burgs',
			ttl: 1800,
			requestArgs: {
				filter: `turn = "${turn.value.id}" && state = "${state.value.id}"`,
				fields: [
					'name,cityGeneratorLink,emblemSVG,culture,religion,population,isCapital,isPort,isCitadel,isWalls,isPlaza,isTemple,isShantyTown'
				]
			}
		})
	);

	const cultureData: { id: string; name: string; color: string }[] = await useCachedData({
		key: `${redisKeyPrefix} -- reportAdministrationCultureData`,
		collection: 'cultures',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${turn.value.id}"`,
			fields: ['id,name,color']
		}
	});

	const religionData: { id: string; name: string; color: string }[] = await useCachedData({
		key: `${redisKeyPrefix} -- reportAdministrationReligionData`,
		collection: 'religions',
		ttl: 1800,
		requestArgs: {
			filter: `turn = "${turn.value.id}"`,
			fields: ['id,name,color']
		}
	});

	return {
		provincesData,
		burgsData,
		cultureData,
		religionData
	};
}
