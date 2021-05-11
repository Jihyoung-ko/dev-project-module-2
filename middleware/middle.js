const userLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  }
  return res.render('auth/login');
};

module.exports = userLoggedIn;