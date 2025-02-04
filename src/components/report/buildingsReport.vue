<script lang="ts" setup>
// TODO: Budynki
const { state, turn } = storeToRefs(useReportStore());
</script>

<template>
	<div> </div>
</template>

<!-- 
population_products = [
  'Furniture',
  'Fish',
  'Fabrics',
  'Grain',
  'Paper',
  'Wood',
  'Coal',
  'Glass',
  'Coffee',
  'Fruit',
  'Alcohol',
  'Luxuryclothes',
  'Luxuryfurniture',
  'Meat',
  'Porcelain',
  'Sugar',
  'Tea',
  'Tobacco',
  'Wine'
]

army_demand = [
  'Groceries',
  'Clothes',
  'Weapon',
  'Artillery',
  'Ammunition',
  'Ships'
]

base_population_demand = {
  'Groceries': 15835,
  'Clothes': 21290,
  'Furniture': 18785,
  'Fish': 36055,
  'Fabrics': 28240,
  'Grain': 4715,
  'Paper': 33400,
  'Wood': 35675,
  'Coal': 418395,
  'Glass': 46294,
  'Coffee': 84190,
  'Fruit': 49095,
  'Alcohol': 18270,
  'Luxuryclothes': 25345,
  'Luxuryfurniture': 39655,
  'Meat': 39200,
  'Porcelain': 31485,
  'Sugar': 59330,
  'Tea': 86430,
  'Tobacco': 45910,
  'Wine': 31535
}

productsTab = [
	Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Coal, Tools, Dyes, Explosives, Fertilizer, Glass, Hardwood, Lead, Silk, Steel, Sulfur, Coffee, Fruit, Gold, Alcohol, Luxuryclothes, Luxuryfurniture, Meat, Porcelain, Sugar, Tea, Tobacco, Wine, Weapon, Artillery, Ammunition, Ships
]

products = {
	'Groceries': [30, "Produkty spożywcze"],
	'Clothes': [30, "Ubrania"],
	'Furniture': [30, "Meble"],
	'Fish': [20, "Ryby"],
	'Fabrics': [20, "Tkaniny"],
	'Grain': [20, "Zboże"],
	'Paper': [30, "Papier"],
  'Wood': [20, "Drewno"],
  'Iron': [40, "Żelazo"],
  'Coal': [30, "Węgiel"],
  'Tools': [40, "Narzędzia"],
  'Dyes': [40, "Barwniki"],
  'Explosives': [50, "Materiały wybuchowe"],
  'Fertilizer': [30, "Nawóz"],
  'Glass': [40, "Szkło"],
  'Hardwood': [40, "Twarde drewno"],
  'Lead': [40, "Ołów"],
  'Silk': [40, "Jedwab"],
  'Steel': [50, "Stal"],
  'Sulfur': [50, "Siarka"],
  'Coffee': [50, "Kawa"],
  'Fruit': [50, "Owoc"],
  'Gold': [100, "Złoto"],
  'Alcohol': [30, "Alkohol"],
  'Luxuryclothes': [60, "Ubrania luksusowe"],
  'Luxuryfurniture': [60, "Meble luksusowe"],
  'Meat': [30, "Mięso"],
  'Porcelain': [70, "Porcelana"],
  'Sugar': [30, "Cukier"],
  'Tea': [30, "Herbata"],
  'Tobacco': [40, "Tytoń"],
  'Wine': [50, "Wino"],
  'Weapon': [60, "Broń"],
  'Artillery': [70, "Artyleria"],
  'Ammunition': [50, "Amunicja"],
  'Ships': [60, "Statki"]
}
-->
