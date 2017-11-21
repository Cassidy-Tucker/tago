const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZonesSchema = new Schema({
    id : Number,
    dateCreated : Number,
    intervals : [
        {
            date : String,
            dateCreated : Number,
            activity : 0
        }
    ],
    name : String,
    area : {type: mongoose.Schema.Types.ObjectId,ref: 'Areas'},

});

module.exports = mongoose.model('Zones', ZomesSchema)
