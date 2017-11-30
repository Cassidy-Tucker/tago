# Database Specs

The database structure will be organized in three collections: domains, zones, and heatmaps. Domains will be stored in independent documents and will link to corresponding zones and heat maps via the ObjectId.

Zones will be stored as documents as well, and all intervals will be stored in the document. These intervals will be stored as an array of objects. Zones will also use the objectID to link back to the parent area.

Each Zone interval contains a dateCreated which is stored in ISO string format, and an activity count which is the overall activity of the zone. The activity will range from 0-255.

Each heatmap interval will be stored as independent documents, and will also use the object ID to link back to the parent area. A 16MB space restriction will prevent us from being able to store all heatmaps in one document.

Each heatmap interval contains a dateCreated and an image. The dateCreated is stored as in ISO string format. The images are encoded using base64 encoding and are png file types.

## Domains

```javascript
{
	"id" : ObjectId("5a125a6112aa1cbde81976f8"),
	"name" : "TestArea",
	"heatmaps" : [
    "id" : ObjectId("5a125a6112aa1cbde81063c4")
  ],
	"dateCreated" : NumberLong("1511177425000"),
	"zones" : [
		{
			"name" : "Zone1",
			"zoneId" : ObjectId("5a125a6112aa1cbde81976f9")
		}
	],
	"description" : "it's in a room on the north side"
}
```

## Zones

```javascript
{
	"id" : ObjectId("5a125a6112aa1cbde81976f9"),
	"dateCreated" : NumberLong("1511177425000"),
	"intervals" : [
		{
			"date" : "testDate",
			"dateCreated" : NumberLong("1511177430000"),
			"activity" : 0
		}
	],
	"name" : "Zone1",
	"area" : ObjectId("5a125a6112aa1cbde81976f8")
}
```

## Heatmaps

```javascript
{
	"id" : ObjectId("5a125a6112aa1cbde81063c4"),
	"dateCreated" : NumberLong("1511177425000"),
	"area" : ObjectId("5a125a6112aa1cbde81976f8"),
  "img" : BinaryImage
}
```
