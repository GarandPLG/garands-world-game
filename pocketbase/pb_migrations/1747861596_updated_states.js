/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_114362883")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1384709455",
    "maxSelect": 1,
    "name": "form",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
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
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_114362883")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1384709455",
    "maxSelect": 1,
    "name": "form",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Beylik, Despotate, Dominion, Duchy, Emirate, Empire, Horde, Grand Duchy, Heptarchy, Khaganate, Khanate, Kingdom, Marches, Principality, Satrapy, Shogunate, Sultanate, Tsardom, Ulus, Viceroyalty, Chancellery, City-state, Diarchy, Federation, Free City, Most Serene Republic, Oligarchy, Protectorate, Republic, Tetrarchy, Trade Company, Triumvirate, Confederacy, Confederation, Conglomerate, Commonwealth, League, Union, United Hordes, United Kingdom, United Provinces, United Republic, United States, United Tribes, Bishopric, Brotherhood, Caliphate, Diocese, Divine Duchy, Divine Grand Duchy, Divine Principality, Divine Kingdom, Divine Empire, Eparchy, Exarchate, Holy State, Imamah, Patriarchate, Theocracy, Commune, Community, Council, Free Territory, Tribes"
    ]
  }))

  return app.save(collection)
})
