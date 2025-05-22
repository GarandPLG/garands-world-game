/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3904711375")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1384709455",
    "maxSelect": 1,
    "name": "form",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
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
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3904711375")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1384709455",
    "maxSelect": 1,
    "name": "form",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Area, Autonomy, Barony, Canton, Captaincy, Chiefdom, Clan, Colony, Council, County, Deanery, Department, Dependency, Diaconate, District, Earldom, Governorate, Island, Islands, Land, Landgrave, Mandate, Margrave, Municipality, Occupation zone, Parish, Prefecture, Province, Region, Republic, Reservation, Seneschalty, Shire, State, Territory, Tribe"
    ]
  }))

  return app.save(collection)
})
