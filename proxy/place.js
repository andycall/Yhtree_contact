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

exports.getPlaceByName = function(username, callback){
    Place.findOne({'username' : username}, callback);
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

function _getBest(places, datas, dataTarget){
    var data = {},
        target = {},
        placeCount = places.length,
        percentage;

    places = _.compact(places);

    _.each(datas, function(data) {
        target[data] = 0;
    });


    _.each(places, function(place) {
        if(! target[place[dataTarget]]) {
           target[place[dataTarget]] = 0;
        }

        target[place[dataTarget]] ++;
    });

    _.each(target, function(count, name) {
        percentage = count / placeCount;
        var flag = false;

        _.each(datas, function(provinceName){
            if(provinceName.indexOf(name) >= 0){
                name = provinceName;
                flag = true;
            }
        });

        if(flag){
            data[name] = percentage;
        }
    });

    return data;
}


exports.getBestPlace = function(places) {
    return _getBest(places, ['北京市','上海市','天津市','重庆', '内蒙古自治区','新疆维吾尔自治区','宁夏回族自治区','广西壮族自治区','西藏自治区', '黑龙江省','吉林省','辽宁省','河北省','河南省','山东省','山西省','湖南省','湖北省','安徽省','江苏省','浙江省','福建省','江西省','广东省','海南省','贵州省','云南省','四川省','陕西省','青海省','甘肃省','台湾省'], 'province');
};

exports.getBestISP = function(places) {
    return _getBest(places, ['中国移动', '中国电信', '中国联通'], 'catName');
};

exports.savePhone = function(data, callback) {
    var contacts = [],
        ep = new EventProxy(),
        username = data.username;

    contacts.push({
        username : username,
        phone : data.phone
    });

    _.each(data.contacts, function(value) {
        contacts.push({
            username : value.username,
            phone : value.phones
        });
    });

    _.each(contacts, function(contact) {
        analyse(contact.phone, function(obj){
            exports.getPlaceByPhone(contact.phone, function(err, phone){
                if(err) {
                    console.log(err);
                }
                if(phone && phone.length > 0) return;

                var place = new Place();
                obj.username = contact.username;
                _.assign(place, obj);
                place.save(ep.done('getPhone'));
            });
        });
    });
    ep.fail(function(err) {
        callback(err);
    });
    ep.after('getPhone', contacts.length, function(){
        console.log(123);
        callback(null);
    });
};