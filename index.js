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

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({}));

app.get('/', function(req, res){
    res.end('123');
});

app.post('/', function(req, res){
    return res.json(req.body);
});

app.post('/upload', function(req, res){
    var form = new multiparty.Form();

    form.parse(req, function(err, field, files){
        console.log(files);
        res.writeHead(200, {'content-type' : "text/plain"});
        res.write('upload success!');
        res.end(util.inspect({
            field : field,
            files : files
        }));
    });
});

http.listen(7890, function(){
    console.log('server listening at port 7890');
});
