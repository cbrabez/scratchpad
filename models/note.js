var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
   name: String,
   text: String,
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
   }
});

module.exports = mongoose.model("Note", noteSchema);