var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var Task = require("../models/task");
var middleware = require("../middleware");

// INDEX - show all tasks
router.get("/",middleware.isLoggedIn, function(req, res){
    // Get all tasks from DB
    Project.find({}, function(err, allProjects){
        if(err){
            console.log(err);
        } else {
            res.render("projects/index", {projects: allProjects});    
        }
    }); 
});


// INDEX - show tasks to a specific project
router.get("/:id", function(req, res){
   Project.findById(req.params.id, function(err, foundProject){
      if(err){
            console.log(err);
      } else {
         Task.find({'project.id': req.params.id }, function(err, specificTasks){
            res.render("projects/project", {tasks: specificTasks, project: foundProject});
         });
      }
                //res.render("tasks/edit", {task: foundTask});
   });      
});

// EDIT TASK ROUTE
router.get("/:id/edit",middleware.checkTaskOwnership, function(req, res) {
            Task.findById(req.params.id, function(err, foundTask){
                res.render("tasks/edit", {task: foundTask});
            });
});

// UPDATE Task ROUTE
router.put("/:id", function(req, res){
    console.log("YOU HIT THE UPDATE ROUTE");
    var name = req.body.name;
    var author = {
       id: req.user._id,
       username: req.user.username
   };
   
   var newProject = {name: name, author: author};
   
    // find and update correct task
    Project.findByIdAndUpdate(req.params.id, newProject, function(err, updatedProject){
        if(err){
            res.redirect("/");
            console.log(req.body.task);
        } else {
            res.redirect("/projects");
            console.log(req.params.id);
            console.log(newProject);
        }
    });
});

// CREATE - add new task to DB
router.post("/",middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   //var content = req.body.content;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newProject = {name: name, author: author};
   Project.create(newProject, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          console.log(newlyCreated);
          res.redirect("/projects");
      }
   });
});

// NEW - show form to create new task
router.get("/new",middleware.isLoggedIn, function(req, res) {
   res.render("projects/new"); 
});

// DESTROY TASK ROUTE
router.delete("/:id", middleware.checkTaskOwnership, function(req, res){
    Task.findByIdAndRemove(req.params.id, function(err){
        console.log("Trying to delete" + req.params.id);
        if(err){
            res.redirect("/tasks");
        } else {
            res.redirect("/tasks");
        }
    });
});


module.exports = router;