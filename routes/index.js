const express = require('express');
const router  = express.Router();
const Company = require('../models/company');
const List = require('../models/list');

/* GET home page */
router.get('/', (req, res, next) => {
  Company.find({})
  .then(companies => {
    res.render('index', { companies });
  })
  .catch(error => {
    next(error);
  });
});



module.exports = router;
