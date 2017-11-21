const path = require ('path');
const express = require ('express');
const app = express();
const mongoose = require ('mongoose')

mongoose.connect("mongodb://Keesha:codeschool16@ds113626.mlab.com:13626/tago_areas", {useMongoClient: true});


app.get('/', (req, res) => res.send('Hello!'))

const router = express.Router();
app.use('/api', router);

router.route('/areas')
  /************************************************************

  ************************************************************/
  .get((req, res) => {
    res.json({message: 'Get all information of the area'})

  })
router.route('/area/:zone')
/************************************************************

************************************************************/
  .get((req, res) => {
    res.json({message: 'Get all information for zone'})
  })

  router.route('/zone/:heatmap')
  /************************************************************

  ************************************************************/
    .get((req, res) => {
      res.json({message:'Get heatmap of the zone'})
    })

app.listen(3001, () => console.log('working, yesh.. working'))
