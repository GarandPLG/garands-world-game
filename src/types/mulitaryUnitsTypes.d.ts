import { TradesProductOptions as P } from '@/types/pb-types';

interface MilitaryUnit {
	translation: string;
	icon: string;
	manpower: number;
	recruitmentCost: number;
	maintenanceCost: number;
	unitType: MilitaryUnitType;
	tier: MilitaryUnitTierMap;
	cultureLimit?: string[];
}

interface MilitaryUnitTier {
	techRange: [number, number];
	damage: number;
	armor: number;
	demand: Map<P, number>;
}

type MilitaryUnitTiers = 'I' | 'II' | 'III' | 'IV' | 'V';

type MilitaryUnitTierMap = Map<MilitaryUnitTiers, MilitaryUnitTier>;

type MilitaryUnitType =
	| 'melee'
	| 'ranged'
	| 'mounted'
	| 'machinery'
	| 'naval'
	| 'armored'
	| 'aviation'
	| 'magical';
