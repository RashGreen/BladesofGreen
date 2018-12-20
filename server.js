// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
const SquareConnect = require('square-connect');
const config = require('config')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


var credentialsConfig = config.get('square');
console.log('application_ID: '+ credentialsConfig.get('applicationID') + ' personal_Access_Token: ' + credentialsConfig.get('personalAccessToken'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


