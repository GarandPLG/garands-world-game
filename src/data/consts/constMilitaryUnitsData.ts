interface MilitaryUnit {
	manpower: number;
	recruitmentCost: number;
	maintenanceCost: number;
	translation: string;
	cultureLimit: string[];
	tier: Map<'I' | 'II' | 'III' | 'IV' | 'V', MilitaryUnitTier>;
}

interface MilitaryUnitTier {
	techRange: [number, number];
	demand: Map<string, number>;
}

export const constMilitaryUnitsData: Map<string, MilitaryUnit> = new Map<string, MilitaryUnit>([
	// TODO: Piechota, Milicja, Dystansowi, Kawaleria, Sprzęt oblężniczy, Magowie, Statki, Statki transportowe
]);
