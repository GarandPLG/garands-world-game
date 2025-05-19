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
			const totalPopulation = Math.round(
				((culture.rural || 0) + (culture.urban || 0)) * POPULATION_FACTOR
			);

			return {
				name: culture.name || '',
				color: culture.color || '',
				cells: culture.cells || 0,
				type: culture.type || '',
				population: totalPopulation,
				namesbase: culture.base !== undefined ? namesBases[culture.base] : ''
			};
		});
}
