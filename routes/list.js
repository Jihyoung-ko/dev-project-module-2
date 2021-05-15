const express = require('express');
const router  = express.Router();
const userLoggedIn = require('../middleware/middle');
const List = require('../models/list');

// load list view
router.get('/', userLoggedIn('list'), (req, res, next) => {
  const user = req.session.currentUser
  List.find({ user: user._id })
  .populate('company user')
  .then(list => {
    res.render('companies/list', { list });
  })
  .catch(error => {
    next(error);
  });
});

// add company to list
router.post('/:id/add', userLoggedIn('list'), (req, res, next) => {
  const user = req.session.currentUser
  const company = req.params;
  List.create({
    user: user._id,
    company: company.id
  })
    .then(list => {
      // 💥 la url del redirect es completa no como los paths del middleware
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

// remove company from list
router.post('/:id/remove', userLoggedIn('list'), (req, res, next) => {
  const user = req.session.currentUser
  const { id } = req.params;
  List.findByIdAndDelete(id)
    .then(list => {
      res.status(301);
      res.redirect('/list');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;