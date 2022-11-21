var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

const { noNeedAuth } = require("../config/auth");

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Flowbite - professional podcast managers",
    indexFlash: req.flash("success"),
    user: req.user,
  });
});

router.get("/login", function (req, res, next) {
  if (!req.user) {
    res.render("login", { title: "User account login", user: req.user });
  } else {
    req.flash("success", "You are allready logged in");
    res.redirect("/");
  }
});

router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "User account register",
    errors: [],
    user: req.user,
  });
});

router.get("/about", noNeedAuth, function (req, res, next) {
  res.render("about", {
    title: "Contact Us ",
    errors: " ",
    user: req.user,
  });
});

// router.get("/about", function (req, res, next) {
//   res.render("about", { title: "Contact Us" });
// });
var UserMessage = require("../models/usersMessage");

router.get("/contact", noNeedAuth, function (req, res, next) {
  res.render("contact", {
    title: "Contact Us ",
    errors: " ",
    user: req.user,
  });
});

router.post(
  "/contact",
  body("email", "Email is required.").notEmpty(),
  body("email", "Email is not valid.").isEmail(),
  body("subject", "Subject is required.").notEmpty(),
  body("message", "Message is required.").notEmpty(),

  function (req, res, next) {
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    console.log(req.body);

    // Form Validator
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.render("contact", {
        title: "Contact Us",
        errors: errors.errors,
        user: req.user,
      });
    } else {
      var newMessage = new UserMessage({
        subject: subject,
        email: email,
        message: message,
      });

      UserMessage.createNewMessage(newMessage, function (err, user) {
        console.log(err);
        if (err) throw err;
        console.log(user);
      });

      req.flash("success", "Your message has been submitted");
      res.location("/");
      res.redirect("/");
    }
  }
);

// router.get("/contact", function (req, res, next) {
//   res.render("contact", { title: "Contact Us" });
// });

module.exports = router;
