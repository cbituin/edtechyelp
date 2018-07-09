var express = require("express"),
    router  = express.Router(),
    Application     = require("../models/application");

router.get("/applications", function(req, res){
    //Get all applications from DB
    Application.find({}, function(err, allApplications){
        if(err){
            console.log(err);
        } else {
            res.render("applications/index", {applications:allApplications});
        }
    });
});

router.post("/applications", isLoggedIn, function(req, res){
    //get data from form and add to applications array.
    var name = req.body.name;
    var image = req.body.image;
    var summary = req.body.summary;
    var url = req.body.url;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newApplication = {name: name, image: image, summary: summary, url: url, author:author};
    // Create a new application and save to DB 
       Application.create(newApplication, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("applications");
        }
    });
});

router.get("/applications/new", isLoggedIn, function(req, res) {
    res.render("applications/new");
});

router.get("/applications/:id", function(req, res){
    //find the application with the provided id
    Application.findById(req.params.id).populate("comments").exec(function(err, foundApplication){
        if(err){
            console.log(err);
        }   else {
            res.render("applications/show", {application: foundApplication});
        }
    });
});

//EDIT APPLICATION
router.get("/applications/:id/edit", checkApplicationOwnership, function(req, res) {
        Application.findById(req.params.id, function(err, foundApplication){
            res.render("applications/edit", {application: foundApplication});
                
            });
    });

//EDIT APPLICATION ROUTE
router.put("/applications/:id", checkApplicationOwnership, function(req, res) {
    Application.findByIdAndUpdate(req.params.id, req.body.application, function(err, updatedCampground){
       if(err){
            res.redirect("/applications");
       } else {
            res.redirect("/applications/" + req.params.id);
       }
    });
});

//DESTROY THE APPLICATION
router.delete("/applications/:id", checkApplicationOwnership, function(req, res){

    Application.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/applications");
        } else {
            res.redirect("/applications");
        }
    });
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkApplicationOwnership(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Application.findById(req.params.id, function(err, foundApplication){
           if(err){
                res.redirect("back");
           } else {
               //does user own the campground?
               if(foundApplication.author.id.equals(req.user._id)) {
                   next();
               } else {
                res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;