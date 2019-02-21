var mongoose = require("mongoose");
var comment = require("./comment")
var mountainSchema = new  mongoose.Schema({
	name : "string",
	image : "string",
	description :"string",
	author : {
		id : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "user"
		},
		username : String
	},
	comments : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "comment"
	}]
});
 module.exports = mongoose.model("mountain",mountainSchema);