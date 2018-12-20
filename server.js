// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
<<<<<<< HEAD
const SquareConnect = require('square-connect');
const config = require('config')

=======
const SquareConnect = require("square-connect");
const config = require("config");
>>>>>>> bebc150ab60f42329fe5502e6d2e35debb0d9d14
// Sets up the Express App
// =============================================================
var app = express();

<<<<<<< HEAD

var credentialsConfig = config.get('square');
console.log('application_ID: '+ credentialsConfig.get('applicationID') + ' personal_Access_Token: ' + credentialsConfig.get('personalAccessToken'));
=======
//Use handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
>>>>>>> bebc150ab60f42329fe5502e6d2e35debb0d9d14

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<<<<<<< HEAD

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
//require("./routes/html-routes.js")(app);
//require("./routes/order-api-routes.js")(app);
//require("./routes/post-api-routes.js")(app);

require('./routes')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
    
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
        });
});
module.exports=app;

// Static directory
app.use(express.static("public"));


=======
app.use(express.static("public"));

require("./routes/html-routes.js")(app);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});
>>>>>>> bebc150ab60f42329fe5502e6d2e35debb0d9d14
