define({ "api": [
  {
    "type": "get",
    "url": "/rooms",
    "title": "Fetch all rooms",
    "name": "GetRooms",
    "group": "Rooms",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "page",
            "description": "<p>Current page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "results",
            "description": "<p>Number of results.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "items",
            "description": "<p>Rooms.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "packages/server/src/routes/rooms.ts",
    "groupTitle": "Rooms"
  }
] });
