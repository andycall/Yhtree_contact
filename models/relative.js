/**
 * Created by andycall on 15/4/16.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;
var RelativeSchema = new Schema({
    contacts : [
        new Schema({
            username : String,
            phones : [String]
        }, {_id : false})
    ],
    username : String,
    phone : String,
    relatives: Object
});

mongodb.model('Relative', RelativeSchema);