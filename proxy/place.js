/**
 * Created by andycall on 15/4/15.
 */

var model = require('../models');
var Place = model.Place;
var analyse = require('../analyse/place');
var _ = require('lodash');

exports.getPlaceByPhone = function(phone, callback) {
    //analyse(phone, callback);
    Place.findOne({'telString' : phone}, callback);
};

exports.savePhone = function(data, callback) {
    var phones = [];

    phones.push(data.phone);

    _.each(data.contacts, function(value) {
        phones.push(value.phones);
    });

    _.each(phones, function(phone) {
        analyse(phone, function(obj){
            exports.getPlaceByPhone(phone, function(phone){

                if(phone && phone.length > 0) return;
                var place = new Place();

                _.assign(place, obj);

                place.save(callback);
            });
        });
    });
};
