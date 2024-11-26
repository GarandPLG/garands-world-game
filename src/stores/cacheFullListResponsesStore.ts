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
	const { toast } = useToast();

	const turnsData = ref<TurnsResponse<unknown>[]>([]);
	const statesData = ref<StatesResponse<unknown, unknown, unknown, unknown, unknown>[]>([]);
	const provincesData = ref<ProvincesResponse<unknown>[]>([]);
	const burgsData = ref<BurgsResponse<unknown, unknown>[]>([]);
	const culturesData = ref<CulturesResponse<unknown>[]>([]);
	const religionsData = ref<ReligionsResponse<unknown>[]>([]);

	const fetchTurnsData = async () => {
		if (isCached('turnsData') && turnsData.value.length) {
			readCached('turnsData', turnsData);
			return turnsData.value;
		}

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
		if (isCached('statesData') && statesData.value.length) {
			readCached('statesData', statesData);
			return statesData.value;
		}

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
		if (isCached('provincesData') && provincesData.value.length) {
			readCached('provincesData', provincesData);
			return provincesData.value;
		}

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
		if (isCached('burgsData') && burgsData.value.length) {
			readCached('burgsData', burgsData);
			return burgsData.value;
		}

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
		if (isCached('culturesData') && culturesData.value.length) {
			readCached('culturesData', culturesData);
			return culturesData.value;
		}

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
		if (isCached('religionsData') && religionsData.value.length) {
			readCached('religionsData', religionsData);
			return religionsData.value;
		}

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

	const cacheData = (key: string, data: unknown[]) => {
		const now = new Date().getTime();
		localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
	};

	const isCached = (key: string) => {
		const cachedData = localStorage.getItem(key);
		if (!cachedData) return false;
		const { timestamp } = JSON.parse(cachedData);
		return new Date().getTime() - timestamp < ONE_HOUR;
	};

	const readCached = (key: string, ref: Ref<unknown[]>) => {
		const cachedData = localStorage.getItem(key);
		if (cachedData) {
			const { data } = JSON.parse(cachedData);
			ref.value = data;
		}
	};

	// let turnsSubscription: UnsubscribeFunc;
	// let statesSubscription: UnsubscribeFunc;
	// let provincesSubscription: UnsubscribeFunc;
	// let burgsSubscription: UnsubscribeFunc;
	// let culturesSubscription: UnsubscribeFunc;
	// let religionsSubscription: UnsubscribeFunc;

	// onMounted(async () => {
	// 	turnsSubscription = await pb.collection('turns').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				turnsData.value.push(e.record);
	// 				cacheData('turnsData', turnsData.value);
	// 				break;

	// 			case 'update':
	// 				turnsData.value = turnsData.value.map(turn => {
	// 					if (turn.id === e.record.id) return e.record;
	// 					return turn;
	// 				});
	// 				cacheData('turnsData', turnsData.value);
	// 				break;

	// 			case 'delete':
	// 				turnsData.value = turnsData.value.filter(turn => turn.id !== e.record.id);
	// 				cacheData('turnsData', turnsData.value);
	// 				break;
	// 		}
	// 	});

	// 	statesSubscription = await pb.collection('states').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				statesData.value.push(e.record);
	// 				cacheData('statesData', statesData.value);
	// 				break;

	// 			case 'update':
	// 				statesData.value = statesData.value.map(state => {
	// 					if (state.id === e.record.id) return e.record;
	// 					return state;
	// 				});
	// 				cacheData('statesData', statesData.value);
	// 				break;

	// 			case 'delete':
	// 				statesData.value = statesData.value.filter(state => state.id !== e.record.id);
	// 				cacheData('statesData', statesData.value);
	// 				break;
	// 		}
	// 	});

	// 	provincesSubscription = await pb.collection('provinces').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				provincesData.value.push(e.record);
	// 				cacheData('provincesData', provincesData.value);
	// 				break;

	// 			case 'update':
	// 				provincesData.value = provincesData.value.map(province => {
	// 					if (province.id === e.record.id) return e.record;
	// 					return province;
	// 				});
	// 				cacheData('provincesData', provincesData.value);
	// 				break;

	// 			case 'delete':
	// 				provincesData.value = provincesData.value.filter(province => province.id !== e.record.id);
	// 				cacheData('provincesData', provincesData.value);
	// 				break;
	// 		}
	// 	});

	// 	burgsSubscription = await pb.collection('burgs').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				burgsData.value.push(e.record);
	// 				cacheData('burgsData', burgsData.value);
	// 				break;

	// 			case 'update':
	// 				burgsData.value = burgsData.value.map(burg => {
	// 					if (burg.id === e.record.id) return e.record;
	// 					return burg;
	// 				});
	// 				cacheData('burgsData', burgsData.value);
	// 				break;

	// 			case 'delete':
	// 				burgsData.value = burgsData.value.filter(burg => burg.id !== e.record.id);
	// 				cacheData('burgsData', burgsData.value);
	// 				break;
	// 		}
	// 	});

	// 	culturesSubscription = await pb.collection('cultures').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				culturesData.value.push(e.record);
	// 				cacheData('culturesData', culturesData.value);
	// 				break;

	// 			case 'update':
	// 				culturesData.value = culturesData.value.map(culture => {
	// 					if (culture.id === e.record.id) return e.record;
	// 					return culture;
	// 				});
	// 				cacheData('culturesData', culturesData.value);
	// 				break;

	// 			case 'delete':
	// 				culturesData.value = culturesData.value.filter(culture => culture.id !== e.record.id);
	// 				cacheData('culturesData', culturesData.value);
	// 				break;
	// 		}
	// 	});

	// 	religionsSubscription = await pb.collection('religions').subscribe('*', e => {
	// 		switch (e.action) {
	// 			case 'create':
	// 				religionsData.value.push(e.record);
	// 				cacheData('religionsData', religionsData.value);
	// 				break;

	// 			case 'update':
	// 				religionsData.value = religionsData.value.map(religion => {
	// 					if (religion.id === e.record.id) return e.record;
	// 					return religion;
	// 				});
	// 				cacheData('religionsData', religionsData.value);
	// 				break;

	// 			case 'delete':
	// 				religionsData.value = religionsData.value.filter(religion => religion.id !== e.record.id);
	// 				cacheData('religionsData', religionsData.value);
	// 				break;
	// 		}
	// 	});
	// });

	// onUnmounted(() => {
	// 	turnsSubscription();
	// 	statesSubscription();
	// 	provincesSubscription();
	// 	burgsSubscription();
	// 	culturesSubscription();
	// 	religionsSubscription();
	// });

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
		fetchReligionsData,
		cacheData
	};
});
