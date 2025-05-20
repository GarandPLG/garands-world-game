/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\"",
    "deleteRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_953189830",
        "hidden": false,
        "id": "relation538973511",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "turn",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_114362883",
        "hidden": false,
        "id": "relation3529204580",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "importState",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_114362883",
        "hidden": false,
        "id": "relation432454415",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "exportState",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "number3113930206",
        "max": null,
        "min": 1,
        "name": "volume",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3402113753",
        "max": null,
        "min": 1,
        "name": "price",
        "onlyInt": true,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "bool2569498944",
        "name": "isDiscontinued",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_2293394539",
    "indexes": [],
    "listRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id || @request.auth.id = exportState.user.id",
    "name": "trades",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\"",
    "viewRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id || @request.auth.id = exportState.user.id"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2293394539");

  return app.delete(collection);
})
