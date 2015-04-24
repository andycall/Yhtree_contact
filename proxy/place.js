/**
 * Created by andycall on 15/4/15.
 */

var model = require('../models');
var Place = model.Place;
var analyse = require('../analyse/place').getPlace;
var phone = require('./phone');
var EventProxy = require('eventproxy');
var _ = require('lodash');

exports.getPlaceByPhone = function(phone, callback) {
    Place.findOne({'telString' : phone}, callback);
};

exports.findRelativePlace = function(username, callback) {
    var ep = new EventProxy();

    phone.getPhoneByName(username, function(err, user) {

        var contacts = user.contacts;

        _.each(contacts, function(contact){
            _.each(contact.phones, function(phone){
                exports.getPlaceByPhone(phone, ep.done('getPlaceByPhone'));
            });
        });

        ep.fail(function(err){
            callback(err);
        });

        ep.after('getPlaceByPhone', contacts.length, function(places){
            callback(null, places);
        });
    });
};

function _getBest(places, dataSplit, dataTarget){
    var data = {},
        target = {},
        placeCount = places.length,
        percentage;

    _.each(places, function(place) {
        if(! target[place[dataTarget]]) {
           target[place[dataTarget]] = 0;
        }

        target[place[dataTarget]] ++;
    });

    _.each(target, function(count, name) {
        percentage = count / placeCount;
        var percentageString = +percentage.toString().substring(0,3)*100 + '%'

        if(! data[percentageString]){
            data[percentageString] = [];
        }
        data[percentageString].push(name);
    });

    return data;
}


exports.getBestPlace = function(places) {
    return _getBest(places, 10, 'province');
};

exports.getBestISP = function(places) {
    return _getBest(places, 3, 'catName');
};

exports.savePhone = function(data, callback) {
    var phones = [],
        ep = new EventProxy();

    phones.push(data.phone);

    _.each(data.contacts, function(value) {
        phones.push(value.phones);
    });
    _.each(phones, function(phone) {
        analyse(phone, function(obj){
            exports.getPlaceByPhone(phone, function(err, phone){
                if(err) {
                    console.log(err);
                }
                if(phone && phone.length > 0) return;

                var place = new Place();
                _.assign(place, obj);

                place.save(ep.done('getPhone'));
            });
        });
    });
    ep.fail(function(err) {
        callback(err);
    });
    ep.after('getPhone', phones.length, function(){
        callback(null);
    });
};
