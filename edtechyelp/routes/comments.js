var express = require("express"),
    router  = express.Router(),
    Application     = require("../models/application"),
    Comment	    	= require("../models/comment"),
    middleware      = require("../middleware");

router.get("/applications/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Application.findById(req.params.id, function(err, application){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {application: application});
        }
    });
});

router.post("/applications/:id/comments", middleware.isLoggedIn, function(req, res){
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

//COMMENTS EDIT
router.get("/applications/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {application_id: req.params.id, comment: foundComment});

        }
    });
});

//COMMENTS UPDATE ROUTE
router.put("/applications/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

//COMMENTS DESTROY ROUTE
router.delete("/applications/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

module.exports = router;