/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3r3zyqiq5orbj1v",
    "created": "2024-10-07 13:10:49.262Z",
    "updated": "2024-10-07 13:10:49.262Z",
    "name": "biomes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fuod8jq8",
        "name": "turn",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "epzfx3cn",
        "name": "group",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Cold desert",
            "Glacier",
            "Grassland",
            "Hot desert",
            "Savanna",
            "Taiga",
            "Temperate deciduous forest",
            "Temperate rainforest",
            "Tropical rainforest",
            "Tropical seasonal forest",
            "Tundra",
            "Wetland"
          ]
        }
      },
      {
        "system": false,
        "id": "rlbrjxrr",
        "name": "value",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3r3zyqiq5orbj1v");

  return dao.deleteCollection(collection);
})
