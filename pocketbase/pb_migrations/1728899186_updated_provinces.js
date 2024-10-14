/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // remove
  collection.schema.removeField("b1dvt8zy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eeigltwa",
    "name": "form",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Area",
        "Autonomy",
        "Barony",
        "Canton",
        "Captaincy",
        "Chiefdom",
        "Clan",
        "Colony",
        "Council",
        "County",
        "Deanery",
        "Department",
        "Dependency",
        "Diaconate",
        "District",
        "Earldom",
        "Governorate",
        "Island",
        "Islands",
        "Land",
        "Landgrave",
        "Mandate",
        "Margrave",
        "Municipality",
        "Occupation zone",
        "Parish",
        "Prefecture",
        "Province",
        "Region",
        "Republic",
        "Reservation",
        "Seneschalty",
        "Shire",
        "State",
        "Territory",
        "Tribe"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gzjx76q8fu9nqby")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b1dvt8zy",
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
  collection.schema.removeField("eeigltwa")

  return dao.saveCollection(collection)
})
