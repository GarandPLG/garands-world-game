import type { AzgaarJSONFull, BurgClass, ProvinceClass } from '@/types/azgaarJSONFull';
import type { mapExtractedProvinces } from '@/types/mapExtractors';

export function extractProvincesData(mapData: AzgaarJSONFull): mapExtractedProvinces[] {
	const { pack } = mapData;
	const { provinces, states, burgs, cells } = pack;

	const POPULATION_FACTOR = mapData.settings?.populationRate
		? parseFloat(mapData.settings.populationRate)
		: 1000;

	return provinces
		.filter((province, index) => index > 0 && province instanceof Object)
		.map(province => {
			const typedProvince = province as ProvinceClass;

			const stateName =
				typedProvince.state && states[typedProvince.state] && 'name' in states[typedProvince.state]
					? states[typedProvince.state].name || ''
					: '';

			const capitalBurg =
				typedProvince.burg &&
				typeof burgs[typedProvince.burg] === 'object' &&
				burgs[typedProvince.burg] !== null
					? (burgs[typedProvince.burg] as BurgClass)
					: null;
			const capitalName = capitalBurg && 'name' in capitalBurg ? capitalBurg.name : '';

			const cellsCount = cells.filter(cell => cell.province === typedProvince.i).length;

			return {
				name: typedProvince.name || '',
				nameFull: typedProvince.fullName || '',
				form: typedProvince.formName || '',
				state: stateName,
				color: typedProvince.color || '',
				capital: capitalName,
				burgs: typedProvince.burgs ? typedProvince.burgs.length : 0,
				cells: cellsCount,
				ruralPopulation: Math.round((typedProvince.rural || 0) * POPULATION_FACTOR),
				urbanPopulation: Math.round((typedProvince.urban || 0) * POPULATION_FACTOR)
			};
		});
}
