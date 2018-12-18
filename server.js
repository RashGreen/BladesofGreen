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

// Requiring our models for syncing
// var db = require("./models");
var credentialsConfig = config.get('square');
console.log('name: '+ credentialsConfig.get('name') +'password: ' + credentialsConfig.get('password'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
    
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    })
});
module.exports=app;
// Static directory
app.use(express.static("public"));

