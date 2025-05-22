import type { AzgaarJSONFull } from '@/types/azgaarJSONFull';

export function useExtractMapData(mapData: AzgaarJSONFull) {
	if (!mapData.pack || !mapData.pack.states)
		throw new Error('Invalid map data - missing states information');

	const extStatesData = extractStatesData(mapData);
	const extCulturesData = extractCulturesData(mapData);
	const extReligionsData = extractReligionsData(mapData);
	const extBurgsData = extractBurgsData(mapData);
	const extProvincesData = extractProvincesData(mapData);

	return { extStatesData, extCulturesData, extReligionsData, extBurgsData, extProvincesData };
}
