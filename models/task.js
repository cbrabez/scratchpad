var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
   name: String,
   //content: String,
   project: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        name: String,
   },
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
   }
});

module.exports = mongoose.model("Task", taskSchema);