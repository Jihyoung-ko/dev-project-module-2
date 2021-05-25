require('dotenv').config()
//const MongoClient = require('mongodb').MongoClient;
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

//const uri = "mongodb+srv://Nicolas:wlKJ2BjO8TPdu72M@cluster0.ufms3.mongodb.net/iStock?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("iStock").collection("company");
//   // perform actions on the collection object
//   client.close();
// });


client
  .connect('mongodb://localhost:27017/dev-project--module2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Atlas DB 🚀');
  })
  .then( async () => {
    // delete all existing companies
    return await Company.deleteMany({  });
  })
  .then( async () => {
    // add all new companies
    return await Company.create(
      companyList
    )
  })
  .then(() => {
    console.log('Companies added!');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    client.close();
  });