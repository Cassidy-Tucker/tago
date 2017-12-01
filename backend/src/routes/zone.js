const express = require ('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();

const Zone = require('../models/zone');

mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {useMongoClient: true});

router.route('/zone')
  .get((req, res) => {
    Zone.find((err,zone) => {
      if(err)
        res.send(err);

      res.json(zone)
    });
  });

  router.route('/zone/:zone_id')
    .get((req,res) => {
      Zone.findById(req.params.zone_id, (err, zone) => {
        if(err)
        res.send(err);

        res.json(zone);
      })
    })

  router.route('/zone/date/:zone_dateCreated')
  .get((req,res) => {
    Zone.findOne({'dateCreated' : req.params.zone_dateCreated}, (err, zone) => {
      if(err)
      res.send(err);

      res.json(zone);
    })
  })

  router.route('/zone/query/:query_value')
  .get((req, res) => {
    let queryValue = req.params.query_value;
    let query = { $or : [
      { name : queryValue },
      { dateCreated : queryValue }
    ]};

    Zone.find(query, (err, zone) => {
      if(err)
        console.log(err);

        res.json(zone);
    });
  });

    module.exports = router;
