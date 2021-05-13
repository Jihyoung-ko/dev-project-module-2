const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const userLoggedIn = require('../middleware/middle');


/* GET account page */
router.get('/', userLoggedIn('account'), (req, res, next) => {
  const user = req.session.currentUser
  res.render('account', { user });
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
  .then(user => {
    console.log('User has deleted', user);
    res.redirect('/');
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
