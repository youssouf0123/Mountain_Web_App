var express = require("express");
var router = express.Router();
var comment = require("../models/comment");
var mountain = require("../models/mountain");
var user = require("../models/user");
var middlewareObj = require("../Middleware/auth");
//Home page
router.get("/",function(req,res){
	res.render("home");
})
//Find all the mountains
router.get("/mountains",function(req,res){
	mountain.find({},function(err,allmountains){
		if(err){
			console.log(err);
		}else{
			res.render("mountains", {mountains : allmountains});
		}
	})
});

//Request form to create new mountains
router.get("/mountains/new",middlewareObj.isLoggedIn,function(req,res){
	res.render("new");
});
// Create new mountains Requested
router.post("/mountains",middlewareObj.isLoggedIn, function(req,res){
	var image = req.body.image;
	var name = req.body.name;
	var desc = req.body.desc
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	var newMountains = { name : name , image : image, description : desc , author : author};
	mountain.create(newMountains,function(err,newlycreate){
		if(err){
			console.log(err);
		}else{
			
			console.log(newlycreate);
			res.redirect("/mountains");
		}
	});
});
	//Show this mountain 
router.get("/mountains/:id",function(req,res){
	mountain.findById(req.params.id).populate("comments").exec(function(err,foundMount){
		if(err){console.log(err);} else{
			res.render("show",{mountains : foundMount});
		}
	})
})
// Request form to update mountains
router.get("/mountains/:id/edit",middlewareObj.ownerShip, function(req,res){
 	mountain.findById(req.params.id,function(err,foundMount){
 		if(err){
 			res.redirect("back");
 			console.log(err);
 		} else {
 			res.render("edit",{mountains : foundMount})
 		}
 	})
 });
// Update mountains Requested
router.put("/mountains/:id",middlewareObj.ownerShip,function(req,res){
	var image = req.body.image;
	var name = req.body.name;
	var desc = req.body.desc
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	mountain.findByIdAndUpdate(req.params.id,{$set:{name:name, image:image, description : desc}},function(err,updateMount){
		if(err){
			res.redirect("back");
			console.log(err)
		} else {
			res.redirect("/mountains/"+req.params.id);
		}
	})
})
// Delete mountains
router.delete("/mountains/:id",middlewareObj.ownerShip, function(req,res){
	var image = req.body.image;
	var name = req.body.name;
	var desc = req.body.desc
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	mountain.findByIdAndRemove(req.params.id,{$set:{name:name, image:image, author : author, description : desc}},function(err,deleteMount){
		if(err){
			res.redirect("back");
			console.log(err);
		} else {
			res.redirect("/mountains");
		}
	})
});




module.exports = router;