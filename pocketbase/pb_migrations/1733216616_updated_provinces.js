/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbdbiexa",
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
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // remove
  collection.schema.removeField("vbdbiexa")

  return dao.saveCollection(collection)
})
