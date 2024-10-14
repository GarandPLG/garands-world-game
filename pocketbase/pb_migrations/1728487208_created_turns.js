/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tqupru3zlsud0rn",
    "created": "2024-10-09 15:20:08.290Z",
    "updated": "2024-10-09 15:20:08.290Z",
    "name": "turns",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fuwd3eph",
        "name": "value",
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
        "id": "dzyxtw9s",
        "name": "map",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 15728640,
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("tqupru3zlsud0rn");

  return dao.deleteCollection(collection);
})
