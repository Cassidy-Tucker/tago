const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreasSchema = new Schema({
    id : Number,
    name : String,
    heatmaps : [
    id : Number
  ],
    dateCreated : Number,
    zones : [
        {
            name : String,
            zoneId :   {type: mongoose.Schema.Types.ObjectId,ref: 'Zones'},
        }
    ],
    description : String
});

module.exports = mongoose.model('Areas', AreasSchema);
