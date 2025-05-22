/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\"",
    "deleteRule": null,
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1716930793",
        "max": 0,
        "min": 0,
        "name": "color",
        "pattern": "^#([0-9a-f]{6})$",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number1438763992",
        "max": null,
        "min": 0,
        "name": "cells",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "select2363381545",
        "maxSelect": 1,
        "name": "type",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Generic, River, Lake, Naval, Nomadic, Hunting, Highland"
        ]
      },
      {
        "hidden": false,
        "id": "number3024723976",
        "max": null,
        "min": 0,
        "name": "population",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "select2201216531",
        "maxSelect": 1,
        "name": "namesbase",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "German, English, French, Italian, Castillian, Ruthenian, Nordic, Greek, Roman, Finnic, Korean, Chinese, Japanese, Portuguese, Nahuatl, Hungarian, Turkish, Berber, Arabic, Inuit, Basque, Nigerian, Celtic, Mesopotamian, Iranian, Hawaiian, Karnataka, Quechua, Swahili, Vietnamese, Cantonese, Mongolian, Human Generic, Elven, Dark Elven, Dwarven, Goblin, Orc, Giant, Draconic, Arachnid, Serpents, Levantine"
        ]
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
    "id": "pbc_1814955390",
    "indexes": [],
    "listRule": "",
    "name": "cultures",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1814955390");

  return app.delete(collection);
})
