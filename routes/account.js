const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const userLoggedIn = require('../middleware/middle');


/* GET account page */
router.get('/', userLoggedIn('account'), (req, res, next) => {
  const user = req.session.currentUser
  res.render('account', { user });
});



module.exports = router;
