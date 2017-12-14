# API Documentation

[ base url: http://localhost:3001/api ]

## Sections

- [Domain](#Domain)
- [Zone](#Zone)
- [Heatmap](#Heatmap)

### Domain

**GET** /domain - Returns all domains in the database

**GET** /domain/current - Returns the most recent Domain

**GET** /domain/id/*{DomainId}* - Returns one domain matching the domain ID

**GET** /domain/date/*{dateCreated}* - Returns one domain that matches the date created.

**GET** /domain/query/*{queryValue}* - Return all domains that match the queryValue. Queries the name and description.

**GET** /domain/currentZone/*{interval}* - Returns the most recent heat map and
zone activity.

### Zone

**GET** /zone - Returns all zones in the database

**GET** /zone/id/*{zoneId}* - Returns on domain that matches the zone ID.

**GET** /zone/date/*{dateCreated}* - Returns one domain that matches date created.

**GET** /zone/query/*{queryValue}* - Returns all zones that match the the keywords in queryValue. Queries the name and dateCreated fields.

### Heatmap

**GET** /Heatmap - Returns all heatmaps in the database

**GET** /heatmap/id/*{heatmapId}* - returns one domain that matches the heatmap id.

**GET** /heatmap/date/*{dateCreated}* - returns on heatmaps that matches the heatmap ID.

**GET** /heatmap/query/*{queryValue}* - reutrns one heatmap that matches the keywords in the query domain. Queries the dateCreated field and name of the heatmap.
