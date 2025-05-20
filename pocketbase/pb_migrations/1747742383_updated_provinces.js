/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3904711375")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_953189830",
    "hidden": false,
    "id": "relation538973511",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "turn",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3904711375")

  // remove field
  collection.fields.removeById("relation538973511")

  return app.save(collection)
})
