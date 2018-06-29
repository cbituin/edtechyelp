var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Application     = require("./models/application"),
    seedDB          = require("./seeds"),
    Comment	    	= require("./models/comment");
    User            = require("./models/user")

mongoose.connect("mongodb://localhost/edtechyelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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


//Routes

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/applications", function(req, res){
    //Get all applications from DB
    Application.find({}, function(err, allApplications){
        if(err){
            console.log(err);
        } else {
            res.render("applications/index", {applications:allApplications});
        }
    });
});

app.post("/applications", function(req, res){
    //get data from form and add to applications array.
    var name = req.body.name;
    var image = req.body.image;
    var summary = req.body.summary;
    var url = req.body.url;
    var newApplication = {name: name, image: image, summary: summary, url: url};
    // Create a new application and save to DB 
       Application.create(newApplication, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("applications");
        }
    });
});

app.get("/applications/new", function(req, res) {
    res.render("applications/new");
});

app.get("/applications/:id", function(req, res){
    //find the application with the provided id
    Application.findById(req.params.id).populate("comments").exec(function(err, foundApplication){
        if(err){
            console.log(err);
        }   else {
            console.log(foundApplication);
            res.render("applications/show", {application: foundApplication});
        }
    });
});

//===================
//COMMENTS ROUTES
//===================

app.get("/applications/:id/comments/new", isLoggedIn, function(req, res) {
    Application.findById(req.params.id, function(err, application){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {application: application});
        }
    });
});

app.post("/applications/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using ID
    Application.findById(req.params.id, function(err, application) {
        if(err){
            console.log(err);
            res.redirect("/applications");
        }else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
            } else {
                application.comments.push(comment);
                application.save();
                res.redirect('/applications/' + application._id);
            } 
        });
    }});
});

//====================
//Auth Routes
//====================

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/applications")
        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {   
        successRedirect: "/applications",
        failureRedirect: "/login"
    }));

app.get("/logout", function(req, res) {
   req.logout(); 
   res.redirect("/applications");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});