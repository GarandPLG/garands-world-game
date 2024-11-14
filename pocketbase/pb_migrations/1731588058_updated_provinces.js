/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kofkmqdq",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // remove
  collection.schema.removeField("kofkmqdq")

  return dao.saveCollection(collection)
})
