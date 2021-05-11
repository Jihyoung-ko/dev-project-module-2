const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({

  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},

  rating: Number,

});

const List = mongoose.model('List', listSchema);

module.exports = List;