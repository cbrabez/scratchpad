var middlewareObj = {};
var Note = require("../models/note");
// var Comment = require("../models/comment");

middlewareObj.checkNoteOwnership = function(req, res, next){
      if(req.isAuthenticated()){
            Note.findById(req.params.id, function(err, foundNote){
                if(err){
                    res.redirect("back");
                } else {
                    // does user own note?
                    if(foundNote.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("/notes");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
   };

/*
middlewareObj.checkCommentOwnership = function(req, res, next){
      if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back");
                } else {
                    // does user own comment?
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        }
}
*/

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;