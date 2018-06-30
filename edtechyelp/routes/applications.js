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

router.post("/applications", function(req, res){
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

router.get("/applications/new", function(req, res) {
    res.render("applications/new");
});

router.get("/applications/:id", function(req, res){
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

module.exports = router;