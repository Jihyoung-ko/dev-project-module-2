const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose
  .connect('mongodb://localhost:27017/dev-project--module2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() => 
    Company.create(
      [
        {
          "ticker" : "TSLA",
          "name" : "Tesla Motors Inc.",
          "description" : "This is the company's description.",
          "marketCap" : 100,
          "lastPrice" : 123
        },
        {
          "ticker" : "AMZN",
          "name" : "Amazon",
          "description" : "This is the company's description.",
          "marketCap": 100,
          "lastPrice": 123
        },
        {
          "ticker" : "AAPL",
          "name" : "Apple Inc.",
          "description" : "This is the company's description.",
          "marketCap": 100,
          "lastPrice": 123
        },
        {
          "ticker" : "GOOG",
          "name" : "Alphabet",
          "description" : "This is the company's description.",
          "marketCap": 100,
          "lastPrice": 123
        },
        {
          "ticker" : "PLTR",
          "name" : "Palantir Technologies",
          "description" : "This is the company's description.",
          marketCap: 100,
          lastPrice: 123
        },
        {
          "ticker" : "COIN",
          "name" : "Coinbase",
          "description" : "This is the company's description.",
          "marketCap": 100,
          "lastPrice": 123
        }
      ]
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