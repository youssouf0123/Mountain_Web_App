var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
	username : String,
	password : String,
	admin : {
		type : Boolean,
		default : false
	},
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user",userSchema);