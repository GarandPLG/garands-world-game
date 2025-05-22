/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2293394539")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select3544843437",
    "maxSelect": 1,
    "name": "product",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Groceries",
      "Clothes",
      "Furniture",
      "Fish",
      "Fabrics",
      "Grain",
      "Paper",
      "Wood",
      "Iron",
      "Tools",
      "Dyes",
      "Glass",
      "Silk",
      "Coffee",
      "Fruit",
      "Gold",
      "Alcohol",
      "LuxuryClothes",
      "LuxuryFurniture",
      "Meat",
      "Sugar",
      "Tea",
      "Weapon",
      "RangedWeapon",
      "Armor",
      "SiegeEquipment",
      "Ships"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2293394539")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select3544843437",
    "maxSelect": 1,
    "name": "product",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Groceries, Clothes, Furniture, Fish, Fabrics, Grain, Paper, Wood, Iron, Tools, Dyes, Glass, Silk, Coffee, Fruit, Gold, Alcohol, LuxuryClothes, LuxuryFurniture, Meat, Sugar, Tea, Weapon, RangedWeapon, Armor, SiegeEquipment, Ships"
    ]
  }))

  return app.save(collection)
})
