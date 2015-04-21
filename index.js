/**
 * Created by andycall on 15/4/3.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var multiparty = require('multiparty');
var util = require('util');
var router = require('./router');
var config = require('./config');


app.use(bodyParser.json({}));


app.use('/', router);

http.listen(config.port, function(){
    console.log('server listening at port 7890');
});
