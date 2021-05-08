const express = require('express');
const router  = express.Router();

/* GET account page */
router.get('/account', (req, res, next) => {
  res.render('account');
});

module.exports = router;
