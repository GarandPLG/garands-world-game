/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // remove
  collection.schema.removeField("yxuxekdh")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ytob8a12887fu67")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yxuxekdh",
    "name": "form_select",
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

  // remove
  collection.schema.removeField("0n1qvsni")

  return dao.saveCollection(collection)
})
