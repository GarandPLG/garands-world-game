/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  collection.listRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id || @request.auth.id = exportState.user.id"
  collection.viewRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id || @request.auth.id = exportState.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5kijzizm0obbxc9")

  collection.listRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id"
  collection.viewRule = "@request.auth.role = \"moderator\" || @request.auth.role = \"admin\" || @request.auth.id = importState.user.id"

  return dao.saveCollection(collection)
})
