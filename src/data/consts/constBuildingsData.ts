import { TradesProductOptions as P } from '@/types/pb-types';

type Tiers = 'I' | 'II' | 'III' | 'IV' | 'V';

interface Building {
	translation: string;
	icon: string;
	tier: Map<Tiers, BuildingTier>;
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

const createTier = (
	techRange: [number, number],
	maintenanceCost: number,
	buildCost: number,
	employees: number,
	production: [P, number][],
	demand: [P, number][]
): BuildingTier => ({
	techRange,
	maintenanceCost,
	buildCost,
	destructionCost: buildCost / 2,
	employees,
	production: new Map(production),
	demand: new Map(demand)
});

const createBuilding = (
	translation: string,
	icon: string,
	tiers: [Tiers, BuildingTier][]
): Building => ({
	translation,
	icon,
	tier: new Map(tiers)
});

export const constBuildingsData: Map<string, Building> = new Map<string, Building>([
	[
		'sawmill',
		createBuilding('Tartak', 'game-icons:sawmill', [
			['I', createTier([1, 1], 40, 250, 5875, [[P.Wood, 30]], [[P.Tools, 2]])],
			['II', createTier([2, 11], 80, 500, 9200, [[P.Wood, 60]], [[P.Tools, 4]])],
			['III', createTier([12, 25], 120, 750, 12550, [[P.Wood, 80]], [[P.Tools, 6]])]
		])
	],
	[
		'ironMine',
		createBuilding('Kopalnia żelaza', 'game-icons:miner', [
			['I', createTier([1, 1], 95, 250, 5875, [[P.Iron, 30]], [[P.Tools, 2]])],
			['II', createTier([2, 21], 130, 500, 9200, [[P.Iron, 60]], [[P.Tools, 4]])],
			['III', createTier([22, 25], 165, 750, 12550, [[P.Iron, 80]], [[P.Tools, 6]])]
		])
	],
	[
		'goldMine',
		createBuilding('Kopalnia złota', 'game-icons:gold-mine', [
			['I', createTier([1, 5], 155, 250, 5875, [[P.Gold, 20]], [[P.Tools, 2]])],
			['II', createTier([6, 6], 235, 500, 9200, [[P.Gold, 30]], [[P.Tools, 4]])],
			['III', createTier([17, 25], 365, 750, 12550, [[P.Gold, 50]], [[P.Tools, 5]])]
		])
	],
	[
		'groceryPlant',
		createBuilding('Zakład spozywczy', 'material-symbols-light:grocery-sharp', [
			[
				'I',
				createTier(
					[1, 6],
					35,
					250,
					5875,
					[[P.Groceries, 30]],
					[
						[P.Tools, 2],
						[P.Grain, 6],
						[P.Meat, 4],
						[P.Fish, 4]
					]
				)
			],
			[
				'II',
				createTier(
					[7, 11],
					50,
					500,
					9200,
					[[P.Groceries, 50]],
					[
						[P.Tools, 4],
						[P.Grain, 12],
						[P.Sugar, 5],
						[P.Meat, 8],
						[P.Fish, 8],
						[P.Iron, 3]
					]
				)
			],
			[
				'III',
				createTier(
					[11, 25],
					75,
					1000,
					12550,
					[[P.Groceries, 75]],
					[
						[P.Tools, 6],
						[P.Grain, 18],
						[P.Sugar, 10],
						[P.Meat, 12],
						[P.Fish, 12],
						[P.Iron, 6]
					]
				)
			]
		])
	],
	[
		'distillery',
		createBuilding('Destylarnia', 'file-icons:homebrew', [
			[
				'I',
				createTier(
					[1, 4],
					30,
					250,
					5875,
					[[P.Alcohol, 35]],
					[
						[P.Tools, 2],
						[P.Grain, 5],
						[P.Sugar, 5],
						[P.Glass, 5],
						[P.Wood, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[5, 14],
					50,
					500,
					9200,
					[[P.Alcohol, 45]],
					[
						[P.Tools, 3],
						[P.Grain, 10],
						[P.Sugar, 7],
						[P.Glass, 6],
						[P.Wood, 6]
					]
				)
			],
			[
				'III',
				createTier(
					[15, 25],
					70,
					750,
					12550,
					[[P.Alcohol, 60]],
					[
						[P.Tools, 4],
						[P.Grain, 15],
						[P.Sugar, 9],
						[P.Glass, 7],
						[P.Wood, 7]
					]
				)
			]
		])
	],
	[
		'textileMill',
		createBuilding('Zakład włókienniczy', 'game-icons:clothes', [
			[
				'I',
				createTier(
					[1, 2],
					20,
					250,
					5875,
					[
						[P.Clothes, 20],
						[P.LuxuryClothes, 10]
					],
					[
						[P.Fabrics, 20],
						[P.Silk, 5],
						[P.Dyes, 5],
						[P.Tools, 2]
					]
				)
			],
			[
				'II',
				createTier(
					[3, 19],
					100,
					500,
					9200,
					[
						[P.Clothes, 40],
						[P.LuxuryClothes, 20]
					],
					[
						[P.Fabrics, 30],
						[P.Silk, 10],
						[P.Dyes, 5],
						[P.Tools, 4]
					]
				)
			],
			[
				'III',
				createTier(
					[20, 25],
					180,
					750,
					12550,
					[
						[P.Clothes, 60],
						[P.LuxuryClothes, 30]
					],
					[
						[P.Fabrics, 35],
						[P.Silk, 15],
						[P.Dyes, 10],
						[P.Tools, 6]
					]
				)
			]
		])
	],
	[
		'furnitureMill',
		createBuilding('Zakład meblarski', 'mdi:table-chair', [
			[
				'I',
				createTier(
					[1, 9],
					60,
					250,
					5875,
					[
						[P.Furniture, 30],
						[P.LuxuryFurniture, 10]
					],
					[
						[P.Tools, 2],
						[P.Wood, 10],
						[P.Silk, 5],
						[P.Dyes, 5],
						[P.Fabrics, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[10, 17],
					95,
					500,
					9200,
					[
						[P.Furniture, 45],
						[P.LuxuryFurniture, 20]
					],
					[
						[P.Tools, 4],
						[P.Wood, 20],
						[P.Silk, 10],
						[P.Dyes, 10],
						[P.Fabrics, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[18, 25],
					140,
					750,
					12550,
					[
						[P.Furniture, 60],
						[P.LuxuryFurniture, 30]
					],
					[
						[P.Tools, 6],
						[P.Wood, 25],
						[P.Silk, 15],
						[P.Dyes, 15],
						[P.Fabrics, 15]
					]
				)
			]
		])
	],
	[
		'glassWorks',
		createBuilding('Huta szkła', 'game-icons:window', [
			[
				'I',
				createTier(
					[1, 2],
					55,
					250,
					5875,
					[[P.Glass, 30]],
					[
						[P.Tools, 2],
						[P.Wood, 5],
						[P.Dyes, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[3, 15],
					105,
					500,
					9200,
					[[P.Glass, 45]],
					[
						[P.Tools, 4],
						[P.Wood, 10],
						[P.Dyes, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[16, 25],
					170,
					750,
					12550,
					[[P.Glass, 60]],
					[
						[P.Tools, 6],
						[P.Wood, 15],
						[P.Dyes, 15]
					]
				)
			]
		])
	],
	[
		'toolsMill',
		createBuilding('Narzędziownia', 'tdesign:tools', [
			[
				'I',
				createTier(
					[1, 10],
					50,
					250,
					5875,
					[[P.Tools, 30]],
					[
						[P.Wood, 15],
						[P.Iron, 10]
					]
				)
			],
			[
				'II',
				createTier(
					[11, 15],
					100,
					500,
					9200,
					[[P.Tools, 50]],
					[
						[P.Wood, 25],
						[P.Iron, 20]
					]
				)
			],
			[
				'III',
				createTier(
					[16, 25],
					170,
					750,
					12550,
					[[P.Tools, 70]],
					[
						[P.Wood, 35],
						[P.Iron, 30]
					]
				)
			]
		])
	],
	[
		'paperMill',
		createBuilding('Zakład papierniczy', 'tabler:file-filled', [
			[
				'I',
				createTier(
					[1, 6],
					25,
					250,
					5875,
					[[P.Paper, 35]],
					[
						[P.Tools, 2],
						[P.Wood, 25]
					]
				)
			],
			[
				'II',
				createTier(
					[7, 24],
					55,
					500,
					9200,
					[[P.Paper, 70]],
					[
						[P.Tools, 4],
						[P.Wood, 50]
					]
				)
			],
			[
				'III',
				createTier(
					[25, 25],
					90,
					750,
					12550,
					[[P.Paper, 105]],
					[
						[P.Tools, 6],
						[P.Wood, 75]
					]
				)
			]
		])
	],
	[
		'shipyard',
		createBuilding('Stocznia', 'streamline:sail-ship', [
			[
				'I',
				createTier(
					[1, 8],
					100,
					250,
					5875,
					[[P.Ships, 35]],
					[
						[P.Tools, 2],
						[P.Wood, 30],
						[P.Iron, 5],
						[P.Fabrics, 15]
					]
				)
			],
			[
				'II',
				createTier(
					[9, 13],
					140,
					500,
					9200,
					[[P.Ships, 50]],
					[
						[P.Tools, 4],
						[P.Wood, 40],
						[P.Iron, 10],
						[P.Fabrics, 20]
					]
				)
			],
			[
				'III',
				createTier(
					[14, 25],
					150,
					750,
					12550,
					[[P.Ships, 65]],
					[
						[P.Tools, 6],
						[P.Wood, 50],
						[P.Iron, 15],
						[P.Fabrics, 25]
					]
				)
			]
		])
	],
	[
		'armsPlant',
		createBuilding('Zakład zbrojeniowy', 'game-icons:spiked-mace', [
			[
				'I',
				createTier(
					[1, 7],
					60,
					250,
					5875,
					[[P.Weapon, 25]],
					[
						[P.Tools, 2],
						[P.Wood, 5],
						[P.Iron, 10]
					]
				)
			],
			[
				'II',
				createTier(
					[8, 18],
					145,
					500,
					9200,
					[[P.Weapon, 50]],
					[
						[P.Tools, 4],
						[P.Wood, 10],
						[P.Iron, 20]
					]
				)
			],
			[
				'III',
				createTier(
					[19, 25],
					230,
					750,
					12550,
					[[P.Weapon, 75]],
					[
						[P.Tools, 6],
						[P.Wood, 15],
						[P.Iron, 30]
					]
				)
			]
		])
	],
	[
		'archeryWorkshop',
		createBuilding('Warsztat łuczniczy', 'mdi:bow-arrow', [
			[
				'I',
				createTier(
					[1, 12],
					60,
					250,
					5875,
					[[P.RangedWeapon, 35]],
					[
						[P.Tools, 2],
						[P.Wood, 10],
						[P.Iron, 5],
						[P.Fabrics, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[13, 23],
					140,
					500,
					9200,
					[[P.RangedWeapon, 70]],
					[
						[P.Tools, 4],
						[P.Wood, 20],
						[P.Iron, 10],
						[P.Fabrics, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[24, 25],
					170,
					750,
					12550,
					[[P.RangedWeapon, 105]],
					[
						[P.Tools, 6],
						[P.Wood, 25],
						[P.Iron, 15],
						[P.Fabrics, 15]
					]
				)
			]
		])
	],
	[
		'armorerWorkshop',
		createBuilding('Warsztat płatnerza', 'game-icons:heart-armor', [
			[
				'I',
				createTier(
					[1, 8],
					60,
					250,
					5875,
					[[P.Armor, 20]],
					[
						[P.Tools, 2],
						[P.Iron, 10],
						[P.Fabrics, 5],
						[P.Dyes, 3]
					]
				)
			],
			[
				'II',
				createTier(
					[9, 19],
					140,
					500,
					9200,
					[[P.Armor, 40]],
					[
						[P.Tools, 4],
						[P.Iron, 20],
						[P.Fabrics, 10],
						[P.Dyes, 6]
					]
				)
			],
			[
				'III',
				createTier(
					[20, 25],
					170,
					750,
					12550,
					[[P.Armor, 60]],
					[
						[P.Tools, 6],
						[P.Iron, 30],
						[P.Fabrics, 15],
						[P.Dyes, 9]
					]
				)
			]
		])
	],
	// TODO: Warsztat sprzętu oblężniczego  game-icons:siege-tower
	[
		'farm',
		createBuilding('Farma', 'lucide-lab:farm', [
			[
				'I',
				createTier(
					[1, 5],
					15,
					250,
					6125,
					[[P.Grain, 40]],
					[
						[P.Tools, 2],
						[P.Wood, 10],
						[P.Iron, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[6, 10],
					30,
					500,
					9550,
					[[P.Grain, 80]],
					[
						[P.Tools, 4],
						[P.Wood, 20],
						[P.Iron, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[11, 15],
					45,
					750,
					13000,
					[[P.Grain, 120]],
					[
						[P.Tools, 6],
						[P.Wood, 30],
						[P.Iron, 15]
					]
				)
			]
		])
	],
	[
		'ranch',
		createBuilding('Ranczo', 'game-icons:ranch-gate', [
			[
				'I',
				createTier(
					[1, 8],
					45,
					250,
					6125,
					[
						[P.Meat, 20],
						[P.Fabrics, 15]
					],
					[
						[P.Tools, 2],
						[P.Grain, 8],
						[P.Iron, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[9, 19],
					90,
					500,
					9550,
					[
						[P.Meat, 40],
						[P.Fabrics, 30]
					],
					[
						[P.Tools, 4],
						[P.Grain, 16],
						[P.Iron, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[20, 25],
					120,
					750,
					13000,
					[
						[P.Meat, 60],
						[P.Fabrics, 45]
					],
					[
						[P.Tools, 6],
						[P.Grain, 24],
						[P.Iron, 15]
					]
				)
			]
		])
	],
	[
		'fishingPier',
		createBuilding('Molo rybackie', 'map:fishing-pier', [
			[
				'I',
				createTier(
					[1, 7],
					40,
					250,
					5875,
					[[P.Fish, 45]],
					[
						[P.Tools, 2],
						[P.Wood, 5],
						[P.Ships, 5]
					]
				)
			],
			[
				'II',
				createTier(
					[8, 16],
					60,
					500,
					9200,
					[[P.Fish, 70]],
					[
						[P.Tools, 4],
						[P.Wood, 10],
						[P.Ships, 10]
					]
				)
			],
			[
				'III',
				createTier(
					[17, 25],
					80,
					750,
					12550,
					[[P.Fish, 95]],
					[
						[P.Tools, 6],
						[P.Wood, 15],
						[P.Ships, 15]
					]
				)
			]
		])
	],
	[
		'coffeePlantation',
		createBuilding('Plantacja kawy', 'hugeicons:coffee-beans', [
			['I', createTier([1, 11], 110, 250, 6125, [[P.Coffee, 30]], [[P.Tools, 9]])],
			['II', createTier([12, 25], 225, 500, 13000, [[P.Coffee, 60]], [[P.Tools, 18]])]
		])
	],
	[
		'cottonPlantation',
		createBuilding('Plantacja bawełny', 'game-icons:cotton-flower', [
			['I', createTier([1, 13], 50, 250, 6125, [[P.Fabrics, 45]], [[P.Tools, 9]])],
			['II', createTier([14, 25], 100, 500, 13000, [[P.Fabrics, 90]], [[P.Tools, 18]])]
		])
	],
	[
		'dyePlantation',
		createBuilding('Plantacja barwników', 'game-icons:dye-plant', [
			['I', createTier([1, 19], 80, 250, 6125, [[P.Dyes, 30]], [[P.Tools, 9]])],
			['II', createTier([20, 25], 165, 500, 13000, [[P.Dyes, 60]], [[P.Tools, 18]])]
		])
	],
	[
		'teaPlantation',
		createBuilding('Plantacja herbaty', 'game-icons:teapot-leaves', [
			['I', createTier([1, 24], 50, 250, 6125, [[P.Tea, 30]], [[P.Tools, 9]])],
			['II', createTier([25, 25], 105, 500, 13000, [[P.Tea, 60]], [[P.Tools, 18]])]
		])
	],
	[
		'sugarPlantation',
		createBuilding('Plantacja cukru', 'game-icons:sugar-cane', [
			['I', createTier([1, 14], 50, 250, 6125, [[P.Sugar, 30]], [[P.Tools, 9]])],
			['II', createTier([15, 25], 105, 500, 13000, [[P.Sugar, 60]], [[P.Tools, 18]])]
		])
	],
	[
		'fruitPlantation',
		createBuilding('Plantacja owoców', 'healthicons:fruits-outline', [
			['I', createTier([1, 21], 60, 250, 6125, [[P.Fruit, 20]], [[P.Tools, 9]])],
			['II', createTier([22, 25], 125, 500, 13000, [[P.Fruit, 40]], [[P.Tools, 18]])]
		])
	],
	[
		'silkPlantation',
		createBuilding('Plantacja jedwabiu', 'healthicons:plantation-worker-alt', [
			['I', createTier([1, 17], 40, 250, 6125, [[P.Silk, 20]], [[P.Tools, 9]])],
			['II', createTier([18, 25], 85, 500, 13000, [[P.Silk, 40]], [[P.Tools, 18]])]
		])
	]
]);
