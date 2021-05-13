const express = require('express');
const router  = express.Router();
const Company = require('../models/company');

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

router.get('/companies/:id', (req, res, next) => {
  const { id } = req.params;
  Company.findById(id)
  .then(company => {
    res.render('companies/detail', { company });
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
