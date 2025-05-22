import { namesBases } from '@/data/consts/constNamesBases';
import type { AzgaarJSONFull, Culture } from '@/types/azgaarJSONFull';
import type { mapExtractedCultures } from '@/types/mapExtractors';

export function extractCulturesData(mapData: AzgaarJSONFull): mapExtractedCultures[] {
	const { pack } = mapData;
	const { cultures } = pack;

	const POPULATION_FACTOR = mapData.settings?.populationRate
		? parseFloat(mapData.settings.populationRate)
		: 1000;

	return cultures
		.filter((culture: Culture) => !culture.removed)
		.map((culture: Culture) => {
			return {
				name: culture.name || '',
				color: culture.color || '',
				cells: culture.cells || 0,
				type: culture.type || '',
				ruralPopulation: Math.round(culture.rural * POPULATION_FACTOR) || 0,
				urbanPopulation: Math.round(culture.urban * POPULATION_FACTOR) || 0,
				namesbase: culture.base !== undefined ? namesBases[culture.base] : ''
			};
		});
}
