const express = require('express');
const router  = express.Router();
const userLoggedIn = require('../middleware/middle');

/* GET account page */
router.get('/', userLoggedIn('list'), (req, res, next) => {
  res.render('list/list');
});

module.exports = router;
