/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // remove
  collection.schema.removeField("tt4uuiqm")

  // remove
  collection.schema.removeField("mgpd61eo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f77mlvsr",
    "name": "capital",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tt4uuiqm",
    "name": "religion",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ept3i4ql3iw9kjj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgpd61eo",
    "name": "capital",
    "type": "relation",
    "required": true,
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

  // remove
  collection.schema.removeField("f77mlvsr")

  return dao.saveCollection(collection)
})
