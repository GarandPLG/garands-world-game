/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2jwa2822v7o0nle",
    "created": "2024-10-14 09:04:23.454Z",
    "updated": "2024-10-14 09:04:23.454Z",
    "name": "reportInputs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xgvnswhm",
        "name": "sdad",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("2jwa2822v7o0nle");

  return dao.deleteCollection(collection);
})
