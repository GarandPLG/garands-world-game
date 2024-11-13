/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgq9qsqo",
    "name": "province",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gzjx76q8fu9nqby",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgq9qsqo",
    "name": "province",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gzjx76q8fu9nqby",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
