import type { Building, BuildingTiers } from '@/types/buildingsTypes';
import type { ComputedRef, Ref } from 'vue';

export default function (technologieLevel: Ref<number>): ComputedRef<Map<string, Building>> {
	return computed(() => {
		const result = new Map<string, Building>();

		constBuildingsData.forEach((building, key) => {
			const filteredBuilding: Building = {
				translation: building.translation,
				icon: building.icon,
				tier: new Map<BuildingTiers, any>()
			};

			building.tier.forEach((tierValue, tierKey) => {
				const [min, max] = tierValue.techRange;
				if (technologieLevel.value >= min && technologieLevel.value <= max)
					filteredBuilding.tier.set(tierKey, tierValue);
			});

			if (filteredBuilding.tier.size > 0) result.set(key, filteredBuilding);
		});

		return result;
	});
}
