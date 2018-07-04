var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Application     = require("./models/application"),
    seedDB          = require("./seeds"),
    Comment	    	= require("./models/comment"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");


var commentRoutes       = require("./routes/comments"),
    applicationRoutes   = require("./routes/applications"),
    authRoutes          = require("./routes/index");

mongoose.connect("mongodb://localhost/edtechyelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret: "This is a song that never ends.",
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
   next();
});

app.use(authRoutes);
app.use(applicationRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});