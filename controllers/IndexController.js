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
if(users.indexOf("%") >= 0){
    users = encodeURI(users);
}
console.log(users);
    var ep = new eventproxy();
    var username = req.body.username;
    var hostname = req.hostname;
    var port = config.port;

    //console.log(JSON.stringify(req.body));

    ep.fail(function(err){
        console.log(err);
        // return res.status(404).json(err);
    });

    phone.newAndSave(req.body, ep.done('phoneSave'));

    if(users.length === 0) {
        return  res.status(200).json({
            'url' : 'http://' + hostname + ":" + port + "/showData#" + username
        });
    }

    place.savePhone(req.body, ep.done('placeSave'));
    ep.all('phoneSave' , function(){
        console.log('upload success');
        res.status(200).json({
            'url' : 'http://' + hostname + ":" + port + "/showData#" + username
        });
    });
};

exports.findCare = function(req, res){
    var str = '[{"_id":"5564735161cd2def0d412fd3","phone":"18255793420","username":"蔡若凡","__v":0,"contacts":[{"username":"邓雪松","phones":["18055523219"]}]},{"_id":"556473ef2e58cd260e3ecdd2","phone":"18883284812","username":"刘人豪","__v":0,"contacts":[]},{"_id":"556474282e58cd260e3ecdd3","phone":"15309648366","username":"春红","__v":0,"contacts":[]},{"_id":"556474672e58cd260e3ecdd4","phone":"18055523219","username":"邓雪松","__v":0,"contacts":[]},{"_id":"556474982e58cd260e3ecdd5","phone":"13956855430","username":"陈继胜","__v":0,"contacts":[]}]';
    res.json(JSON.parse(str));
};