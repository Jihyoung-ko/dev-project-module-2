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

//detail page
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

router.post('/:id/rate', (req, res, next) => {
  const { id } = req.params;
  List.findOneAndUpdate( {company_id: id}, {rating: 1}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
