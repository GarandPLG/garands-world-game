export const constProductsData = new Map<
	string,
	{
		value: number;
		translation: string;
		populationDemand?: number;
		icon: string;
	}
>([
	[
		'Groceries',
		{
			value: 30,
			translation: 'Produkty spożywcze',
			populationDemand: 15835,
			icon: 'game-icons:opened-food-can'
		}
	],
	[
		'Clothes',
		{
			value: 30,
			translation: 'Ubrania',
			populationDemand: 21290,
			icon: 'game-icons:clothes'
		}
	],
	[
		'Furniture',
		{
			value: 30,
			translation: 'Meble',
			populationDemand: 18785,
			icon: 'mdi:table-furniture'
		}
	],
	[
		'Fish',
		{
			value: 20,
			translation: 'Ryby',
			populationDemand: 36055,
			icon: 'tdesign:fish-filled'
		}
	],
	[
		'Fabrics',
		{
			value: 20,
			translation: 'Tkaniny',
			populationDemand: 28240,
			icon: 'file-icons:fabric'
		}
	],
	[
		'Grain',
		{
			value: 20,
			translation: 'Zboże',
			populationDemand: 4715,
			icon: 'game-icons:grain-bundle'
		}
	],
	[
		'Paper',
		{
			value: 30,
			translation: 'Papier',
			populationDemand: 33400,
			icon: 'game-icons:folded-paper'
		}
	],
	[
		'Wood',
		{
			value: 20,
			translation: 'Drewno',
			populationDemand: 35675,
			icon: 'game-icons:wood-beam'
		}
	],
	[
		'Iron',
		{
			value: 40,
			translation: 'Żelazo',
			icon: 'game-icons:metal-bar'
		}
	],
	[
		'Tools',
		{
			value: 40,
			translation: 'Narzędzia',
			icon: 'bi:tools'
		}
	],
	[
		'Dyes',
		{
			value: 40,
			translation: 'Barwniki',
			icon: 'famicons:color-palette'
		}
	],
	[
		'Glass',
		{
			value: 40,
			translation: 'Szkło',
			populationDemand: 46294,
			icon: 'game-icons:window'
		}
	],
	[
		'Silk',
		{
			value: 40,
			translation: 'Jedwab',
			icon: 'game-icons:rolled-cloth'
		}
	],
	[
		'Coffee',
		{
			value: 50,
			translation: 'Kawa',
			populationDemand: 84190,
			icon: 'game-icons:coffee-beans'
		}
	],
	[
		'Fruit',
		{
			value: 50,
			translation: 'Owoc',
			populationDemand: 49095,
			icon: 'game-icons:fruit-bowl'
		}
	],
	[
		'Gold',
		{
			value: 100,
			translation: 'Złoto',
			icon: 'game-icons:gold-bar'
		}
	],
	[
		'Alcohol',
		{
			value: 30,
			translation: 'Alkohol',
			populationDemand: 18270,
			icon: 'maki:alcohol-shop'
		}
	],
	[
		'LuxuryClothes',
		{
			value: 60,
			translation: 'Ubrania luksusowe',
			populationDemand: 25345,
			icon: 'icon-park-outline:clothes-suit'
		}
	],
	[
		'LuxuryFurniture',
		{
			value: 60,
			translation: 'Meble luksusowe',
			populationDemand: 39655,
			icon: 'game-icons:sofa'
		}
	],
	[
		'Meat',
		{
			value: 30,
			translation: 'Mięso',
			populationDemand: 39200,
			icon: 'game-icons:meat'
		}
	],
	[
		'Sugar',
		{
			value: 30,
			translation: 'Cukier',
			populationDemand: 59330,
			icon: 'healthicons:sugar'
		}
	],
	[
		'Tea',
		{
			value: 30,
			translation: 'Herbata',
			populationDemand: 86430,
			icon: 'ph:tea-bag'
		}
	],
	[
		'Weapon',
		{
			value: 60,
			translation: 'Broń',
			icon: 'game-icons:broadsword'
		}
	],
	[
		'RangedWeapon',
		{
			value: 50,
			translation: 'Broń dystansowa',
			icon: 'game-icons:pocket-bow'
		}
	],
	[
		'Armor',
		{
			value: 80,
			translation: 'Zbroja',
			icon: 'game-icons:chest-armor'
		}
	],
	[
		'SiegeEquipment',
		{
			value: 100,
			translation: 'Sprzęt oblężniczy',
			icon: 'game-icons:siege-ram'
		}
	],
	[
		'Ships',
		{
			value: 90,
			translation: 'Statki',
			icon: 'file-icons:shipit'
		}
	]
]);

/*
population_products = [
  'Groceries',
  'Clothes',
  'Furniture',
  'Fish',
  'Fabrics',
  'Grain',
  'Paper',
  'Wood',
  'Glass',
  'Coffee',
  'Fruit',
  'Alcohol',
  'LuxuryClothes',
  'LuxuryFurniture',
  'Meat',
  'Sugar',
  'Tea'
]

army_demand = [
  'Groceries',
  'Clothes',
  'Weapon',
  'RangedWeapon',
  'Armor',
  'SiegeEquipment',
  'Ships'
]

productsTab = [
  "Groceries", "Clothes", "Furniture", "Fish", "Fabrics", "Grain", "Paper", "Wood", "Iron", "Tools", "Dyes", "Glass", "Silk", "Coffee", "Fruit", "Gold", "Alcohol", "LuxuryClothes", "LuxuryFurniture", "Meat", "Sugar", "Tea", "Weapon", "RangedWeapon", "Armor", "SiegeEquipment", "Ships"
];

Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Sugar, Tea, Weapon, RangedWeapon, Armor, SiegeEquipment, Ships
*/
