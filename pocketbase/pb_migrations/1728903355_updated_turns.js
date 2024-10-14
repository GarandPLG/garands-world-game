/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tqupru3zlsud0rn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fuwd3eph",
    "name": "value",
    "type": "number",
    "required": false,
    "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("tqupru3zlsud0rn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fuwd3eph",
    "name": "value",
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
})
