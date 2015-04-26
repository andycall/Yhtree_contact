/**
 * Created by andycall on 15/4/25.
 */


exports.show = function(req, res) {
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

