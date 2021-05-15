const express = require('express');
const router  = express.Router();
const userLoggedIn = require('../middleware/middle');
const List = require('../models/list');

router.get('/', userLoggedIn('list'), (req, res, next) => {
  const user = req.session.currentUser
  List.find({ user: user._id })
  .populate('company user')
  .then(list => {
    console.log('list:',list,'user:',user._id)
    res.render('companies/list', { list });
  })
  .catch(error => {
    next(error);
  });
});

router.post('/:id/add', (req, res, next) => {
  const user = req.session.currentUser
  const company = req.params;
  console.log(company);
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

module.exports = router;
