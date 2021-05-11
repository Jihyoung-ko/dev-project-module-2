const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const userLoggedIn = require('../middleware/middle');



/* GET account page */
router.get('/', userLoggedIn, (req, res, next) => {
  res.render('account');
});



module.exports = router;
