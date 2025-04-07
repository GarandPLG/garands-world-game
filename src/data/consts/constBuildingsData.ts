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
	production: Map<P, number>,
	demand: Map<P, number>
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
	tiers: Map<Tiers, BuildingTier>
): Building => ({
	translation,
	icon,
	tier: new Map(tiers)
});

export const constBuildingsData: Map<string, Building> = new Map<string, Building>([
	[
		'sawmill',
		createBuilding(
			'Tartak',
			'game-icons:sawmill',
			new Map([
				['I', createTier([1, 1], 40, 250, 5875, new Map([[P.Wood, 30]]), new Map([[P.Tools, 2]]))],
				[
					'II',
					createTier([2, 11], 80, 500, 9200, new Map([[P.Wood, 60]]), new Map([[P.Tools, 4]]))
				],
				[
					'III',
					createTier([12, 25], 120, 750, 12550, new Map([[P.Wood, 80]]), new Map([[P.Tools, 6]]))
				]
			])
		)
	],
	[
		'ironMine',
		createBuilding(
			'Kopalnia żelaza',
			'game-icons:miner',
			new Map([
				['I', createTier([1, 1], 95, 250, 5875, new Map([[P.Iron, 30]]), new Map([[P.Tools, 2]]))],
				[
					'II',
					createTier([2, 21], 130, 500, 9200, new Map([[P.Iron, 60]]), new Map([[P.Tools, 4]]))
				],
				[
					'III',
					createTier([22, 25], 165, 750, 12550, new Map([[P.Iron, 80]]), new Map([[P.Tools, 6]]))
				]
			])
		)
	],
	[
		'goldMine',
		createBuilding(
			'Kopalnia złota',
			'game-icons:gold-mine',
			new Map([
				['I', createTier([1, 5], 155, 250, 5875, new Map([[P.Gold, 20]]), new Map([[P.Tools, 2]]))],
				[
					'II',
					createTier([6, 6], 235, 500, 9200, new Map([[P.Gold, 30]]), new Map([[P.Tools, 4]]))
				],
				[
					'III',
					createTier([17, 25], 365, 750, 12550, new Map([[P.Gold, 50]]), new Map([[P.Tools, 5]]))
				]
			])
		)
	],
	[
		'groceryPlant',
		createBuilding(
			'Zakład spozywczy',
			'material-symbols-light:grocery-sharp',
			new Map([
				[
					'I',
					createTier(
						[1, 6],
						35,
						250,
						5875,
						new Map([[P.Groceries, 20]]),
						new Map([
							[P.Tools, 2],
							[P.Grain, 6],
							[P.Meat, 4],
							[P.Fish, 4]
						])
					)
				],
				[
					'II',
					createTier(
						[7, 11],
						50,
						500,
						9200,
						new Map([[P.Groceries, 30]]),
						new Map([
							[P.Tools, 4],
							[P.Grain, 12],
							[P.Sugar, 5],
							[P.Meat, 8],
							[P.Fish, 8],
							[P.Iron, 3]
						])
					)
				],
				[
					'III',
					createTier(
						[11, 25],
						75,
						1000,
						12550,
						new Map([[P.Groceries, 50]]),
						new Map([
							[P.Tools, 6],
							[P.Grain, 18],
							[P.Sugar, 10],
							[P.Meat, 12],
							[P.Fish, 12],
							[P.Iron, 6]
						])
					)
				]
			])
		)
	],
	[
		'distillery',
		createBuilding(
			'Destylarnia',
			'file-icons:homebrew',
			new Map([
				[
					'I',
					createTier(
						[1, 4],
						30,
						250,
						5875,
						new Map([[P.Alcohol, 35]]),
						new Map([
							[P.Tools, 2],
							[P.Grain, 5],
							[P.Sugar, 5],
							[P.Glass, 5],
							[P.Wood, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[5, 14],
						50,
						500,
						9200,
						new Map([[P.Alcohol, 45]]),
						new Map([
							[P.Tools, 3],
							[P.Grain, 10],
							[P.Sugar, 7],
							[P.Glass, 6],
							[P.Wood, 6]
						])
					)
				],
				[
					'III',
					createTier(
						[15, 25],
						70,
						750,
						12550,
						new Map([[P.Alcohol, 60]]),
						new Map([
							[P.Tools, 4],
							[P.Grain, 15],
							[P.Sugar, 9],
							[P.Glass, 7],
							[P.Wood, 7]
						])
					)
				]
			])
		)
	],
	[
		'textileMill',
		createBuilding(
			'Zakład włókienniczy',
			'game-icons:clothes',
			new Map([
				[
					'I',
					createTier(
						[1, 2],
						20,
						250,
						5875,
						new Map([
							[P.Clothes, 20],
							[P.LuxuryClothes, 10]
						]),
						new Map([
							[P.Fabrics, 20],
							[P.Silk, 5],
							[P.Dyes, 5],
							[P.Tools, 2]
						])
					)
				],
				[
					'II',
					createTier(
						[3, 19],
						100,
						500,
						9200,
						new Map([
							[P.Clothes, 40],
							[P.LuxuryClothes, 20]
						]),
						new Map([
							[P.Fabrics, 30],
							[P.Silk, 10],
							[P.Dyes, 5],
							[P.Tools, 4]
						])
					)
				],
				[
					'III',
					createTier(
						[20, 25],
						180,
						750,
						12550,
						new Map([
							[P.Clothes, 60],
							[P.LuxuryClothes, 30]
						]),
						new Map([
							[P.Fabrics, 35],
							[P.Silk, 15],
							[P.Dyes, 10],
							[P.Tools, 6]
						])
					)
				]
			])
		)
	],
	[
		'furnitureMill',
		createBuilding(
			'Zakład meblarski',
			'mdi:table-chair',
			new Map([
				[
					'I',
					createTier(
						[1, 9],
						60,
						250,
						5875,
						new Map([
							[P.Furniture, 30],
							[P.LuxuryFurniture, 10]
						]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 10],
							[P.Silk, 5],
							[P.Dyes, 5],
							[P.Fabrics, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[10, 17],
						95,
						500,
						9200,
						new Map([
							[P.Furniture, 45],
							[P.LuxuryFurniture, 20]
						]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 20],
							[P.Silk, 10],
							[P.Dyes, 10],
							[P.Fabrics, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[18, 25],
						140,
						750,
						12550,
						new Map([
							[P.Furniture, 60],
							[P.LuxuryFurniture, 30]
						]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 25],
							[P.Silk, 15],
							[P.Dyes, 15],
							[P.Fabrics, 15]
						])
					)
				]
			])
		)
	],
	[
		'glassWorks',
		createBuilding(
			'Huta szkła',
			'game-icons:window',
			new Map([
				[
					'I',
					createTier(
						[1, 2],
						55,
						250,
						5875,
						new Map([[P.Glass, 30]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 5],
							[P.Dyes, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[3, 15],
						105,
						500,
						9200,
						new Map([[P.Glass, 45]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 10],
							[P.Dyes, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[16, 25],
						170,
						750,
						12550,
						new Map([[P.Glass, 60]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 15],
							[P.Dyes, 15]
						])
					)
				]
			])
		)
	],
	[
		'toolsMill',
		createBuilding(
			'Narzędziownia',
			'tdesign:tools',
			new Map([
				[
					'I',
					createTier(
						[1, 10],
						50,
						250,
						5875,
						new Map([[P.Tools, 30]]),
						new Map([
							[P.Wood, 15],
							[P.Iron, 10]
						])
					)
				],
				[
					'II',
					createTier(
						[11, 15],
						100,
						500,
						9200,
						new Map([[P.Tools, 50]]),
						new Map([
							[P.Wood, 25],
							[P.Iron, 20]
						])
					)
				],
				[
					'III',
					createTier(
						[16, 25],
						170,
						750,
						12550,
						new Map([[P.Tools, 70]]),
						new Map([
							[P.Wood, 35],
							[P.Iron, 30]
						])
					)
				]
			])
		)
	],
	[
		'paperMill',
		createBuilding(
			'Zakład papierniczy',
			'tabler:file-filled',
			new Map([
				[
					'I',
					createTier(
						[1, 6],
						25,
						250,
						5875,
						new Map([[P.Paper, 35]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 25]
						])
					)
				],
				[
					'II',
					createTier(
						[7, 24],
						55,
						500,
						9200,
						new Map([[P.Paper, 70]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 50]
						])
					)
				],
				[
					'III',
					createTier(
						[25, 25],
						90,
						750,
						12550,
						new Map([[P.Paper, 105]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 75]
						])
					)
				]
			])
		)
	],
	[
		'shipyard',
		createBuilding(
			'Stocznia',
			'streamline:sail-ship',
			new Map([
				[
					'I',
					createTier(
						[1, 8],
						100,
						250,
						5875,
						new Map([[P.Ships, 35]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 30],
							[P.Iron, 5],
							[P.Fabrics, 15]
						])
					)
				],
				[
					'II',
					createTier(
						[9, 13],
						140,
						500,
						9200,
						new Map([[P.Ships, 50]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 40],
							[P.Iron, 10],
							[P.Fabrics, 20]
						])
					)
				],
				[
					'III',
					createTier(
						[14, 25],
						150,
						750,
						12550,
						new Map([[P.Ships, 65]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 50],
							[P.Iron, 15],
							[P.Fabrics, 25]
						])
					)
				]
			])
		)
	],
	[
		'armsPlant',
		createBuilding(
			'Zakład zbrojeniowy',
			'game-icons:spiked-mace',
			new Map([
				[
					'I',
					createTier(
						[1, 7],
						60,
						250,
						5875,
						new Map([[P.Weapon, 25]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 5],
							[P.Iron, 10]
						])
					)
				],
				[
					'II',
					createTier(
						[8, 18],
						145,
						500,
						9200,
						new Map([[P.Weapon, 50]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 10],
							[P.Iron, 20]
						])
					)
				],
				[
					'III',
					createTier(
						[19, 25],
						230,
						750,
						12550,
						new Map([[P.Weapon, 75]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 15],
							[P.Iron, 30]
						])
					)
				]
			])
		)
	],
	[
		'archeryWorkshop',
		createBuilding(
			'Warsztat łuczniczy',
			'mdi:bow-arrow',
			new Map([
				[
					'I',
					createTier(
						[1, 12],
						60,
						250,
						5875,
						new Map([[P.RangedWeapon, 35]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 10],
							[P.Iron, 5],
							[P.Fabrics, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[13, 23],
						140,
						500,
						9200,
						new Map([[P.RangedWeapon, 70]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 20],
							[P.Iron, 10],
							[P.Fabrics, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[24, 25],
						170,
						750,
						12550,
						new Map([[P.RangedWeapon, 105]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 25],
							[P.Iron, 15],
							[P.Fabrics, 15]
						])
					)
				]
			])
		)
	],
	[
		'armorerWorkshop',
		createBuilding(
			'Warsztat płatnerza',
			'game-icons:heart-armor',
			new Map([
				[
					'I',
					createTier(
						[1, 8],
						60,
						250,
						5875,
						new Map([[P.Armor, 20]]),
						new Map([
							[P.Tools, 2],
							[P.Iron, 10],
							[P.Fabrics, 5],
							[P.Dyes, 3]
						])
					)
				],
				[
					'II',
					createTier(
						[9, 19],
						140,
						500,
						9200,
						new Map([[P.Armor, 40]]),
						new Map([
							[P.Tools, 4],
							[P.Iron, 20],
							[P.Fabrics, 10],
							[P.Dyes, 6]
						])
					)
				],
				[
					'III',
					createTier(
						[20, 25],
						170,
						750,
						12550,
						new Map([[P.Armor, 60]]),
						new Map([
							[P.Tools, 6],
							[P.Iron, 30],
							[P.Fabrics, 15],
							[P.Dyes, 9]
						])
					)
				]
			])
		)
	],
	[
		'siegeWorkshop',
		createBuilding(
			'Warsztat oblężniczy',
			'game-icons:siege-tower',
			new Map([
				[
					'I',
					createTier(
						[1, 5],
						60,
						250,
						5875,
						new Map([[P.SiegeEquipment, 10]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 10],
							[P.Iron, 10],
							[P.Fabrics, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[6, 15],
						100,
						500,
						9200,
						new Map([[P.SiegeEquipment, 20]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 20],
							[P.Iron, 20],
							[P.Fabrics, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[16, 25],
						170,
						750,
						12550,
						new Map([[P.SiegeEquipment, 30]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 30],
							[P.Iron, 30],
							[P.Fabrics, 15]
						])
					)
				]
			])
		)
	],
	[
		'farm',
		createBuilding(
			'Farma',
			'lucide-lab:farm',
			new Map([
				[
					'I',
					createTier(
						[1, 5],
						15,
						250,
						6125,
						new Map([[P.Grain, 40]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 10],
							[P.Iron, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[6, 10],
						30,
						500,
						9550,
						new Map([[P.Grain, 80]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 20],
							[P.Iron, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[11, 15],
						45,
						750,
						13000,
						new Map([[P.Grain, 120]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 30],
							[P.Iron, 15]
						])
					)
				]
			])
		)
	],
	[
		'ranch',
		createBuilding(
			'Ranczo',
			'game-icons:ranch-gate',
			new Map([
				[
					'I',
					createTier(
						[1, 8],
						45,
						250,
						6125,
						new Map([
							[P.Meat, 20],
							[P.Fabrics, 15]
						]),
						new Map([
							[P.Tools, 2],
							[P.Grain, 8],
							[P.Iron, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[9, 19],
						90,
						500,
						9550,
						new Map([
							[P.Meat, 40],
							[P.Fabrics, 30]
						]),
						new Map([
							[P.Tools, 4],
							[P.Grain, 16],
							[P.Iron, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[20, 25],
						120,
						750,
						13000,
						new Map([
							[P.Meat, 60],
							[P.Fabrics, 45]
						]),
						new Map([
							[P.Tools, 6],
							[P.Grain, 24],
							[P.Iron, 15]
						])
					)
				]
			])
		)
	],
	[
		'fishingPier',
		createBuilding(
			'Molo rybackie',
			'map:fishing-pier',
			new Map([
				[
					'I',
					createTier(
						[1, 7],
						40,
						250,
						5875,
						new Map([[P.Fish, 45]]),
						new Map([
							[P.Tools, 2],
							[P.Wood, 5],
							[P.Ships, 5]
						])
					)
				],
				[
					'II',
					createTier(
						[8, 16],
						60,
						500,
						9200,
						new Map([[P.Fish, 70]]),
						new Map([
							[P.Tools, 4],
							[P.Wood, 10],
							[P.Ships, 10]
						])
					)
				],
				[
					'III',
					createTier(
						[17, 25],
						80,
						750,
						12550,
						new Map([[P.Fish, 95]]),
						new Map([
							[P.Tools, 6],
							[P.Wood, 15],
							[P.Ships, 15]
						])
					)
				]
			])
		)
	],
	[
		'coffeePlantation',
		createBuilding(
			'Plantacja kawy',
			'hugeicons:coffee-beans',
			new Map([
				[
					'I',
					createTier([1, 11], 110, 250, 6125, new Map([[P.Coffee, 30]]), new Map([[P.Tools, 9]]))
				],
				[
					'II',
					createTier([12, 25], 225, 500, 13000, new Map([[P.Coffee, 60]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	],
	[
		'cottonPlantation',
		createBuilding(
			'Plantacja bawełny',
			'game-icons:cotton-flower',
			new Map([
				[
					'I',
					createTier([1, 13], 50, 250, 6125, new Map([[P.Fabrics, 45]]), new Map([[P.Tools, 9]]))
				],
				[
					'II',
					createTier(
						[14, 25],
						100,
						500,
						13000,
						new Map([[P.Fabrics, 90]]),
						new Map([[P.Tools, 18]])
					)
				]
			])
		)
	],
	[
		'dyePlantation',
		createBuilding(
			'Plantacja barwników',
			'game-icons:dye-plant',
			new Map([
				['I', createTier([1, 19], 80, 250, 6125, new Map([[P.Dyes, 30]]), new Map([[P.Tools, 9]]))],
				[
					'II',
					createTier([20, 25], 165, 500, 13000, new Map([[P.Dyes, 60]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	],
	[
		'teaPlantation',
		createBuilding(
			'Plantacja herbaty',
			'game-icons:teapot-leaves',
			new Map([
				['I', createTier([1, 24], 50, 250, 6125, new Map([[P.Tea, 30]]), new Map([[P.Tools, 9]]))],
				[
					'II',
					createTier([25, 25], 105, 500, 13000, new Map([[P.Tea, 60]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	],
	[
		'sugarPlantation',
		createBuilding(
			'Plantacja cukru',
			'game-icons:sugar-cane',
			new Map([
				[
					'I',
					createTier([1, 14], 50, 250, 6125, new Map([[P.Sugar, 30]]), new Map([[P.Tools, 9]]))
				],
				[
					'II',
					createTier([15, 25], 105, 500, 13000, new Map([[P.Sugar, 60]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	],
	[
		'fruitPlantation',
		createBuilding(
			'Plantacja owoców',
			'healthicons:fruits-outline',
			new Map([
				[
					'I',
					createTier([1, 21], 60, 250, 6125, new Map([[P.Fruit, 20]]), new Map([[P.Tools, 9]]))
				],
				[
					'II',
					createTier([22, 25], 125, 500, 13000, new Map([[P.Fruit, 40]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	],
	[
		'silkPlantation',
		createBuilding(
			'Plantacja jedwabiu',
			'healthicons:plantation-worker-alt',
			new Map([
				['I', createTier([1, 17], 40, 250, 6125, new Map([[P.Silk, 20]]), new Map([[P.Tools, 9]]))],
				[
					'II',
					createTier([18, 25], 85, 500, 13000, new Map([[P.Silk, 40]]), new Map([[P.Tools, 18]]))
				]
			])
		)
	]
]);
