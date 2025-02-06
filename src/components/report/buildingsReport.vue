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
  'Luxuryclothes',
  'Luxuryfurniture',
  'Meat',
  'Porcelain',
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
  "Groceries", "Clothes", "Furniture", "Fish", "Fabrics", "Grain", "Paper", "Wood", "Iron", "Tools", "Dyes", "Glass", "Silk", "Coffee", "Fruit", "Gold", "Alcohol", "LuxuryClothes", "LuxuryFurniture", "Meat", "Porcelain", "Sugar", "Tea", "Weapon", "RangedWeapon", "Armor", "Ships"
];

Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Porcelain, Sugar, Tea, Weapon, RangedWeapon, Armor, Ships

products = products = {
  Groceries: { value: 30, translation: "Produkty spożywcze" },
  Clothes: { value: 30, translation: "Ubrania" },
  Furniture: { value: 30, translation: "Meble" },
  Fish: { value: 20, translation: "Ryby" },
  Fabrics: { value: 20, translation: "Tkaniny" },
  Grain: { value: 20, translation: "Zboże" },
  Paper: { value: 30, translation: "Papier" },
  Wood: { value: 20, translation: "Drewno" },
  Iron: { value: 40, translation: "Żelazo" },
  Tools: { value: 40, translation: "Narzędzia" },
  Dyes: { value: 40, translation: "Barwniki" },
  Glass: { value: 40, translation: "Szkło" },
  Silk: { value: 40, translation: "Jedwab" },
  Coffee: { value: 50, translation: "Kawa" },
  Fruit: { value: 50, translation: "Owoc" },
  Gold: { value: 100, translation: "Złoto" },
  Alcohol: { value: 30, translation: "Alkohol" },
  LuxuryClothes: { value: 60, translation: "Ubrania luksusowe" },
  LuxuryFurniture: { value: 60, translation: "Meble luksusowe" },
  Meat: { value: 30, translation: "Mięso" },
  Porcelain: { value: 70, translation: "Porcelana" },
  Sugar: { value: 30, translation: "Cukier" },
  Tea: { value: 30, translation: "Herbata" },
  Weapon: { value: 60, translation: "Broń" },
  RangedWeapon: { value: 50, translation: "Broń dystansowa" },
  Armor: { value: 80, translation: "Zbroja" },
  Ships: { value: 90, translation: "Statki" }
};
-->
