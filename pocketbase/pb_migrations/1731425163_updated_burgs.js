/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  collection.createRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qeo77u83ue36ptc")

  collection.createRule = null

  return dao.saveCollection(collection)
})
