/**
 * Created by andycall on 15/4/16.
 */
var rblank = /[\s\']+/g;
var rfliter =  /(^[\w=]+)|(;<.*)/g;
var request = require('request');
var iconv = require('iconv-lite');
var util = require('util');


function getPlace(phone, callback) {
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
module.exports = getPlace;
getPlace(18523016284, function(dataObj){
	console.log(dataObj);
});


