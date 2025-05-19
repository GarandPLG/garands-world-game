import type { AzgaarJSONFull } from '@/types/azgaarJSONFull';

export function useExtractMapData(mapData: AzgaarJSONFull) {
	if (!mapData.pack || !mapData.pack.states)
		throw new Error('Invalid map data - missing states information');

	const statesData = extractStatesData(mapData);
	const culturesData = extractCulturesData(mapData);
	const religionsData = extractReligionsData(mapData);
	const burgsData = extractBurgsData(mapData);
	const provincesData = extractProvincesData(mapData);

	return { statesData, culturesData, religionsData, burgsData, provincesData };
}
