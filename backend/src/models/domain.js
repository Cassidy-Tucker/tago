const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DomainSchema = new Schema({
    name : String,
    heatmaps : Array,
    dateCreated : Number,
    zones : Array,
    description : String
});

module.exports = mongoose.model('Domain', DomainSchema);
