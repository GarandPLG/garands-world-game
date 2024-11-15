const ONE_HOUR = 60 * 60 * 1000; // 1 godzina w milisekundach
// TODO: Napisać unit testy dla cacheFullListResponses
export const cacheFullListResponses = defineStore('cacheFullListResponses', () => {
	const pb = usePocketBase();

	const turnsData = ref(null);
	const statesData = ref(null);
	const provincesData = ref(null);
	const burgsData = ref(null);
	const culturesData = ref(null);
	const religionsData = ref(null);

	const fetchTurnsData = async () => {
		if (turnsData.value && isCached('turnsData')) return turnsData.value;
		const data = await pb.collection('turns').getFullList();
		turnsData.value = data;
		cacheData('turnsData', data);
		return data;
	};

	const fetchStatesData = async () => {
		if (statesData.value && isCached('statesData')) return statesData.value;
		const data = await pb.collection('states').getFullList();
		statesData.value = data;
		cacheData('statesData', data);
		return data;
	};

	const fetchProvincesData = async () => {
		if (provincesData.value && isCached('provincesData')) return provincesData.value;
		const data = await pb.collection('provinces').getFullList();
		provincesData.value = data;
		cacheData('provincesData', data);
		return data;
	};

	const fetchBurgsData = async () => {
		if (burgsData.value && isCached('burgsData')) return burgsData.value;
		const data = await pb.collection('burgs').getFullList();
		burgsData.value = data;
		cacheData('burgsData', data);
		return data;
	};

	const fetchCulturesData = async () => {
		if (culturesData.value && isCached('culturesData')) return culturesData.value;
		const data = await pb.collection('cultures').getFullList();
		culturesData.value = data;
		cacheData('culturesData', data);
		return data;
	};

	const fetchReligionsData = async () => {
		if (religionsData.value && isCached('religionsData')) return religionsData.value;
		const data = await pb.collection('religions').getFullList();
		religionsData.value = data;
		cacheData('religionsData', data);
		return data;
	};
	const cacheData = (key, data) => {
		const now = new Date().getTime();
		localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
	};

	const isCached = key => {
		const cachedData = localStorage.getItem(key);
		if (!cachedData) return false;
		const { timestamp } = JSON.parse(cachedData);
		return new Date().getTime() - timestamp < ONE_HOUR;
	};

	return {
		// turnsData,
		// statesData,
		// provincesData,
		// burgsData,
		// culturesData,
		// religionsData,
		fetchTurnsData,
		fetchStatesData,
		fetchProvincesData,
		fetchBurgsData,
		fetchCulturesData,
		fetchReligionsData
	};
});
