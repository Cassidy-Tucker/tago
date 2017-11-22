const path = require ('path');
const express = require ('express');
const app = express();
const mongoose = require ('mongoose')
const Domain = require ('./models/domain');
const Zone = require ('./models/zone');
const Heatmap = require ('./models/heatmap');


mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {useMongoClient: true});


app.get('/', (req, res) => res.send('Hello!'))

const router = express.Router();
app.use('/api', router);

router.route('/domain')
  /************************************************************

  ************************************************************/
  .get((req, res) => {
    Domain.find((err,domain) => {
      if(err)
        res.send(err);

      res.json(domain)
    })
  })
router.route('/zone')
/************************************************************

************************************************************/
  .get((req, res) => {
    Zone.find((err,zone) => {
      if(err)
        res.send(err);

      res.json(zone)
    })

  })

  router.route('/heatmap')
  /************************************************************

  ************************************************************/
    .get((req, res) => {
      Heatmap.find((err,heatmap) => {
        if(err)
          res.send(err);

        res.json(heatmap)
      })
    })

app.listen(3001, () => console.log('working, yesh.. working'))
