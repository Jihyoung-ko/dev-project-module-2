const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
  
  ticker: {
    type: String,
    required: [true, 'ticker is required'],
  },
  name: String,
  description: String,
  marketCap: Number,
	lastPrice: Number,
  hi_250d: Number,
  lo_250d: Number

});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;