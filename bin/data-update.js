const mongoose = require('mongoose');
const Company = require('../models/company');
const tickerList = require('./ticker-list.js');
const axios = require('axios');

mongoose
  .connect('mongodb://localhost:27017/dev-project--module2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() => {
    return Company.find({});
  })
  .then(companies => {
    // create array of API promises
    const arrayPromises = [];
    companies.forEach( (company) => {
      arrayPromises.push(axios.get('https://eodhistoricaldata.com/api/eod-bulk-last-day/US?', {
        params: {
          api_token: '5a7d012ed31c6',
          symbols: company.ticker,
          filter : 'extended',
          fmt : 'json',
        }
      }));
    })
    // execute promises array
    return Promise.all(arrayPromises)
  })
  .then( (promisesRes, index) => {
    // update companies
    promisesRes.forEach( (company) => {
      //const { code , exchange_short_name:esn , name, MarketCapitalization:marketCap ,hi_250d, lo_250d } = company.data[0];
      Company.findOneAndUpdate( {
        ticker: company.data[0].code + "." + company.data[0].exchange_short_name 
        //ticker: code + "." + esn
        }, { "$set": { 
        name: "test",
        marketCap: 0,
        hi_250d: 0,
        lo_250d: 0
      }})
    })
  })
  .then( () => {
    console.log('companies updated');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });