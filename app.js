var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Note     = require("./models/note"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

// requiring routes
var noteRoutes       = require("./routes/notes"),
    indexRoutes         = require("./routes/index");

// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://chris:password1234@ds061839.mlab.com:61839/scratchpad_dev");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // seeding the database

// passport configuration

app.use(require("express-session")({
    secret: "Paul und Marie sind super!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/notes", noteRoutes);
/*
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
*/

// Server Setup
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("ScratchPad Server has started!");
});