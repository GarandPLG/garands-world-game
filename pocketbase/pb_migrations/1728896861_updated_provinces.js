/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // remove
  collection.schema.removeField("cv8gk3u6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i9nbkkcw",
    "name": "capital",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qeo77u83ue36ptc",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cv8gk3u6",
    "name": "capital_relation",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("i9nbkkcw")

  return dao.saveCollection(collection)
})
