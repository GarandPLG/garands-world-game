import { TradesProductOptions as P } from '@/types/pb-types';

interface Building {
	translation: string;
	icon: string;
	tier: Map<BuildingTiers, BuildingTier>;
}

interface BuildingTier {
	techRange: [number, number];
	maintenanceCost: number;
	buildCost: number;
	destructionCost: number;
	employees: number;
	production: Map<P, number>;
	demand: Map<P, number>;
}

type BuildingTiers = 'I' | 'II' | 'III' | 'IV' | 'V';
