const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/user');

router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render('auth/signup', {errorMessage: 'All fields are mandatory. Please provide your Email and password.'});
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({ email, hashedPassword })
     })
    .then(() => res.redirect('/'))
    .catch(error => {
      if (error.code === 11000) {
        res.render('auth/signup', {errorMessage: 'Email is already used.'});
      } else {
        next(error);
      }
    });  
});

router.get('/login', (req, res) => {
  
  res.render('auth/login')
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render('auth/login', {errorMessage: 'Please enter both Email and password to log in.'});
    return;
  }

  User.findOne({email})
  .then(user => {
    if (!user) {
      res.render('auth/login', {errorMessage: 'Email is not registered.'});
      return;
    } else if (bcryptjs.compareSync(password, user.hashedPassword)) {
      req.session.currentUser = user;
      res.redirect('back');
    } else {
      res.render('auth/login', {errorMessage: 'Incorrect password'})
    }
  })
  .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
