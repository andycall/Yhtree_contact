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

exports.getBestPlace = function(places) {
    var data = {},
        provinces = {},
        placeCount = places.length,
        percentage;

    for(var i = 1; i <= 10; i ++) {
        data[i + "0%"] = [];
    }

    _.each(places, function(place) {
        if(! provinces[place.province]){
            provinces[place.province] = 0;
        }
        provinces[place.province] ++;
    });

    _.each(provinces, function(provinceCount, provinceName){
        percentage = provinceCount / placeCount;

        data[+percentage.toString().substring(0,3)*100 + "%"].push(provinceName);
    });

    return data;
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
