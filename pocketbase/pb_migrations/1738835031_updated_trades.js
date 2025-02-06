/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ns08o0a5",
    "name": "isDiscontinued",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ns08o0a5",
    "name": "isContinued",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
