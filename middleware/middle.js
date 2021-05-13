const userLoggedIn = (page) => {
  return ((req, res, next) =>{
    if (req.session.currentUser) {
      return next();
    }
    return res.render('auth/login', {page});
  });

};

module.exports = userLoggedIn;


