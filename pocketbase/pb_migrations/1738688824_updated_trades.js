/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  collection.listRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id"
  collection.viewRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id"
  collection.createRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\""
  collection.updateRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\""
  collection.deleteRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  collection.listRule = ""
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
