var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/applications", function(req, res){
	
	//need to replace template applications with data from eduappcenter.com API
	//https://www.eduappcenter.com/api/v1/lti_apps
	var applications = [
		{name: "App # 1", image: "https://source.unsplash.com/hes6nUC1MVc"},
		{name: "App # 2", image: "https://source.unsplash.com/hes6nUC1MVc"},
		{name: "App # 3", image: "https://source.unsplash.com/hes6nUC1MVc"}
	]
	
	res.render("applications", {applications: applications});
} );

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
})