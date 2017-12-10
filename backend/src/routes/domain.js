const express = require("express");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

const app = express();
const router = express.Router();

const Domain = require("../models/domain");
const Heatmap = require("../models/heatmap");
const Zone = require("../models/zone");

const MongoClient = require('mongodb').MongoClient;
const db = MongoClient.connect('mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago');

var FindQuery = function(query) {
  return db.then(function() {
    return query;
  }).then(function(data) {
    return data.zones;
  });
};

var ZonesQuery = function() {
  return db.then(function() {
    return Domain.findOne().sort({ dateCreated: -1 }).populate({
	    path: 'zones',
	    model: 'Zone',
	    populate: {
	      path: 'zones',
	      model: 'Zone'
	    }
	  });
  }).then((data) => {
		return data;
	});
};

router.route("/domain").get((req, res) => {
	var query = Domain.find({});

	FindQuery(query).then(function(data) {
	  res.json(data);
	}, function(err) {
	  console.error('The promise was rejected', err, err.stack);
	});
});

router.route("/domain/id/:domain_id").get((req, res) => {
	var query = Domain.findById(req.params.domain_id);

	FindQuery(query).then(function(data) {
	  res.json(data);
	}, function(err) {
	  console.error('The promise was rejected', err, err.stack);
	});
});

router.route("/domain/date/:domain_dateCreated").get((req, res) => {
	var query = Domain.findOne({ dateCreated: req.params.domain_dateCreated });

	FindQuery(query).then(function(data) {
	  res.json(data);
	}, function(err) {
	  console.error('The promise was rejected', err, err.stack);
	});
});

router.route("/domain/currentZones/:interval").get((req, res) => {
	ZonesQuery().then(function(data) {
		function retSumOfIntervalForZone(zone, iterValue) {
			let iterCount = iterValue/5,
			    intervals = zone.intervals,
					retArr = [];

		  for (var i = intervals.length - 1; i >= 0; i -= iterCount) {
				filtInt = {
					activity : 0,
				  dateCreated: intervals[i].dateCreated
			  };

				let arr = intervals.slice(
					intervals.length - (1 + i),
					intervals.length -1
				);

				for(var j in arr) {
					filtInt.activity += arr[j].activity / arr.length;
				}

			 retArr.push(filtInt);
			}
			return retArr;
		}

		data.zones.forEach((zone, index) => {
			zone.intervals = retSumOfIntervalForZone(zone, req.params.interval);
		});

		Heatmap.findOne().sort({ dateCreated: -1 }).then((heatmap) => {
			data.heatmaps = heatmap;
			res.json(data);
		});
	}, function(err) {
		console.error('The promise was rejected', err, err.stack);
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
  });
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
