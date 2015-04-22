/**
 * Created by andycall on 15/4/22.
 */

var relative = require('../analyse/relative');


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
            res.status(404).end(err);
        }

        res.json(obj);
    });

};