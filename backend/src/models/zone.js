const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
  dateCreated : Number,
  intervals : Array,
  name : String,
  area : {type: mongoose.Schema.Types.ObjectId,ref: 'Domain'}
});

module.exports = mongoose.model('Zone', ZoneSchema)
