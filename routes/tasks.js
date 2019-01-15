var express = require("express");
var moment = require("moment");
var router = express.Router();
var Task = require("../models/task");
var Project = require("../models/project")
var middleware = require("../middleware");

// INDEX - show all tasks
router.get("/",middleware.isLoggedIn, function(req, res){
    // Get all tasks from DB
    Task.find({}, function(err, allTasks){
        if(err){
            console.log(err);
        } else {
            Project.find({}, function(err, allProjects){
                if(err){
                    console.log(err);
                } else{
                    res.render("tasks/index", {tasks: allTasks, projects: allProjects, moment: moment});    
                }
            })
            
            };
    }); 
});

// EDIT TASK ROUTE
router.get("/:id/edit", function(req, res) {
            Task.findById(req.params.id, function(err, foundTask){
                res.render("tasks/edit", {task: foundTask});
            });
});

// UPDATE Task ROUTE
router.put("/:id", function(req, res){
    console.log("YOU HIT THE UPDATE ROUTE");
    var name = req.body.name;
    var project = {
        id: req.body.pId,
        projectname: req.body.pName
    };
    var dueDate = req.body.dueDate
    var author = {
       id: req.user._id,
       username: req.user.username
   };
   
   var newTask = {name: name, project: project, dueDate: dueDate, author: author, moment: moment};
   
    // find and update correct task
    Task.findByIdAndUpdate(req.params.id, newTask, function(err, updatedTask){
        if(err){
            res.redirect("/");
            console.log(req.body.task);
        } else {
            res.redirect("/tasks");
            console.log(req.params.id);
            console.log(newTask);
        }
    });
});

// CREATE - add new task to DB
router.post("/",middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   //var content = req.body.content;
   var project = {
       id: req.body.pId,
       name: req.body.pName
   };
   var dueDate = moment(Date, "DD MM YYYY");
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newTask = {name: name, project: project, dueDate: dueDate, author: author};
   Task.create(newTask, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          console.log(newlyCreated);
          res.redirect("/tasks");
      }
   });
});

// NEW - show form to create new task
router.get("/new",middleware.isLoggedIn, function(req, res) {
   res.render("tasks/new"); 
});

// DESTROY TASK ROUTE
router.delete("/:id", function(req, res){
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