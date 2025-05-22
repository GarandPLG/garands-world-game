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
        "cascadeDelete": false,
        "collectionId": "pbc_1814955390",
        "hidden": false,
        "id": "relation3064569067",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "culture",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3142858463",
        "hidden": false,
        "id": "relation274068729",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "religion",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_114362883",
        "hidden": false,
        "id": "relation2744374011",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "state",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3904711375",
        "hidden": false,
        "id": "relation1255855115",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "province",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
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
        "id": "bool3802941632",
        "name": "isPort",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool4069950288",
        "name": "isCitadel",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool3781644274",
        "name": "isPlaza",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool1188306163",
        "name": "isWalls",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool1918850945",
        "name": "isShantyTown",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "bool3639011937",
        "name": "isTemple",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "exceptDomains": [],
        "hidden": false,
        "id": "url2542349304",
        "name": "cityGeneratorLink",
        "onlyDomains": [
          "watabou.github.io"
        ],
        "presentable": false,
        "required": false,
        "system": false,
        "type": "url"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text707894825",
        "max": 0,
        "min": 0,
        "name": "emblemSVG",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
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
    "id": "pbc_112352429",
    "indexes": [],
    "listRule": "",
    "name": "burgs",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_112352429");

  return app.delete(collection);
})
