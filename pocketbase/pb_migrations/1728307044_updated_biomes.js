/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3r3zyqiq5orbj1v")

  // remove
  collection.schema.removeField("epzfx3cn")

  // remove
  collection.schema.removeField("rlbrjxrr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7fgdlhvp",
    "name": "Cold_desert",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nw7o9edk",
    "name": "Glacier",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gz17qush",
    "name": "Grassland",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "afb860j9",
    "name": "Hot_desert",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "um6wh4qy",
    "name": "Savanna",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rataw3r6",
    "name": "Taiga",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edfk4bzi",
    "name": "Temperate_deciduous_forest",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yxpdr5yx",
    "name": "Temperate_rainforest",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p31ti2fe",
    "name": "Tropical_rainforest",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m3jmcjsb",
    "name": "Tropical_seasonal_forest",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edpxuqe3",
    "name": "Tundra",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fakphe3p",
    "name": "Wetland",
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
  const collection = dao.findCollectionByNameOrId("3r3zyqiq5orbj1v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "epzfx3cn",
    "name": "group",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Cold desert",
        "Glacier",
        "Grassland",
        "Hot desert",
        "Savanna",
        "Taiga",
        "Temperate deciduous forest",
        "Temperate rainforest",
        "Tropical rainforest",
        "Tropical seasonal forest",
        "Tundra",
        "Wetland"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlbrjxrr",
    "name": "value",
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

  // remove
  collection.schema.removeField("7fgdlhvp")

  // remove
  collection.schema.removeField("nw7o9edk")

  // remove
  collection.schema.removeField("gz17qush")

  // remove
  collection.schema.removeField("afb860j9")

  // remove
  collection.schema.removeField("um6wh4qy")

  // remove
  collection.schema.removeField("rataw3r6")

  // remove
  collection.schema.removeField("edfk4bzi")

  // remove
  collection.schema.removeField("yxpdr5yx")

  // remove
  collection.schema.removeField("p31ti2fe")

  // remove
  collection.schema.removeField("m3jmcjsb")

  // remove
  collection.schema.removeField("edpxuqe3")

  // remove
  collection.schema.removeField("fakphe3p")

  return dao.saveCollection(collection)
})
