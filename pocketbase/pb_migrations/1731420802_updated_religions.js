/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ept3i4ql3iw9kjj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujngej93",
    "name": "color",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^#([0-9a-f]{6})$"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iq875hia",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Organized",
        "Heresy",
        "Cult",
        "Folk"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gg7v6qxo",
    "name": "form",
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
  const collection = dao.findCollectionByNameOrId("ept3i4ql3iw9kjj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujngej93",
    "name": "color",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^#([0-9a-f]{6})$"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iq875hia",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Organized",
        "Heresy",
        "Cult",
        "Folk"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gg7v6qxo",
    "name": "form",
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
})
