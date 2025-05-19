import type { AzgaarJSONFull, BurgClass, State } from '@/types/azgaarJSONFull';
import type { mapExtractedStates } from '@/types/mapExtractors';

export function extractStatesData(mapData: AzgaarJSONFull): mapExtractedStates[] {
	const { pack, biomesData } = mapData;
	const { states, burgs, cultures, cells, religions } = pack;

	const POPULATION_FACTOR = mapData.settings?.populationRate
		? parseFloat(mapData.settings.populationRate)
		: 1000;

	return states
		.filter((state: State) => !state.removed)
		.map((state: State) => {
			const capitalBurg = burgs.find(
				b => b instanceof Object && b.state === state.i && b.capital === 1
			) as BurgClass | undefined;

			const cultureName =
				state.culture !== undefined && cultures[state.culture] ? cultures[state.culture].name : '';

			const diplomacyObject: Record<string, string> = {};
			if (state.diplomacy && Array.isArray(state.diplomacy)) {
				state.diplomacy.forEach((relation, index) => {
					if (index === state.i || relation === 'x' || !relation) return;

					const otherState = states[index] as State;
					if (otherState?.name && !otherState.removed)
						diplomacyObject[otherState.name] = relation as string;
				});
			}

			const biomesCells: Record<string, number> = {};
			const culturesCells: Record<string, number> = {};
			const religionsCells: Record<string, number> = {};

			cells.forEach(cell => {
				if (cell.state === state.i) {
					const biomeName = biomesData.name[cell.biome];
					if (biomeName) biomesCells[biomeName] = (biomesCells[biomeName] || 0) + 1;

					if (cell.culture !== undefined && cultures[cell.culture]) {
						const cultureName = cultures[cell.culture].name;
						if (cultureName) culturesCells[cultureName] = (culturesCells[cultureName] || 0) + 1;
					}

					if (cell.religion !== undefined && religions[cell.religion]) {
						const religionName = religions[cell.religion].name;
						if (religionName)
							religionsCells[religionName] = (religionsCells[religionName] || 0) + 1;
					}
				}
			});

			Object.keys(biomesCells).forEach(key => {
				if (biomesCells[key] === 0) delete biomesCells[key];
			});

			Object.keys(culturesCells).forEach(key => {
				if (culturesCells[key] === 0) delete culturesCells[key];
			});

			Object.keys(religionsCells).forEach(key => {
				if (religionsCells[key] === 0) delete religionsCells[key];
			});

			return {
				name: state.name || '',
				nameFull: state.fullName || '',
				form: state.formName || '',
				color: state.color || '',
				culture: cultureName,
				capital: capitalBurg?.name || '',
				cells: state.cells || 0,
				burgs: state.burgs || 0,
				provinces: state.provinces?.length || 0,
				ruralPopulation: Math.round((state.rural || 0) * POPULATION_FACTOR),
				urbanPopulation: Math.round((state.urban || 0) * POPULATION_FACTOR),
				relations: diplomacyObject,
				biomesCells,
				culturesCells,
				religionsCells
			};
		});
}
