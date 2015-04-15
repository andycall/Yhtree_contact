/**
 * Created by andycall on 15/4/15.
 */

var mongodb = require('mongodb');
var Schema = mongodb.Schema;

var placeSchema = new Schema({

});

mongodb.model('Place', placeSchema);