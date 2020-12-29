//Dependencies
const express = require("express");
const exphbs = require("express-handlebars")
const path = require("path");



//set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set Express static path
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes//require routes and call anonymous functions
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//start server
app.listen(PORT, function() {
    console.log("App listening on http://LocalHost:" + PORT);
  });


