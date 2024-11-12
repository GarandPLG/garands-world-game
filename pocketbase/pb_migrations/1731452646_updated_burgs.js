/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nz5lm2y6",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  // remove
  collection.schema.removeField("nz5lm2y6")

  return dao.saveCollection(collection)
})
