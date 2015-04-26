/**
 * Created by andycall on 15/4/8.
 */
var fs = require('fs');
var phone = require('../proxy/phone');
var place = require('../proxy/place');
var eventproxy = require('eventproxy');
var config = require('../config');

exports.get = function(req, res) {
    res.set('Content-Type', "text/html");
    var options = {
        root: __dirname + "/../views/",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };

    res.sendFile('index.html', options, function (err) {
        if(err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent: ', 'index.html');
        }
    });
};

exports.post = function(req, res) {
    var users = req.body.contacts;
    var ep = new eventproxy();
    var username = req.body.username;
    var hostname = req.hostname;
    var port = config.port;
    console.log(req.body);


    if(users.length === 0) {
       return res.state(404).end();
    }

    ep.fail(function(err){
        console.log(err);
        return res.status(404).json(err);
    });

    place.savePhone(req.body, ep.done('placeSave'));
    phone.newAndSave(req.body, ep.done('phoneSave'));

    ep.all('phoneSave', 'placeSave' , function(){
        res.status(200).json({
            'url' : 'http://' + hostname + ":" + port + "/showData#" + username
        });
    });
};

