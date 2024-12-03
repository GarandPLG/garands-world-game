/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  // remove
  collection.schema.removeField("socl2p2g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ytkxf3t",
    "name": "emblemSVG",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "socl2p2g",
    "name": "emblem",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("5ytkxf3t")

  return dao.saveCollection(collection)
})
