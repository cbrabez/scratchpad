var middlewareObj = {};
var Note = require("../models/note");
var Task = require("../models/task");

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

middlewareObj.checkTaskOwnership = function(req, res, next){
      if(req.isAuthenticated()){
            Task.findById(req.params.id, function(err, foundTask){
                if(err){
                    res.redirect("back");
                } else {
                    // does user own task?
                    if(foundTask.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("/tasks");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
   };


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;