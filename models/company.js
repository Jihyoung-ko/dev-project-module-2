const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
  
  ticker: {
    type: String,
    required: [true, 'ticker is required'],
  },
  name: String,
  type: String,
  marketCap: String,
  hi_250d: String,
  lo_250d: String,
  lastPrice: String,
  change_p: String

});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;