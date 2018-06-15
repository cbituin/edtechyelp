var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var applications = [
		{name: "App # 1", image: "https://source.unsplash.com/hes6nUC1MVc"},
		{name: "App # 2", image: "https://source.unsplash.com/hes6nUC1MVc"},
		{name: "App # 3", image: "https://source.unsplash.com/hes6nUC1MVc"}
	]
	

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/applications", function(req, res){
	res.render("applications", {applications: applications});
});

app.post("/applications", function(req, res){
    //get data from form and add to applications array.
    var name = req.body.name;
    var image = req.body.image;
    var newApplication = {name: name, image: image};
    applications.push(newApplication);
    //redirect back to applications page
    res.redirect("/applications");
});

app.get("/applications/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});