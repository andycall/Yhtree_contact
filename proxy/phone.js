/**
 * Created by andycall on 15/4/11.
 */
var model = require('../models');
var Phone = model.Phone;

exports.getPhonesByName = function(name, callback) {
    if(names.length === 0) {
        return callback(null, []);
    }

    Phone.find( { username : { $in : names } }, callback);
};


exports.getPhoneByName = function(name, callback) {
    Phone.findOne({'username' : name}, callback);
};

exports.getNameByPhone = function(phone, callback) {
    Phone.findOne({'phone': phone}, callback);
};

exports.getPhoneById = function(id, callback) {
    Phone.findOne({ _id : id}, callback);
};


exports.newAndSave = function(data, callback) {
    var phone = new Phone();

    phone.username = data.username;

    for(var i = 0, len = data.contacts.length; i < len ; i ++) {
        phone.contacts.push({
            username :  data.contacts[i].username,
            phones : data.contacts[i].phones
        });
    }

    phone.save(callback);
};