var mongoose    = require("mongoose"),
    Application = require("./models/application"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Google Suite for Education",
        image: "https://source.unsplash.com/lUaaKCUANVI",
        summary: "This is the description section for this application. Bacon ipsum dolor amet filet mignon strip steak fatback, drumstick boudin landjaeger ball tip. Sausage beef ribs tenderloin rump ribeye cupim turducken hamburger strip steak meatloaf fatback. Shank pancetta turducken pork belly. Bresaola kevin burgdoggen, fatback doner cow porchetta bacon kielbasa.",
        url: "https://www.google.com"
    },
    {
        name: "Nearpod",
        image: "https://source.unsplash.com/T-GjUWPW-oI",
        summary: "This is the description section for this application. Bacon ipsum dolor amet filet mignon strip steak fatback, drumstick boudin landjaeger ball tip. Sausage beef ribs tenderloin rump ribeye cupim turducken hamburger strip steak meatloaf fatback. Shank pancetta turducken pork belly. Bresaola kevin burgdoggen, fatback doner cow porchetta bacon kielbasa.",
        url: "https://www.nearpod.com"
    },
    {
        name: "Flipgrid",
        image: "https://source.unsplash.com/Z2ImfOCafFk",
        summary: "This is the description section for this application. Bacon ipsum dolor amet filet mignon strip steak fatback, drumstick boudin landjaeger ball tip. Sausage beef ribs tenderloin rump ribeye cupim turducken hamburger strip steak meatloaf fatback. Shank pancetta turducken pork belly. Bresaola kevin burgdoggen, fatback doner cow porchetta bacon kielbasa.",
        url: "https://www.flipgrid.com"
    }
    ];


function seedDB(){
    
    //Removing all the applications
    Application.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed applications!");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few applications
            data.forEach(function(seed){
                Application.create(seed, function(err, application){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added an application!");
                        //create a comment
                        Comment.create(
                            {
                                text: "I really love this application! I use it everday, and the kids love it too!",
                                author: "Awesome 6th Grade Teacher"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    application.comments.push(comment);
                                    application.save();
                                    console.log("created a new comment!");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;