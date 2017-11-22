const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeatmapsSchema = new Schema({
    id : Number,
    dateCreated : Number,
    area : Number,
    img : String
});

module.exports = mongoose.model('Heatmaps', HeatmapsSchema);
