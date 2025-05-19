import type { AzgaarJSONFull, Religion } from '@/types/azgaarJSONFull';
import type { mapExtractedReligions } from '@/types/mapExtractors';

export function extractReligionsData(mapData: AzgaarJSONFull): mapExtractedReligions[] {
	const { pack } = mapData;
	const { religions } = pack;

	const POPULATION_FACTOR = mapData.settings?.populationRate
		? parseFloat(mapData.settings.populationRate)
		: 1000;

	return religions
		.filter((religion: Religion) => !religion.removed)
		.map((religion: Religion) => {
			return {
				name: religion.name || '',
				type: religion.type || '',
				form: religion.form || '',
				supremeDeity: religion.deity || '',
				color: religion.color || '',
				cells: religion.cells || 0,
				ruralPopulation: Math.round((religion.rural || 0) * POPULATION_FACTOR),
				urbanPopulation: Math.round((religion.urban || 0) * POPULATION_FACTOR)
			};
		});
}
