import type { AzgaarJSONFull, BurgClass } from '@/types/azgaarJSONFull';
import type { mapExtractedBurgs } from '@/types/mapExtractors';

export function extractBurgsData(mapData: AzgaarJSONFull): mapExtractedBurgs[] {
	const { pack } = mapData;
	const { burgs, cultures, states, provinces, religions, cells } = pack;

	const POPULATION_FACTOR = mapData.settings?.populationRate
		? parseFloat(mapData.settings.populationRate)
		: 1000;

	return Object.values(burgs)
		.filter((burg): burg is BurgClass => burg instanceof Object && !burg.removed)
		.map((burg: BurgClass) => {
			const cultureName = cultures[burg.culture]?.name || '';

			const state = burg.state && states[burg.state] ? states[burg.state] : null;
			const stateName = state && 'name' in state ? state.name || '' : '';

			const province = Array.isArray(provinces)
				? provinces.find(
						p =>
							p &&
							typeof p === 'object' &&
							'state' in p &&
							p.state === burg.state &&
							p.burgs &&
							p.burgs.includes(burg.i)
					)
				: null;
			const provinceName =
				province && typeof province === 'object' && 'name' in province ? province.name || '' : '';

			const religionId = cells && cells[burg.cell]?.religion;
			const religionName =
				typeof religionId === 'number' && religions[religionId] ? religions[religionId].name : '';

			return {
				name: burg.name || '',
				culture: cultureName,
				religion: religionName,
				state: stateName,
				province: provinceName,
				population: Math.round(burg.population * POPULATION_FACTOR),
				isPort: !!burg.port,
				isCitadel: !!burg.citadel,
				isPlaza: !!burg.plaza,
				isWalls: !!burg.walls,
				isShantyTown: !!burg.shanty,
				isTemple: !!burg.temple
			};
		});
}
