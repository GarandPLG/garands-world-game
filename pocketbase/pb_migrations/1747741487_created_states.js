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
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2375276105",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "user",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
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
        "id": "text154364554",
        "max": 0,
        "min": 0,
        "name": "nameFull",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select1384709455",
        "maxSelect": 1,
        "name": "form",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Beylik, Despotate, Dominion, Duchy, Emirate, Empire, Horde, Grand Duchy, Heptarchy, Khaganate, Khanate, Kingdom, Marches, Principality, Satrapy, Shogunate, Sultanate, Tsardom, Ulus, Viceroyalty, Chancellery, City-state, Diarchy, Federation, Free City, Most Serene Republic, Oligarchy, Protectorate, Republic, Tetrarchy, Trade Company, Triumvirate, Confederacy, Confederation, Conglomerate, Commonwealth, League, Union, United Hordes, United Kingdom, United Provinces, United Republic, United States, United Tribes, Bishopric, Brotherhood, Caliphate, Diocese, Divine Duchy, Divine Grand Duchy, Divine Principality, Divine Kingdom, Divine Empire, Eparchy, Exarchate, Holy State, Imamah, Patriarchate, Theocracy, Commune, Community, Council, Free Territory, Tribes"
        ]
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
        "cascadeDelete": false,
        "collectionId": "pbc_1814955390",
        "hidden": false,
        "id": "relation3064569067",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "culture",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text813480614",
        "max": 0,
        "min": 0,
        "name": "capital",
        "pattern": "",
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
        "id": "number3455377990",
        "max": null,
        "min": 0,
        "name": "burgs",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number2358692951",
        "max": null,
        "min": 0,
        "name": "provinces",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number1019908875",
        "max": null,
        "min": 0,
        "name": "ruralPopulation",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number778906058",
        "max": null,
        "min": 0,
        "name": "urbanPopulation",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json342671224",
        "maxSize": 2000000,
        "name": "relations",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2162378076",
        "maxSize": 2000000,
        "name": "biomesCells",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json4153620592",
        "maxSize": 2000000,
        "name": "culturesCells",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json25833377",
        "maxSize": 2000000,
        "name": "religionsCells",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
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
    "id": "pbc_114362883",
    "indexes": [],
    "listRule": "",
    "name": "states",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_114362883");

  return app.delete(collection);
})
