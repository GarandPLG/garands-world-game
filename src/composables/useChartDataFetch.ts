export async function useChartDataFetch(group: globalThis.ComputedRef<any>) {
	const {
		fetchStatesData,
		fetchProvincesData,
		fetchBurgsData,
		fetchCulturesData,
		fetchReligionsData
	} = cacheFullListResponsesStore();

	const cd = storeToRefs(cacheFullListResponsesStore());

	const chartDataFetch = async () => {
		switch (group.value) {
			case 'states':
				if (!cd.statesData.value.length) await fetchStatesData();
				break;
			case 'provinces':
				if (!cd.provincesData.value.length) await fetchProvincesData();
				break;
			case 'burgs':
				if (!cd.burgsData.value.length) await fetchBurgsData();
				break;
			case 'cultures':
				if (!cd.culturesData.value.length) await fetchCulturesData();
				break;
			case 'religions':
				if (!cd.religionsData.value.length) await fetchReligionsData();
				break;
			case 'misc':
				if (!cd.burgsData.value.length) await fetchBurgsData();
				break;
		}
	};

	return { chartDataFetch };
}
