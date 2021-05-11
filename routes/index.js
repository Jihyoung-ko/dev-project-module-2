const express = require('express');
const router  = express.Router();
const Company = require('../models/company');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(Company);
  Company.find({})
  .then(companies => {
    res.render('index', { companies });
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
