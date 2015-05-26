/**
 * Created by andycall on 15/5/26.
 */
var User = require("./models").Phone;
var fs = require('fs');

User.find({}, function(err, user){
    fs.appendFileSync('a.json', JSON.stringify(user),  {encoding : "utf-8"});
});