/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1814955390")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number778906058",
    "max": null,
    "min": 0,
    "name": "urbanPopulation",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number3024723976",
    "max": null,
    "min": 0,
    "name": "ruralPopulation",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1814955390")

  // remove field
  collection.fields.removeById("number778906058")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number3024723976",
    "max": null,
    "min": 0,
    "name": "population",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
