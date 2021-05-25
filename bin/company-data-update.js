require('dotenv').config()
const mongoose = require('mongoose');
const Company = require('../models/company');
const axios = require('axios');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to Atlas DB 🚀');
  })
  .then(() => {
    return Company.find({ });
  })
  .then(companies => {
    var tickerStr = "";
    companies.forEach( (company) => {
      tickerStr += company.ticker + ",";
    })
  return tickerStr
  })
  .then( tickerStr => {
    // download company data from eodhistoricaldata.com API
    return axios.get('https://eodhistoricaldata.com/api/eod-bulk-last-day/US?', {
      params: {
        api_token: '5a7d012ed31c6',
        symbols: tickerStr,
        filter : 'extended',
        fmt : 'json',
      }
    })
  })
  .then( async (promiseRes) => {
  // update companies
    for (let company of promiseRes.data) {
      const lo_hi_perf = Math.round(((company.hi_250d-company.lo_250d)/company.lo_250d)*100)
      await Company.findOneAndUpdate( {
        ticker: company.code + "." + company.exchange_short_name 
        }, { $set: { 
          name: company.name,
          type: company.type,
          marketCap: company.MarketCapitalization,
          hi_250d: company.hi_250d,
          lo_250d: company.lo_250d,
          change_p: lo_hi_perf
        }
      }, { new:true} );
    }
  })
  .then( () => {
    console.log('Company data updated!');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });