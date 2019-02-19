var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.JSON());
var path = require("path");
var ejs = require("ejs");
app.set("view engine","ejs");
var methodOverride = require("method-override");
var comment = require("./models/comment");
var user = require("./models/user");
var mountain = require("./models/mountain");
var mountainRoutes = require("./routes/mountains");
var commentRoutes = require("./routes/comments");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var seedDb = require("./seed/seed");
app.use(express.static(path.join(__dirname,"/public/")));
app.use("/css", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname,"/node_modules/jquery.3-3-2/dist")));
app.use(methodOverride("_method"));
app.use(mountainRoutes);
app.use(commentRoutes);
mongoose.connect("mongodb://localhost/yelp_mountains");










app.listen(300, function(){
	console.log("Server listen on port 300");
});
module.exports = app;