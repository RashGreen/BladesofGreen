// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
const SquareConnect = require("square-connect");
const config = require("config");
// Sets up the Express App
// =============================================================
var app = express();

//Use handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/html-routes.js")(app);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});