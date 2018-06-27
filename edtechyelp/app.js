var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Application = require("./models/application"),
    seedDB      = require("./seeds"),
    Comment		= require("./models/comment");

mongoose.connect("mongodb://localhost/edtechyelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

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

app.get("/applications/:id/comments/new", function(req, res) {
    Application.findById(req.params.id, function(err, application){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {application: application});
        }
    });
});

app.post("/applications/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});