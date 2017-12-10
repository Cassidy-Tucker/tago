const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeatmapSchema = new Schema({
  dateCreated : Number,
  area : Number,
  img : String
});

module.exports = mongoose.model('Heatmap', HeatmapSchema);
