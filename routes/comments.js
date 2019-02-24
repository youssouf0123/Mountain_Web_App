var express = require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comment");
var mountain = require("../models/mountain");
var user = require("../models/user");
var middlewareObj = require("../Middleware/auth");
//Create comments to mountains
router.get("/mountains/:id/comments/new",middlewareObj.isLoggedIn, function(req,res){
	mountain.findById(req.params.id,function(err,mountains){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{mountains:mountains});
		}
	})
})
//Comments on mountains
router.post("/mountains/:id/comments",middlewareObj.isLoggedIn, function(req,res){
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
router.get("/mountains/:id/comments/:comment_id/edit",middlewareObj.CommentOwnerShip,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
		} else {
			console.log(foundComment);
			res.render("comments/edit", {comment : foundComment, mountains_id : req.params.id})
		}
	})
});
router.put("/mountains/:id/comments/:comment_id",middlewareObj.CommentOwnerShip,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back")
		} else {
			res.redirect("/mountains/"+req.params.id);
		}
	})
});
router.delete("/mountains/:id/comments/:comment_id",middlewareObj.CommentOwnerShip,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,req.body.comment,function(err,deleteComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			console.log(deleteComment);
			res.redirect("/mountains/"+req.params.id)
		}
	})
})




module.exports= router;