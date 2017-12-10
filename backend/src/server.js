const path = require ('path');
const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const DomainRouter = require('./routes/domain');
const ZoneRouter = require('./routes/zone');
const HeatmapRouter = require('./routes/heatmap');

mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago", {useMongoClient: true});

app.get('/', (req, res) => res.send('Hello!'))

const router = express.Router();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use('/api', DomainRouter);
app.use('/api', ZoneRouter);
app.use('/api', HeatmapRouter);

app.listen(3001, () => console.log('working, yesh.. working'))
