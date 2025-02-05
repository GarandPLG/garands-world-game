/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlw4tvms",
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

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  // remove
  collection.schema.removeField("wlw4tvms")

  // remove
  collection.schema.removeField("ns08o0a5")

  return dao.saveCollection(collection)
})
