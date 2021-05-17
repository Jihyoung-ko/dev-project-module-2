const mongoose = require('mongoose');
//onst axios = require('axios');
//const csvToJson = require('convert-csv-to-json');
//onst fileDownload = require('js-file-download');
const Company = require('../models/company');
const tickerList = require('./ticker-list.js');

// const arkFundNames = [
//   'ARK_INNOVATION_ETF_ARKK_HOLDINGS',]
//   'ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS',
//   'ARK_NEXT_GENERATION_INTERNET_ETF_ARKW_HOLDINGS',
//   'ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS',
//   'ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS',
//   'ARK_SPACE_EXPLORATION_&_INNOVATION_ETF_ARKX_HOLDINGS'
// ];

// create company json list
const companyList = [];
tickerList.forEach(element => {
  companyList.push({
    ticker: element,
  })
})

mongoose
  .connect('mongodb://localhost:27017/dev-project--module2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() => 
    Company.create(
      companyList
    )
  )
  .then(() => {
    console.log('company created');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });

  // get ark fund data ***WIP***
  
  // .then(() => {
  //   // get Ark holdings
  //   const promiseArray = [];
  //   arkFundNames.forEach( (fundName) => {
  //     promiseArray.push(axios.get('https://ark-funds.com/wp-content/fundsiteliterature/csv/' + fundName + '.csv', { responseType: 'blob',}))
  //   })
  //   // execute promises array
  //   return Promise.all(arrayPromises)
  // })
  // .then((promisesRes, index) => {

  //   //console.log('data:', promisesRes[0].data)

  //   fileDownload(promisesRes[0].data, 'report.csv')
  // })