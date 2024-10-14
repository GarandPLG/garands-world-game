/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "68vqkh9rt3btxix",
    "created": "2024-10-11 11:06:12.911Z",
    "updated": "2024-10-11 11:06:12.911Z",
    "name": "cultures",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xe2li7pm",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "l5hfhcht",
        "name": "turn",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "tqupru3zlsud0rn",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "9o24gsgq",
        "name": "color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "^#([0-9a-f]{6})$"
        }
      },
      {
        "system": false,
        "id": "ux5b1ges",
        "name": "cells",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "xnbn4zl8",
        "name": "type",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Generic",
            "River",
            "Lake",
            "Nomadic",
            "Hunting",
            "Highland"
          ]
        }
      },
      {
        "system": false,
        "id": "kd96hrox",
        "name": "population",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "qctjwvi8",
        "name": "namebase",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "German",
            "English",
            "French",
            "Italian",
            "Castillian",
            "Ruthenian",
            "Nordic",
            "Greek",
            "Roman",
            "Finnic",
            "Korean",
            "Chinese",
            "Japanese",
            "Portuguese",
            "Nahuatl",
            "Hungarian",
            "Turkish",
            "Berber",
            "Arabic",
            "Inuit",
            "Basque",
            "Nigerian",
            "Celtic",
            "Mesopotamian",
            "Iranian",
            "Hawaiian",
            "Karnataka",
            "Quechua",
            "Swahili",
            "Vietnamese",
            "Cantonese",
            "Mongolian",
            "Human Generic",
            "Elven",
            "Dark Elven",
            "Dwarven",
            "Goblin",
            "Orc",
            "Giant",
            "Draconic",
            "Arachnid",
            "Serpents",
            "Levantine"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("68vqkh9rt3btxix");

  return dao.deleteCollection(collection);
})
