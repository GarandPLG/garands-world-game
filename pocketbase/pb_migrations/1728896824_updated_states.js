/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // remove
  collection.schema.removeField("sduyeq6w")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sduyeq6w",
    "name": "capital_relation",
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

  // remove
  collection.schema.removeField("mgpd61eo")

  return dao.saveCollection(collection)
})
