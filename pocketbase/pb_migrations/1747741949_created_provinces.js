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
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select1384709455",
        "maxSelect": 1,
        "name": "form",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "Area, Autonomy, Barony, Canton, Captaincy, Chiefdom, Clan, Colony, Council, County, Deanery, Department, Dependency, Diaconate, District, Earldom, Governorate, Island, Islands, Land, Landgrave, Mandate, Margrave, Municipality, Occupation zone, Parish, Prefecture, Province, Region, Republic, Reservation, Seneschalty, Shire, State, Territory, Tribe"
        ]
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1716930793",
        "max": 0,
        "min": 0,
        "name": "color",
        "pattern": "^#([0-9a-f]{6})$",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
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
    "id": "pbc_3904711375",
    "indexes": [],
    "listRule": "",
    "name": "provinces",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3904711375");

  return app.delete(collection);
})
