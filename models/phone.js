/**
 * Created by andycall on 15/4/7.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var PhoneSchema = new Schema({
    contacts : [
        new Schema({
            username : String,
            phones : [String]
        }, {_id : false})
    ],
    username : String
    //users : [
    //    new Schema({
    //        username : String,
    //        phones : [String]
    //    }, {_id: false})
    //]
}, {_id : false});

mongodb.model('Phone', PhoneSchema);
