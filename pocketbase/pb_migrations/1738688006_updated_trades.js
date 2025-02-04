/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kuruagub",
    "name": "product",
    "type": "select",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
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
        "Coal",
        "Tools",
        "Dyes",
        "Explosives",
        "Fertilizer",
        "Glass",
        "Hardwood",
        "Lead",
        "Silk",
        "Steel",
        "Sulfur",
        "Coffee",
        "Fruit",
        "Gold",
        "Alcohol",
        "Luxuryclothes",
        "Luxuryfurniture",
        "Meat",
        "Porcelain",
        "Sugar",
        "Tea",
        "Tobacco",
        "Wine",
        "Weapon",
        "Artillery",
        "Ammunition",
        "Ships"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kuruagub",
    "name": "product",
    "type": "select",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Wood"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
