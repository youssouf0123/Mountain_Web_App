var mongoose = require("mongoose");
var comment = require("../models/comment");
var mountain = require("../views/mountains")


function seedDB(){
	
	/*mountains.forEach(function(seed){
		mountains.create(seed,function(err,mountain){
			if(err){
				console.log(err);
			}else{
				comment.create({
					author : "Youssouf",
					text : "This is a great mountains"
				}, function(err,newComment){
					if(err){
						console.log(err)
					} else {
						mountain.comments.push(newComment);
						mountain.save();
						console.log(mountain);
						console.log("new comment created");
					}
				})

			}
		})
	})*/
}
module.exports = seedDB;