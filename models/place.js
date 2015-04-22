/**
 * Created by andycall on 15/4/15.
 */

var mongodb = require('mongoose');
var Schema = mongodb.Schema;

var placeSchema = new Schema({
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
    var self = this;
    mongodb.model('Place').findOne({ telString : this.telString }, 'telString', function(err, tel) {
        if(err){
            done(err);
        } else if(tel) {
            self.invalidate('telString', "telString is exits");
            done(new Error('telString must be unique'));
        }
        else{
            done();
        }
    });

    next();
});

mongodb.model('Place', placeSchema);