var express = require("express");
var router = express.Router();
var Note = require("../models/note");
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req, res){
   res.render("landing"); 
});

// register form route
router.get("/register", function(req, res) {
    res.render("register");
});

// sign up route
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to ScratchPad " + user.username);
            res.redirect("/notes");
        });
    });
});

// login form route
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/notes",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/notes");
});



module.exports = router;