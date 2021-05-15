const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const session = require('express-session');
const userLoggedIn = require('../middleware/auth');


/* GET account page */
router.get('/', userLoggedIn, (req, res, next) => {
  const user = req.session.currentUser
  res.render('account', { user });
});



module.exports = router;
