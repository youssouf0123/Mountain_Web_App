var comment = require("../models/comment");
var mountain = require("../models/mountain");
var user = require("../models/user");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please login first");
	res.redirect("/login");
};


middlewareObj.ownerShip = function(req,res,next){
	if(req.isAuthenticated()){
		mountain.findById(req.params.id,function(err,mountain){
			if(err){
				console.log(err);
			} else {
				if( req.user.admin || mountain.author.id.equals(req.user._id)){
					return next();
				}
				res.redirect("/mountains");
			}
		})
	}
};

middlewareObj.CommentOwnerShip = function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,comment){
			if(err){
				console.log(err);
			} else {
				if(comment.author.id.equals(req.user._id) || req.user.admin){
					return next();
				}
				res.redirect("/mountains");
			}
		})
	}
};
module.exports = middlewareObj;