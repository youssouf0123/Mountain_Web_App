var express = require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comment");
var mountain = require("../models/mountain");
var user = require("../models/user");
//Create comments to mountains
router.get("/mountains/:id/comments/new",isLoggedIn, function(req,res){
	mountain.findById(req.params.id,function(err,mountains){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{mountains:mountains});
		}
	})
})
//Comments on mountains
router.post("/mountains/:id/comments",isLoggedIn, function(req,res){
	mountain.findById(req.params.id,function(err,mountains){
		if(err){
			console.log(err)
		} else {
			comment.create(req.body.comment,function(err,newComment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					//Save comment
					newComment.save();
					mountains.comments.push(newComment);
					mountains.save();
					res.redirect("/mountains/" + mountains._id);
				}

			});
		}

	});
   
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};




module.exports= router;