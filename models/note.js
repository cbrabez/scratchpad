var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
   name: String,
   text: String
});

module.exports = mongoose.model("Note", noteSchema);