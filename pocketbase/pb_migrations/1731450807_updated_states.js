/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkwblrkk",
    "name": "nameFull",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r4kfclaj",
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
    "id": "ldwpvzak",
    "name": "culture",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "68vqkh9rt3btxix",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f77mlvsr",
    "name": "capital",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0n1qvsni",
    "name": "form",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Beylik",
        "Despotate",
        "Dominion",
        "Duchy",
        "Emirate",
        "Empire",
        "Horde",
        "Grand Duchy",
        "Heptarchy",
        "Khaganate",
        "Khanate",
        "Kingdom",
        "Marches",
        "Principality",
        "Satrapy",
        "Shogunate",
        "Sultanate",
        "Tsardom",
        "Ulus",
        "Viceroyalty",
        "Chancellery",
        "City-state",
        "Diarchy",
        "Federation",
        "Free City",
        "Most Serene Republic",
        "Oligarchy",
        "Protectorate",
        "Republic",
        "Tetrarchy",
        "Trade Company",
        "Triumvirate",
        "Confederacy",
        "Confederation",
        "Conglomerate",
        "Commonwealth",
        "League",
        "Union",
        "United Hordes",
        "United Kingdom",
        "United Provinces",
        "United Republic",
        "United States",
        "United Tribes",
        "Bishopric",
        "Brotherhood",
        "Caliphate",
        "Diocese",
        "Divine Duchy",
        "Divine Grand Duchy",
        "Divine Principality",
        "Divine Kingdom",
        "Divine Empire",
        "Eparchy",
        "Exarchate",
        "Holy State",
        "Imamah",
        "Patriarchate",
        "Theocracy",
        "Commune",
        "Community",
        "Council",
        "Free Territory",
        "Tribes"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkwblrkk",
    "name": "nameFull",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r4kfclaj",
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
    "id": "ldwpvzak",
    "name": "culture",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "68vqkh9rt3btxix",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmcmml0l",
    "name": "biomes",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f77mlvsr",
    "name": "capital",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0n1qvsni",
    "name": "form",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Beylik",
        "Despotate",
        "Dominion",
        "Duchy",
        "Emirate",
        "Empire",
        "Horde",
        "Grand Duchy",
        "Heptarchy",
        "Khaganate",
        "Khanate",
        "Kingdom",
        "Marches",
        "Principality",
        "Satrapy",
        "Shogunate",
        "Sultanate",
        "Tsardom",
        "Ulus",
        "Viceroyalty",
        "Chancellery",
        "City-state",
        "Diarchy",
        "Federation",
        "Free City",
        "Most Serene Republic",
        "Oligarchy",
        "Protectorate",
        "Republic",
        "Tetrarchy",
        "Trade Company",
        "Triumvirate",
        "Confederacy",
        "Confederation",
        "Conglomerate",
        "Commonwealth",
        "League",
        "Union",
        "United Hordes",
        "United Kingdom",
        "United Provinces",
        "United Republic",
        "United States",
        "United Tribes",
        "Bishopric",
        "Brotherhood",
        "Caliphate",
        "Diocese",
        "Divine Duchy",
        "Divine Grand Duchy",
        "Divine Principality",
        "Divine Kingdom",
        "Divine Empire",
        "Eparchy",
        "Exarchate",
        "Holy State",
        "Imamah",
        "Patriarchate",
        "Theocracy",
        "Commune",
        "Community",
        "Council",
        "Free Territory",
        "Tribes"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
