const mongoose = require('mongoose');
const Company = require('../models/company');
const tickerList = require('./ticker-list.js');

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
  .then( () => {
    // delete all existing companies
    return Company.deleteMany({  });
  })
  .then(() => 
    // add all new companies
    Company.create(
      companyList
    )
  )
  .then(() => {
    console.log('Companies added!');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });