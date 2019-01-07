var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
    name: String,
    //content: String,
    author: {
         id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
         },
         username: String
    }
 });

module.exports = mongoose.model("Project", projectSchema);