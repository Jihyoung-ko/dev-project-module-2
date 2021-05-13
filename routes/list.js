const express = require('express');
const router  = express.Router();
const userLoggedIn = require('../middleware/middle');
const List = require('../models/list');

/* GET account page */
router.get('/', userLoggedIn('list'), (req, res, next) => {
  const user = req.session.currentUser
  List.findById(user._id)
  .then(list => {
    console.log(list)
    res.render('companies/list', { list });
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
