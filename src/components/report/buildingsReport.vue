<script lang="ts" setup>
// TODO: Budynki
const { state, turn } = storeToRefs(useReportStore());
</script>

<template>
	<div> </div>
</template>

<!-- 
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
  'LuxuryClothes': 25345,
  'LuxuryFurniture': 39655,
  'Meat': 39200,
  'Sugar': 59330,
  'Tea': 86430,
  'Tobacco': 45910,
  'Wine': 31535
}

productsTab = [
  "Groceries", "Clothes", "Furniture", "Fish", "Fabrics", "Grain", "Paper", "Wood", "Iron", "Tools", "Dyes", "Glass", "Silk", "Coffee", "Fruit", "Gold", "Alcohol", "LuxuryClothes", "LuxuryFurniture", "Meat", "Sugar", "Tea", "Weapon", "RangedWeapon", "Armor", "Ships"
];

Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Sugar, Tea, Weapon, RangedWeapon, Armor, Ships
-->
