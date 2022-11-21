module.exports = {
  isAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      //req.isAuthenticated() will return true if user is logged in
      return next();
    } else {
      req.flash("error", "Please loging");
      res.redirect("/login");
    }
  },
};

module.exports = {
  noNeedAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
  },
};
