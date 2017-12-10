const express = require ('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();

const Heatmap = require('../models/heatmap');

mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {useMongoClient: true});

router.route('/heatmap')
  .get((req, res) => {
    Heatmap.find((err,heatmap) => {
      if(err)
        res.send(err);

      res.json(heatmap)
    });
  });

router.route('/heatmap/id/:heatmap_id')
  .get((req,res) => {
    Heatmap.findById(req.params.heatmap_id, (err, heatmap) => {
      if(err)
      res.send(err);

      res.json(heatmap);
    })
  });

router.route('/heatmap/date/:heatmap_dateCreated')
  .get((req,res) => {
    Heatmap.findOne({'dateCreated' : req.params.heatmap_dateCreated}, (err, heatmap) => {
      if(err)
      res.send(err);

      res.json(heatmap);
    });
  });

router.route('/heatmap/query/:query_value')
  .get((req, res) => {
    const queryValue = req.params.query_value;
    let query = {}

    if(isNaN(Number(queryValue))) {
      query = { $or : [
        { domain : queryValue }
      ]};
    } else {
      query = { $or : [
        { dateCreated : Number(queryValue) }
      ]};
    }

    Heatmap.find(query, (err, heatmap) => {
      if(err)
        console.log(err);

      res.json(heatmap);
    });
  });

  module.exports = router;
