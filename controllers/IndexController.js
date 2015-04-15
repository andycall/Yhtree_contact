/**
 * Created by andycall on 15/4/8.
 */
var fs = require('fs');
var phone = require('../proxy/phone');


exports.get = function(req, res) {
    res.set('Content-Type', "text/html");
    var options = {
        root: __dirname + "../views/",
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

    if(users.length === 0) {
       return res.state(404).end();
    }

    phone.newAndSave(req.body, function(err) {
        console.log('save complete!');
    });

    return res.status(200).end();
};
