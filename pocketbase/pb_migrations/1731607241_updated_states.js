/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nskkup1v",
    "name": "culturesCells",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eidyegzw",
    "name": "religionsCells",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmcmml0l",
    "name": "biomesCells",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // remove
  collection.schema.removeField("nskkup1v")

  // remove
  collection.schema.removeField("eidyegzw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmcmml0l",
    "name": "biomes",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
