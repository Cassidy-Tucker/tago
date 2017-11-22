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

  module.exports = router;
