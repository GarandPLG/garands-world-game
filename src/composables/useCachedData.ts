import type { ListResult, RecordModel } from 'pocketbase';

export async function useCachedData({
	key,
	collection,
	ttl,
	func = 'getFullList',
	requestArgs,
	recordId,
	pagination = [1, 50],
	filter
}: {
	key: string;
	collection: string;
	ttl?: number;
	func?: string;
	requestArgs?: Object;
	recordId?: string;
	pagination?: number[];
	filter?: string;
}): Promise<any[] | any> {
	const redis = useRedis();
	const pb = usePocketBase();
	const { toast } = useToast();

	let response: RecordModel[] | ListResult<RecordModel> = [];
	const cache: { value: any[] | null; type: string | null } = await redis.get(key);

	if (!cache.value) {
		try {
			switch (func) {
				case 'getFullList':
					response = await pb.collection(collection).getFullList(requestArgs);

					if (response) await redis.set(key, response, ttl, 'list');

					break;

				case 'getFirstListItem':
					if (!filter) return [];

					response = await pb.collection(collection).getFirstListItem(filter, requestArgs);

					if (response) await redis.set(key, response, ttl);

					break;

				case 'getList':
					if (!pagination[0] || !pagination[1]) return [];

					response = await pb
						.collection(collection)
						.getList(pagination[0], pagination[1], requestArgs);

					if (response) await redis.set(key, response, ttl, 'list');

					break;

				case 'getOne':
					if (!recordId) return [];

					response = await pb.collection(collection).getOne(recordId, requestArgs);

					if (response) await redis.set(key, response, ttl);

					break;
			}
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu danych!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});

			if (error instanceof Error) throw error;
		}
	} else response = cache.value;

	return response;
}
