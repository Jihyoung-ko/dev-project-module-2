require('dotenv').config()
const mongoose = require('mongoose');
const Company = require('../models/company');
const HistPrices = require('../models/histPrices');
const axios = require('axios');

function getCurrentDate() {
  // get current date
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; 
  let yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 

  if(mm<10) 
  {
      mm='0'+mm;
  } 
  return yyyy + "-" + mm + "-" + dd
}

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() => {
    // delete all historical data
    return HistPrices.deleteMany({ });
  })
  .then(() => {
    // get companies
    return Company.find({});
  })
  .then( async companies => {
    // get historical data
    for (i = 0; i < companies.length; i++) {
      console.log("Data update progress: ", Math.round((i / companies.length) * 100), "%");
      const id = companies[i]._id;
      const ticker = companies[i].ticker;
      await axios.get("https://eodhistoricaldata.com/api/eod/" + ticker + "?", {
        params: {
          from: "2020-01-01",
          to: getCurrentDate(),
          api_token: '5a7d012ed31c6',
          period: "m",
          fmt : 'json',
        }
      }).then( async (res) => {
        // delete current histPrices data
        await HistPrices.deleteMany( { company: id } );
        //add new histPrices
        for (let data of res.data) {
            await HistPrices.create( {
            company: id,
            date: data.date,
            open: data.open,
            high: data.high,
            low: data.low,
            Close: data.close,
            adjusted_close: data.adjusted_close,
            volume: data.volume,
          })
        }
      })
    }
  })
  .then( () => {
    console.log('Company historical data updated!');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });