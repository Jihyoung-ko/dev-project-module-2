const express = require('express');
const router  = express.Router();
const Company = require('../models/company');
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  Company.find({})
  .then(companies => {
    // create array of API promises
    const arrayPromises = [];
    companies.forEach( (company) => {
      arrayPromises.push(axios.get('https://eodhistoricaldata.com/api/eod/' + company.ticker + '.US', {
        params: {
          api_token: '5a7d012ed31c6',
          period : 'd',
          filter : 'last_close',
          fmt : 'json'
        }
      }));
    });
    // execute promises array
    return Promise.all(arrayPromises)
    .then( (promisesRes, index) => {
      // update companies with lastPrice
      companies.forEach( (company, index) => {
        company.lastPrice = promisesRes[index].data;
      });
      return companies
    }).then(updatedCompanies => {
      return updatedCompanies;
    });
  }).then(companies => {
    res.render('index', { companies });
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
