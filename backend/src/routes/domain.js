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
router.route("/domain/current/:interval").get((req, res) => {
	var promise = Domain.findOne()
		.sort({ dateCreated: -1 })
		.exec();

  promise.then((domain) => {
    domain.zones.map((zone) => {
      Zone.findById(zone.id,(err, z) =>{
        var int =  z.intervals.filter((i,v)=>{
            return v.dateCreated = new Date().getTime();
        })
        res.json(int)
      })
    })
  })
});
      //
      // res.json({
      //   'interval': req.params.interval,
      //   'domain': promise

    // var zoneArr = [];
    // for (var i = 0; i < domain.zones.length; i++) {
    //   Zone.findById(domain.zones[i].zoneId, (err, z) => {
    //     zoneArr.push(z);
    //     if (i === domain.zones.length) {
    //       res.json(zoneArr);
    //     }
    //   });
    // }
	// promise
	// 	.then(domain => {
	// 		console.log(domain);
	// 	})
	// 	.then(domain => {
	// 		var promiseTo = Heatmap.findById(domain.id).exec();
	// 		promiseTo
	// 			.then(heatmap => {
	// 				console.log(heatmap);
	// 			})
	// 			.catch((err) => {
	// 				console.log("error", err);
	// 			});
	// 	})
	// 	.catch((err) => {
	// 		console.log("error", err);
	// 	});

	// var sortHeatMaps = domain.heatmaps.sort((a, b) => {
	// 	return a.dateCreated - b.dateCreated;
	// });
  //
	// var result = sortHeatMaps.pop();
	// if (domain.heatmaps.length == 0) {
	// 	res.json({ error: "occured" });
	// }
  //
	// var promiseMore = Heatmap.findById(result.id).exec();
  //   promiseMore
  //     .then((heatmap) => {
  //       console.log(heatmap)
  //     })
  //     .catch((err) => {
  //       console.log("error",err);
  //     });

// 	res.json(domain);


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
