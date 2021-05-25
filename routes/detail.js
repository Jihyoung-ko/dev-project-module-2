const express = require('express');
const router  = express.Router();
const Company = require('../models/company');
const List = require('../models/list');
const HistPrices = require('../models/histPrices');


router.get('/:id/home', (req, res, next) => {
  const { id } = req.params;
  HistPrices.find( { company : id })
    
    .populate('company')
    .then(data => {
      console.log(data[data.length-1]);
      const lastdata = data[data.length-1];
      res.render('companies/detail-home', { data, lastdata });
    })
    .catch(error => {
      next(error);
    });
  // Company.findById(id)
  //   .then()
  //   .then(company => {
  //     console.log(company);
  //     res.render('companies/detail-home', { company });
  //   })
  //   .catch(error => {
  //     next(error);
  //   });
});  

router.get('/:id/list', (req, res, next) => {
  const { id } = req.params;
  List.findById(id)
    .populate('company')
    .then(list => {
      res.render('companies/detail-list', { list });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/rate/1', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  List.findByIdAndUpdate( id, {rating: 1}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('back');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/rate/2', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  List.findByIdAndUpdate( id, {rating: 2}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('back');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/rate/3', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  List.findByIdAndUpdate( id, {rating: 3}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('back');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/rate/4', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  List.findByIdAndUpdate( id, {rating: 4}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('back');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/rate/5', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  List.findByIdAndUpdate( id, {rating: 5}, {new: true})
    .then(list => {
      console.log('Update rate', list);
      res.redirect('back');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;