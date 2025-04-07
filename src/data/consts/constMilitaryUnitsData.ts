import { TradesProductOptions as P } from '@/types/pb-types';

type UnitType =
	| 'melee'
	| 'ranged'
	| 'mounted'
	| 'machinery'
	| 'naval'
	| 'armored'
	| 'aviation'
	| 'magical';

type TierMap = Map<'I' | 'II' | 'III' | 'IV' | 'V', MilitaryUnitTier>;

interface MilitaryUnit {
	translation: string;
	icon: string;
	manpower: number;
	recruitmentCost: number;
	maintenanceCost: number;
	unitType: UnitType;
	tier: TierMap;
	cultureLimit?: string[];
}

interface MilitaryUnitTier {
	techRange: [number, number];
	power: number;
	demand: Map<P, number>;
}

const createTier = (
	techRange: [number, number],
	power: number,
	demand: Map<P, number>
): MilitaryUnitTier => ({
	techRange,
	power,
	demand: new Map(demand)
});

const createMilitaryUnit = (
	translation: string,
	icon: string,
	manpower: number,
	recruitmentCost: number,
	maintenanceCost: number,
	unitType: UnitType,
	tiers: TierMap,
	cultureLimit?: string[]
): MilitaryUnit => ({
	translation,
	icon,
	manpower,
	recruitmentCost,
	maintenanceCost,
	unitType,
	tier: new Map(tiers),
	cultureLimit
});

export const constMilitaryUnitsData: Map<string, MilitaryUnit> = new Map<string, MilitaryUnit>([
	[
		'infantry',
		createMilitaryUnit(
			'Piechota',
			'healthicons:military-worker-outline',
			1000,
			250,
			50,
			'melee',
			new Map([
				[
					'I',
					createTier(
						[1, 3],
						1,
						new Map([
							[P.Weapon, 1],
							[P.Armor, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[4, 10],
						1.5,
						new Map([
							[P.Weapon, 2],
							[P.Armor, 2],
							[P.Clothes, 1],
							[P.Groceries, 2]
						])
					)
				],
				[
					'III',
					createTier(
						[11, 18],
						2,
						new Map([
							[P.Weapon, 3],
							[P.Armor, 3],
							[P.Clothes, 2],
							[P.Groceries, 2]
						])
					)
				],
				[
					'IV',
					createTier(
						[19, 25],
						2.5,
						new Map([
							[P.Weapon, 4],
							[P.Armor, 4],
							[P.Clothes, 2],
							[P.Groceries, 3]
						])
					)
				]
			])
		)
	],
	[
		'militia',
		createMilitaryUnit(
			'Milicja',
			'game-icons:pitchfork',
			1000,
			50,
			10,
			'melee',
			new Map([
				[
					'I',
					createTier(
						[1, 2],
						0.25,
						new Map([
							[P.Weapon, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[3, 14],
						0.5,
						new Map([
							[P.Weapon, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'III',
					createTier(
						[15, 20],
						0.75,
						new Map([
							[P.Weapon, 2],
							[P.Clothes, 2],
							[P.Groceries, 2]
						])
					)
				],
				[
					'IV',
					createTier(
						[21, 25],
						1,
						new Map([
							[P.Weapon, 3],
							[P.Clothes, 3],
							[P.Groceries, 2]
						])
					)
				]
			])
		)
	],
	[
		'rangers',
		createMilitaryUnit(
			'Dystansowi',
			'game-icons:bowman',
			1000,
			300,
			60,
			'ranged',
			new Map([
				[
					'I',
					createTier(
						[1, 4],
						1.1,
						new Map([
							[P.RangedWeapon, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[5, 13],
						1.65,
						new Map([
							[P.RangedWeapon, 2],
							[P.Clothes, 2],
							[P.Armor, 1],
							[P.Groceries, 2]
						])
					)
				],
				[
					'III',
					createTier(
						[14, 21],
						2.2,
						new Map([
							[P.RangedWeapon, 3],
							[P.Clothes, 2],
							[P.Alcohol, 2],
							[P.Groceries, 2]
						])
					)
				],
				[
					'IV',
					createTier(
						[22, 25],
						2.75,
						new Map([
							[P.RangedWeapon, 4],
							[P.Clothes, 2],
							[P.Armor, 2],
							[P.Groceries, 3]
						])
					)
				]
			])
		)
	],
	[
		'cavalry',
		createMilitaryUnit(
			'Kawaleria',
			'game-icons:cavalry',
			1000,
			550,
			110,
			'mounted',
			new Map([
				[
					'I',
					createTier(
						[1, 8],
						2,
						new Map([
							[P.Weapon, 1],
							[P.Armor, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[9, 13],
						2.5,
						new Map([
							[P.Weapon, 2],
							[P.Armor, 2],
							[P.Clothes, 1],
							[P.Groceries, 2]
						])
					)
				],
				[
					'III',
					createTier(
						[14, 22],
						3,
						new Map([
							[P.Weapon, 3],
							[P.Armor, 3],
							[P.Clothes, 1],
							[P.Groceries, 3]
						])
					)
				],
				[
					'IV',
					createTier(
						[23, 25],
						3.5,
						new Map([
							[P.Weapon, 4],
							[P.Armor, 4],
							[P.Clothes, 2],
							[P.Groceries, 4]
						])
					)
				]
			])
		)
	],
	[
		'siegeCorps',
		createMilitaryUnit(
			'Korpus oblężniczy',
			'game-icons:siege-tower',
			1000,
			1250,
			250,
			'machinery',
			new Map([
				[
					'I',
					createTier(
						[1, 7],
						0.1,
						new Map([
							[P.SiegeEquipment, 6],
							[P.Weapon, 1],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[8, 17],
						0.2,
						new Map([
							[P.SiegeEquipment, 8],
							[P.Weapon, 1],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 2]
						])
					)
				],
				[
					'III',
					createTier(
						[18, 24],
						0.3,
						new Map([
							[P.SiegeEquipment, 11],
							[P.Weapon, 1],
							[P.Clothes, 2],
							[P.Armor, 1],
							[P.Groceries, 3]
						])
					)
				],
				[
					'IV',
					createTier(
						[25, 25],
						0.4,
						new Map([
							[P.SiegeEquipment, 14],
							[P.Weapon, 2],
							[P.Clothes, 2],
							[P.Armor, 2],
							[P.Groceries, 4]
						])
					)
				]
			])
		)
	],
	[
		'mage',
		createMilitaryUnit(
			'Mag',
			'game-icons:wizard-face',
			1,
			1000,
			200,
			'magical',
			new Map([
				[
					'I',
					createTier(
						[1, 6],
						10,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[7, 12],
						15,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 2],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'III',
					createTier(
						[13, 18],
						20,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 3],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'IV',
					createTier(
						[19, 25],
						25,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 4],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 1]
						])
					)
				]
			]),
			['Humanic', 'Orkish']
		)
	],
	[
		'elementalBender',
		createMilitaryUnit(
			'Łamacz żywiołu',
			'game-icons:wizard-staff',
			1,
			1000,
			200,
			'magical',
			new Map([
				[
					'I',
					createTier(
						[1, 7],
						10,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[8, 15],
						15,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 2],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'III',
					createTier(
						[16, 19],
						20,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 3],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'IV',
					createTier(
						[20, 25],
						25,
						new Map([
							[P.Weapon, 1],
							[P.Paper, 4],
							[P.Clothes, 1],
							[P.Armor, 1],
							[P.Groceries, 1]
						])
					)
				]
			]),
			['Elfish']
		)
	],
	[
		'ship',
		createMilitaryUnit(
			'Statek',
			'game-icons:battleship',
			650,
			600,
			30,
			'naval',
			new Map([
				[
					'I',
					createTier(
						[1, 8],
						5,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 2],
							[P.RangedWeapon, 3],
							[P.Clothes, 2],
							[P.Groceries, 2]
						])
					)
				],
				[
					'II',
					createTier(
						[9, 13],
						7.5,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 3],
							[P.RangedWeapon, 4],
							[P.Clothes, 2],
							[P.Groceries, 3]
						])
					)
				],
				[
					'III',
					createTier(
						[14, 20],
						10,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 4],
							[P.RangedWeapon, 5],
							[P.Clothes, 2],
							[P.Groceries, 4]
						])
					)
				],
				[
					'IV',
					createTier(
						[21, 25],
						12.5,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 5],
							[P.RangedWeapon, 6],
							[P.Clothes, 3],
							[P.Groceries, 5]
						])
					)
				]
			])
		)
	],
	[
		'transportShip',
		createMilitaryUnit(
			'Statek transportowy',
			'hugeicons:cargo-ship',
			200,
			200,
			40,
			'naval',
			new Map([
				[
					'I',
					createTier(
						[1, 16],
						0.1,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 1],
							[P.RangedWeapon, 1],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				],
				[
					'II',
					createTier(
						[17, 25],
						0.25,
						new Map([
							[P.Ships, 1],
							[P.Weapon, 2],
							[P.RangedWeapon, 2],
							[P.Clothes, 1],
							[P.Groceries, 1]
						])
					)
				]
			])
		)
	]
]);
