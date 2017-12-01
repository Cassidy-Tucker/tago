const express = require ('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();

const Domain = require('../models/domain');
const Heatmap = require('../models/heatmap')
mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {useMongoClient: true});

router.route('/domain')
  .get((req, res) => {
    Domain.find((err,domain) => {
      if(err)
        res.send(err);
      res.json(domain)
    })
  })

  router.route('/domain/id/:domain_id')
    .get((req,res) => {
      Domain.findById(req.params.domain_id, (err, domain) => {
        if(err)
        res.send(err);
        res.json(domain);
      })
    })

  router.route('/domain/date/:domain_dateCreated')
  .get((req,res) => {
    Domain.findOne({'dateCreated' : req.params.domain_dateCreated}, (err, domain) => {
      if(err)
      res.send(err);

      res.json(domain);
    })
  })

  router.route('/domain/current')
  .get((req,res) => {
    Domain.findOne().sort({"dateCreated": -1}).exec((err, domain)=> {
      if(err){
        console.error(err)
      }
      var sortHeatMaps = domain.heatmaps.sort((a,b)=>{
        return a.dateCreated - b.dateCreated;
      })
     var result = sortHeatMaps.pop();
     Heatmap.findById(result.id,(err,heatmap) => {
       if(err)
       console.error(err)
       res.json(heatmap)
     })
    })
  })
  module.exports = router;
