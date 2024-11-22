export function usePBDataFetch() {
	const {
		fetchTurnsData,
		fetchStatesData,
		fetchProvincesData,
		fetchBurgsData,
		fetchCulturesData,
		fetchReligionsData
	} = cacheFullListResponsesStore();

	const cd = storeToRefs(cacheFullListResponsesStore());

	const fetchAllData = async () => {
		if (!cd.turnsData.value.length) await fetchTurnsData();
		if (!cd.statesData.value.length) await fetchStatesData();
		if (!cd.provincesData.value.length) await fetchProvincesData();
		if (!cd.burgsData.value.length) await fetchBurgsData();
		if (!cd.culturesData.value.length) await fetchCulturesData();
		if (!cd.religionsData.value.length) await fetchReligionsData();
	};

	const fetchDataForTurnEndTab = async () => {
		if (!cd.turnsData.value.length) await fetchTurnsData();
		if (!cd.statesData.value.length) await fetchStatesData();
	};

	return { cd, fetchAllData, fetchDataForTurnEndTab };
}
