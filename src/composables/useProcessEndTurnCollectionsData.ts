import type {
	mapExtractedBurgs,
	mapExtractedCultures,
	mapExtractedProvinces,
	mapExtractedReligions,
	mapExtractedStates
} from '@/types/mapExtractors';
import type { CollectionRecords, Collections } from '@/types/pb-types';
import type { RecordModel } from 'pocketbase';

const pb = usePocketBase();
const { toast } = useToast();

async function createRecord(
	collectionName: Collections,
	data: Record<string, any>,
	errorMessage: string
): Promise<RecordModel> {
	try {
		const response = await pb.collection(collectionName).create(data);

		return response;
	} catch (error) {
		toast({
			title: errorMessage,
			description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
		});

		throw error;
	}
}

type ExtractedDataType =
	| mapExtractedStates
	| mapExtractedCultures
	| mapExtractedReligions
	| mapExtractedProvinces
	| mapExtractedBurgs;

type MapFunctionReturn<C extends Collections> = Partial<CollectionRecords[C]>;

export default async function useProcessEndTurnCollectionsData<
	C extends Collections,
	T extends ExtractedDataType
>(
	collectionName: C,
	data: T[],
	mapFunction: (entity: T) => MapFunctionReturn<C>,
	errorPrefix: string
): Promise<{ [key: string]: string }> {
	const startTime = Date.now();

	const responses = await Promise.all(
		data.map(entity =>
			createRecord(
				collectionName,
				mapFunction(entity),
				`Błąd przy tworzeniu ${errorPrefix} ${
					'name' in entity
						? entity.name
						: 'State' in entity
							? entity.State
							: 'Province' in entity
								? entity.Province
								: 'Burg' in entity
									? entity.Burg
									: ''
				}!`
			)
		)
	);

	const endTime = Date.now();

	toast({
		title: `${errorPrefix} zostały dodane`,
		description: `Dodano ${data.length} ${errorPrefix.toLowerCase()} w czasie: ${((endTime - startTime) / 1000).toFixed(3)} s`
	});

	return Object.fromEntries(responses.map(response => [response.name, response.id]));
}
