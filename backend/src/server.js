const path = require ('path');
const express = require ('express');
const app = express();

app.get('/', (req, res) => res.send('Hello!'))

const router = express.Router();
app.use('/api', router);

router.route('/area')
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
