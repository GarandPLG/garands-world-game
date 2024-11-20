import type {
	BurgsResponse,
	CulturesResponse,
	ProvincesResponse,
	ReligionsResponse,
	StatesResponse,
	TurnsResponse
} from '@/types/pb-types';

const ONE_HOUR = 60 * 60 * 1000; // 1 godzina w milisekundach
export const cacheFullListResponsesStore = defineStore('cacheFullListResponsesStore', () => {
	const pb = usePocketBase();

	const turnsData = ref<TurnsResponse<unknown>[]>([]);
	const statesData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>([]);
	const provincesData = ref<ProvincesResponse<unknown>[]>([]);
	const burgsData = ref<BurgsResponse<unknown, unknown>[]>([]);
	const culturesData = ref<CulturesResponse<unknown>[]>([]);
	const religionsData = ref<ReligionsResponse<unknown>[]>([]);

	const fetchTurnsData = async () => {
		if (turnsData.value.length && isCached('turnsData')) return turnsData.value;
		try {
			const data = await pb.collection('turns').getFullList();
			turnsData.value = data;
			cacheData('turnsData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu tur!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const fetchStatesData = async () => {
		if (statesData.value.length && isCached('statesData')) return statesData.value;
		try {
			const data = await pb.collection('states').getFullList();
			statesData.value = data;
			cacheData('statesData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu państw!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const fetchProvincesData = async () => {
		if (provincesData.value.length && isCached('provincesData')) return provincesData.value;
		try {
			const data = await pb.collection('provinces').getFullList();
			provincesData.value = data;
			cacheData('provincesData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu prowincji!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const fetchBurgsData = async () => {
		if (burgsData.value.length && isCached('burgsData')) return burgsData.value;
		try {
			const data = await pb.collection('burgs').getFullList();
			burgsData.value = data;
			cacheData('burgsData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu miast!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const fetchCulturesData = async () => {
		if (culturesData.value.length && isCached('culturesData')) return culturesData.value;
		try {
			const data = await pb.collection('cultures').getFullList();
			culturesData.value = data;
			cacheData('culturesData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu kultur!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const fetchReligionsData = async () => {
		if (religionsData.value.length && isCached('religionsData')) return religionsData.value;
		try {
			const data = await pb.collection('religions').getFullList();
			religionsData.value = data;
			cacheData('religionsData', data);
			return data;
		} catch (error) {
			toast({
				title: 'Błąd przy pobieraniu religii!',
				description: error instanceof Error ? `${error.name}: ${error.message}` : 'Nieznany błąd.'
			});
			if (error instanceof Error) throw error;
		}
	};

	const cacheData = (key, data) => {
		const now = new Date().getTime();
		localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
	};

	const isCached = key => {
		const cachedData = localStorage.getItem(key);
		if (!cachedData) return false;
		console.log(cachedData);
		const { timestamp } = JSON.parse(cachedData);
		return new Date().getTime() - timestamp < ONE_HOUR;
	};

	// TODO: Funkcja czytająca z localstorage i wpisująca w fetcha jego zawartość
	// TODO: Subskrypcja in real time aktualizująca localstorage jeżeli się zmieni kolekcja

	return {
		turnsData,
		statesData,
		provincesData,
		burgsData,
		culturesData,
		religionsData,
		fetchTurnsData,
		fetchStatesData,
		fetchProvincesData,
		fetchBurgsData,
		fetchCulturesData,
		fetchReligionsData
	};
});
