/**
 * Created by andycall on 15/4/15.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;

var placeSchema = new Schema({
    username : String,
    mts: String,
    province: {
        type : String
    },
    catName: String,
    telString: {
        type : String,
        index : {
            unique : true
        }
    },
    areaVid: String,
    ispVid: String,
    carrier: String
});

placeSchema.pre('save', function(next, done){
    mongodb.model('Place').findOne({ telString : this.telString }, 'telString', function(err, tel) {
        if(err){
            done(err);
        } else if(!tel) {
            next();
        } else {
            done();
        }
    });
});

mongodb.model('Place', placeSchema);