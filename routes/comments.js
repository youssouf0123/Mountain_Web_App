var express = require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comment");
var mountain = require("../models/mountain");
//Create comments to mountains
router.get("/mountains/:id/comments/new",function(req,res){
	mountain.findById(req.params.id,function(err,mountains){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{mountains:mountains});
		}
	})
})
//Comments on mountains
router.post("/mountains/:id/comments",function(req,res){
	mountain.findById(req.params.id,function(err,mountains){
		if(err){
			console.log(err)
		} else {
			comment.create(req.body.comment,function(err,newComment){
				if(err){
					console.log(err);
				} else {
					mountains.comments.push(newComment);
					mountains.save();
					res.redirect("/mountains/" + mountains._id);
				}

			});
		}

	});
   
});



module.exports= router;