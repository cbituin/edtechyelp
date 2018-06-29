# edtechyelp

This application will be heavily based on the application made in the course "The Web Developer Bootcamp" by Colt Steele. 



*******************

RESTFUL ROUTES

name        url                             verb    desc.
================================================================================
INDEX       /applications                   GET     displays a list of all applications
NEW         /applications/new               GET     displays a form to add an application to the DB
CREATE      /applications                   POST    adds a new application to the DB
SHOW        /applications/:id               GET     shows information about a specific application

NEW         /applications/:id/comments/new  GET
CREATE      /applications/:id/comments      POST
