const mongoose = require('mongoose');

const { Schema } = mongoose;

const HistPricesSchema = new Schema({
  
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  Close: Number,
  adjusted_close: Number,
  volume: Number,
});

const HistPrices = mongoose.model('HistPrices', HistPricesSchema);

module.exports = HistPrices;