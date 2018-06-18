var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose");

mongoose.connect("mongodb://localhost/edtechyelp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var applicationSchema = new mongoose.Schema({
	name: String,
	image: String,
	summary: String,
	url: String
});

var Application = mongoose.model("Application", applicationSchema);

// Application.create(
// 			{name: "App # 2", image: "https://source.unsplash.com/hes6nUC1MVc", summary: "App description.", url: "App url."}
// , function(err, application){
// 		if(err){
// 			console.log("There's an error!")
// 		} else {
// 			console.log("Newly create campground: ")
// 			console.log(application)
// 		}
// 	});

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/applications", function(req, res){
	//Get all applications from DB
	Application.find({}, function(err, allApplications){
		if(err){
			console.log(err);
		} else {
			res.render("index", {applications:allApplications});
		}
	});
});

app.post("/applications", function(req, res){
    //get data from form and add to applications array.
    var name = req.body.name;
    var image = req.body.image;
    var summary = req.body.summary;
    var url = req.body.url;
    var newApplication = {name: name, image: image, summary: summary, url: url};
    // Create a new application and save to DB 
       Application.create(newApplication, function(err, newlyCreated){
    	if(err){
    		console.log(err);
    	} else {
    		res.redirect("applications");
    	}
    });
});

app.get("/applications/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/applications/:id", function(req, res){
	//find the application with the provided id
	Application.findById(req.params.id, function(err, foundApplication){
		if(err){
			console.log(err);
		}	else {
			res.render("show", {application: foundApplication});
		}
	});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});