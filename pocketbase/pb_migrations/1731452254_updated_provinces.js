/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ru8v3b71",
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
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // remove
  collection.schema.removeField("ru8v3b71")

  return dao.saveCollection(collection)
})
