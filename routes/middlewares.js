var mongoose = require("mongoose");
var passport = require("passport");
var comment = require("../models/comment");
var mountain = require("../models/mountain");
var user = require("../models/user");
var express = require("express");
var router = express.Router();
// Sign up Routes
router.get("/register",function(req,res){
	res.render("register")
});
router.post("/register",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var admin = req.body.adminCode;
	var newUser = new user({username : username , admin : admin});
	if(req.body.adminCode == process.env.admin){
		newUser.admin = true;
	};
	user.register(newUser,password,function(err,user){
		if(err){
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/mountains");
		})
	})

});
// login Routes
router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	successRedirect : "/mountains",
	failureRedirect : "/login"
}),function(req,res){

});

//logout Route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/mountains");
});






module.exports= router;