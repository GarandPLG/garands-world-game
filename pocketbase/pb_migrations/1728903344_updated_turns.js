/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tqupru3zlsud0rn")

  // remove
  collection.schema.removeField("dzyxtw9s")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tqupru3zlsud0rn")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
