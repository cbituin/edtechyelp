var mongoose = require("mongoose");

// SCHEMA SETUP (NEED FOR IMPORTING FROM EDUAPPS API)
//Objects needed for import:
// name
// description
// preview_url if "", redirect google.com search:for name of edtech.
// banner_image_url


var applicationSchema = new mongoose.Schema({
	name: String,
	image: String,
	summary: String,
	url: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}]
});

module.exports = mongoose.model("Application", applicationSchema);