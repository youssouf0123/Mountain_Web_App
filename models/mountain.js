var mongoose = require("mongoose");
var comment = require("./comment")
var mountainSchema = new  mongoose.Schema({
	name : "string",
	image : "string",
	description :"string",
	comments : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "comment"
	}]
});
 module.exports = mongoose.model("mountain",mountainSchema);