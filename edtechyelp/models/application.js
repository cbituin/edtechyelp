var mongoose = require("mongoose");

var applicationSchema = new mongoose.Schema({
	name: String,
	image: String,
	summary: String,
	url: String
});

module.exports = mongoose.model("Application", applicationSchema);