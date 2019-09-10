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
var middlewareRoutes = require("./routes/middlewares");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var seedDb = require("./seed/seed");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var session = require("express-session");
app.use(express.static(path.join(__dirname,"/public/")));
app.use("/css", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname,"/node_modules/jquery.3-3-2/dist")));
app.use(methodOverride("_method"));
mongoose.connect("mongodb+srv://youssouf:youssouf@cluster0-mua3r.mongodb.net/test?retryWrites=true&w=majority");
//Passport Config
app.use(session({
	secret : "I love coding",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user || null;
	next();
});
app.use(mountainRoutes);
app.use(commentRoutes);
app.use(require("./routes/middlewares"));


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};









app.listen(300, function(){
	console.log("Server listen on port 300");
});
module.exports = app;