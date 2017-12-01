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
app.use('/api', DomainRouter);
app.use('/api', ZoneRouter);
app.use('/api', HeatmapRouter);

app.listen(3001, () => console.log('working, yesh.. working'))
