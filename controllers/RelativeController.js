/**
 * Created by andycall on 15/4/22.
 */

var relative = require('../analyse/relative');
var phone = require('../proxy/phone');
var _ = require('lodash');
var eventproxy = require('eventproxy');


exports.index = function(req, res) {
    res.set('Content-Type', "text/html");
    var options = {
        root: __dirname + "/../views/",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };

    res.sendFile('relative.html', options, function (err) {
        if(err) {
            res.status(err.status).end(err);
        } else {
            console.log('Sent: ', 'relative.html');
        }
    });
};

exports.findRelative = function(req, res) {
    var data = req.body,
        username = data.username;

    relative(username, function(err, obj){
        if(err){
            return res.status(404).end(err);
        }

        if(! obj.relatives || Object.keys(obj.relatives).length === 0){
          return   res.json([]);
        }

        var data = obj.relatives;
        var ep = new eventproxy();
        var response = [];

        _.each(data, function(count, name){
            console.log(count, name);
            phone.getPhoneByName(name, function(err, user){
                if(err || !user) {
                    delete data[name];
                    ep.emit('getPhone');
                    return;
                }

                response.push({
                    username : name,
                    phone : user.phone
                });
                ep.emit('getPhone');
            });
        });

        if(_.isEmpty(data)){
            res.json([]);
        }

        ep.after('getPhone', Object.keys(data).length, function(){
            res.json(response);
        });
    });

};