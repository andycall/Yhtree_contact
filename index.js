/**
 * Created by andycall on 15/4/3.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var multiparty = require('multiparty');
//var util = require('util');
var router = require('./router');
var config = require('./config');
var path = require('path');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({}));
app.use(express.static(path.join(__dirname , "public")));
app.use(cookieParser());
//app.use(cookieParser());
app.use('/', router);


http.listen(config.port, function(){
    console.log('server listening at port 7890');
});
