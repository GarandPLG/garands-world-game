export async function useCachedData(
	key: string,
	collection: string,
	ttl?: number,
	requestArgs?: Object
): Promise<any[]> {
	const redis = useRedis();
	const pb = usePocketBase();
	const { toast } = useToast();

	let data = [];

	const cache: { value: any[] | null; type: string | null } = await redis.get(key);

	if (!cache.value) {
		try {
			const response = await pb.collection(collection).getFullList(requestArgs);

			await redis.set(key, response, ttl, 'list');
			data = response;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu danych!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});

			if (error instanceof Error) throw error;
		}
	} else data = cache.value;

	return data;
}
