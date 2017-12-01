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

    module.exports = router;
