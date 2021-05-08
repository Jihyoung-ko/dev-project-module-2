const express = require('express');
const router  = express.Router();

/* GET account page */
router.get('/', (req, res, next) => {
  res.render('list/list');
});

module.exports = router;
