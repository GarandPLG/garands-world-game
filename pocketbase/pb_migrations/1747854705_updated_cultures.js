/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1814955390")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Generic",
      "River",
      "Lake",
      "Naval",
      "Nomadic",
      "Hunting",
      "Highland"
    ]
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select2201216531",
    "maxSelect": 1,
    "name": "namesbase",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "German",
      "English",
      "French",
      "Italian",
      "Castillian",
      "Ruthenian",
      "Nordic",
      "Greek",
      "Roman",
      "Finnic",
      "Korean",
      "Chinese",
      "Japanese",
      "Portuguese",
      "Nahuatl",
      "Hungarian",
      "Turkish",
      "Berber",
      "Arabic",
      "Inuit",
      "Basque",
      "Nigerian",
      "Celtic",
      "Mesopotamian",
      "Iranian",
      "Hawaiian",
      "Karnataka",
      "Quechua",
      "Swahili",
      "Vietnamese",
      "Cantonese",
      "Mongolian",
      "Human Generic",
      "Elven",
      "Dark Elven",
      "Dwarven",
      "Goblin",
      "Orc",
      "Giant",
      "Draconic",
      "Arachnid",
      "Serpents",
      "Levantine"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1814955390")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Generic, River, Lake, Naval, Nomadic, Hunting, Highland"
    ]
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select2201216531",
    "maxSelect": 1,
    "name": "namesbase",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "German, English, French, Italian, Castillian, Ruthenian, Nordic, Greek, Roman, Finnic, Korean, Chinese, Japanese, Portuguese, Nahuatl, Hungarian, Turkish, Berber, Arabic, Inuit, Basque, Nigerian, Celtic, Mesopotamian, Iranian, Hawaiian, Karnataka, Quechua, Swahili, Vietnamese, Cantonese, Mongolian, Human Generic, Elven, Dark Elven, Dwarven, Goblin, Orc, Giant, Draconic, Arachnid, Serpents, Levantine"
    ]
  }))

  return app.save(collection)
})
