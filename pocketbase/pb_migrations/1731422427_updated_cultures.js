/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("68vqkh9rt3btxix")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9o24gsgq",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qctjwvi8",
    "name": "namebase",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
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
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("68vqkh9rt3btxix")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9o24gsgq",
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
    "id": "xnbn4zl8",
    "name": "type",
    "type": "select",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qctjwvi8",
    "name": "namebase",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
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
    }
  }))

  return dao.saveCollection(collection)
})
