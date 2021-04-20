const dotenv = require('dotenv').config();
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 3000;
var routes = require('./router');

app.set('view engine', "html");

app.set('port', port);

app.use(express.json());
app.disable('x-powered-by');

app.use('/', routes);
/*
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});
*/
http.listen(port, () => {
    console.log('listening on *:3000');
});
