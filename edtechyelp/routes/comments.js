var express = require("express"),
    router  = express.Router(),
    Application     = require("../models/application"),
    Comment	    	= require("../models/comment");

router.get("/applications/:id/comments/new", isLoggedIn, function(req, res) {
    Application.findById(req.params.id, function(err, application){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {application: application});
        }
    });
});

router.post("/applications/:id/comments", isLoggedIn, function(req, res){
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
                comment.author.username = req.user.username;
                comment.author.id = req.user.id;
                comment.save();
                application.comments.push(comment);
                application.save();
                res.redirect('/applications/' + application._id);
            } 
        });
    }});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;