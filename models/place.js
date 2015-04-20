/**
 * Created by andycall on 15/4/15.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;

var placeSchema = new Schema({
    mts: String,
    province: String,
    catName: String,
    telString: String,
    areaVid: String,
    ispVid: String,
    carrier: String
});

mongodb.model('Place', placeSchema);