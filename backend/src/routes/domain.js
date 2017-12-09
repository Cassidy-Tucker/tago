const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const app = express();

const router = express.Router();

const Domain = require("../models/domain");
const Heatmap = require("../models/heatmap");
const Zone = require("../models/zone");
mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {
	useMongoClient: true
});

router.route("/domain").get((req, res) => {
	Domain.find((err, domain) => {
		if (err) res.send(err);
		res.json(domain);
	});
});

router.route("/domain/id/:domain_id").get((req, res) => {
	Domain.findById(req.params.domain_id, (err, domain) => {
		if (err) res.send(err);
		res.json(domain);
	});
});

router.route("/domain/date/:domain_dateCreated").get((req, res) => {
	Domain.findOne(
		{ dateCreated: req.params.domain_dateCreated },
		(err, domain) => {
			if (err) res.send(err);
			res.json(domain);
		}
	);
});
/* Would like to search by interval and get all the intervals of activity attched to the zones to then be pushed into a graph
  x Basic route functionality
  x Ajax Route button
  x added access control allow headers, wild card
  x return date from ajax call
  Get the date, pass date into route and return date from route
  starting from now get the interval that is now, that is whatever the interval
*/
router.route("/domain/current/:span").get((req, res) => {
  /*
    This is not ideal for scalability. We are retrieving the three most recent
    zones, but this would not account for a situation with more or less zones
    defined.
  */
  var zonePromise = Zone.find()
		.sort({ dateCreated: -1 })
    .limit(3)
		.exec();

  zonePromise.then((zone) => {
    // should return all intervals for the three most recent zones
    var intervals_per_span = req.params.span / 5;

    for(var i = 0; i < zone.length; i++){
      var intervals_used = zone[i].intervals.length / intervals_per_span;
      var interval_array = [];

      for(var j = 0; j < intervals_used; j += intervals_per_span){
        var interval_sum   = 0;
        for(var k = j; k < (intervals_per_span + j); k++){
          interval_sum += zone[i].intervals[k].activity;
        }
        interval_array.push(interval_sum / intervals_per_span);
      }

      // console.log(zone[i].intervals);
         console.log("Sum for "+zone[i].name+": ", interval_array);
      //return res.status(200).json(zone);
    }
  });
});

/*********************************************
  This route shows the most recent heatmap data. Image data is stored as
  a base64 png
**********************************************/
router.route("/heatmap/mostRecent").get((req, res) => {
  heatmapPromise = Heatmap.findOne()
		.sort({ dateCreated: -1 })
		.exec();
  heatmapPromise.then((heatmap) => {
    return res.status(200).json(heatmap);
  })
});

router.route("/domain/query/:query_value").get((req, res) => {
	const queryValue = req.params.query_value;
	let query = {};

	if (isNaN(Number(queryValue))) {
		query = {
			$or: [
				{ name: queryValue },
				{ description: { $regex: RegExp(queryValue) } }
			]
		};
	} else {
		query = {
			$or: [{ dateCreated: Number(queryValue) }]
		};
	}

	Domain.find(query, (err, domain) => {
		if (err) console.log(err);

		res.json(domain);
	});
});

module.exports = router;
