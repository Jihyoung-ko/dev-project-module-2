const tickerList = require('./ticker-list.js');

// create company json list
const companyList = [];
tickerList.forEach(element => {
  companyList.push({
    ticker: element,
  })
})
//const uri = "mongodb+srv://Nicolas:wlKJ2BjO8TPdu72M@cluster0.ufms3.mongodb.net/iStock?retryWrites=true&w=majority";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Nicolas:wlKJ2BjO8TPdu72M@cluster0.ufms3.mongodb.net/iStock?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect( async (err) => {
  const company = client.db("iStock").collection("company");
    await company.insertMany(companyList)
  client.close();
});
