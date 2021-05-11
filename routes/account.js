const express = require('express');
const router  = express.Router();
const User = require('../models/user');


/* GET account page */
router.get('/', (req, res, next) => {
  res.render('account');
});



module.exports = router;
