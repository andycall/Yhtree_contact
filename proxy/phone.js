/**
 * Created by andycall on 15/4/11.
 */
var model = require('../models');
var Phone = model.Phone;

exports.getPhonesByName = function(names, callback) {
    if(names.length === 0) {
        return callback(null, []);
    }

    Phone.find( { username : { $in : names } }, callback);
};


exports.getPhoneByName = function(name, callback) {
    Phone.findOne({'username' : name}, callback);
};


exports.getPhoneById = function(id, callback) {
    Phone.findOne({ _id : id}, callback);
};


exports.newAndSave = function(data, callback) {
    var phone = new Phone();

    for(var i = 0, len = data.users.length; i < len ; i ++) {
        phone.users.push({
            username :  data.users[i].username,
            phones : data.users[i].phones
        });
    }

    phone.save(callback);
};