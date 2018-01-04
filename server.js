const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DomainRouter = require('./backend/src/routes/domain');
const ZoneRouter = require('./backend/src/routes/zone');
const HeatmapRouter = require('./backend/src/routes/heatmap');

mongoose.connect("mongodb://Keesha:skool16@ds113826.mlab.com:13826/tago");

const router = express.Router();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(express.static(path.join(__dirname, 'frontend/public')));

app.use(allowCrossDomain);
app.use('/api', DomainRouter);
app.use('/api', ZoneRouter);
app.use('/api', HeatmapRouter);

app.listen(process.env.PORT || 3001, () => console.log('working, yesh.. working'))
