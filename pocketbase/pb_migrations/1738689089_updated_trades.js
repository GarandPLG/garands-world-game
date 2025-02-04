/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbftu4px",
    "name": "price",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // remove
  collection.schema.removeField("vbftu4px")

  return dao.saveCollection(collection)
})
