/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("68vqkh9rt3btxix")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xnbn4zl8",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Generic",
        "River",
        "Lake",
        "Naval",
        "Nomadic",
        "Hunting",
        "Highland"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("68vqkh9rt3btxix")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xnbn4zl8",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Generic",
        "River",
        "Lake",
        "Nomadic",
        "Hunting",
        "Highland"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
