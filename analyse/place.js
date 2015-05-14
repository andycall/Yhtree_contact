/**
 * Created by andycall on 15/4/16.
 */
var rblank = /[\s\']+/g;
var rfliter =  /(^[\w=]+)|(;<.*)/g;
var request = require('request');
var iconv = require('iconv-lite');
var util = require('util');
var phoneReg = /(?:(\+86))(1\d{6,10})/;
var _ = require('lodash');
var isPhone = /\d{11}/;
var eventproxy = require('eventproxy');


function getPlace(phones, callback) {

    if(Object.prototype.toString.call(phones) !== '[object Array]'){
        phones = [phones];
    }

    phones.forEach(function(phone){
        if(phone && phone.indexOf('+86') >= 0){
            phone = phoneReg.exec(phone)[2];
        }

        if(isPhone.test(phone)){
            request({
                url : 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=' + phone,
                encoding : "base64"
            }, function(err, response, body){
                if( ! err && response.statusCode === 200) {
                    var str = iconv.decode(new Buffer(body, 'base64'), 'GBK');
                    var obj = {};
                    str.replace(rblank, '').split('=')[1].split(/[}\{]/)[1].split(',').map(function(value) {
                        obj[value.split(':')[0]] = value.split(':')[1];
                    });
                    callback(obj);
                }
            });
        }
    });

}
exports.getPlace = getPlace;


