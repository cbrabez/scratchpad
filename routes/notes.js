var express = require("express");
var router = express.Router();
var Note = require("../models/note");
var middleware = require("../middleware");

// INDEX - show all notes
router.get("/", function(req, res){
    // Get all notes from DB
    Note.find({}, function(err, allNotes){
        if(err){
            console.log(err);
        } else {
            res.render("notes/index", {notes: allNotes});    
        }
    }); 
});

// EDIT NOTE ROUTE
router.get("/:id/edit", middleware.checkNoteOwnership, function(req, res) {
            Note.findById(req.params.id, function(err, foundNote){
                res.render("notes/edit", {note: foundNote});
            });
});

// UPDATE NOTE ROUTE
router.put("/:id", middleware.checkNoteOwnership, function(req, res){
    // find and update correct note
    Note.findByIdAndUpdate(req.params.id, req.body.note, function(err, updatedNote){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/notes");
        }
    });
});

// CREATE - add new note to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var text = req.body.text;
/* var author = {
       id: req.user._id,
       username: req.user.username
   };
*/
   var newNote = {name: name, text: text};
   Note.create(newNote, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          console.log(newlyCreated);
          res.redirect("/");
      }
   });
});

// NEW - show form to create new note
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("notes/new"); 
});

// DESTROY NOTE ROUTE
router.delete("/:id", middleware.checkNoteOwnership, function(req, res){
    Note.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/notes");
        } else {
            res.redirect("/notes");
        }
    });
});


module.exports = router;