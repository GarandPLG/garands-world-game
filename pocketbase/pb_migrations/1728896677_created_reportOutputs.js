/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "skw21075jvkkmt4",
    "created": "2024-10-14 09:04:37.518Z",
    "updated": "2024-10-14 09:04:37.518Z",
    "name": "reportOutputs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mtphccgh",
        "name": "sadasds",
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
  const collection = dao.findCollectionByNameOrId("skw21075jvkkmt4");

  return dao.deleteCollection(collection);
})
