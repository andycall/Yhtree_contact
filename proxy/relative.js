/**
 * Created by andycall on 15/4/16.
 */
var Relative = require('../models').Relative;
var _ = require('lodash');


exports.findRelativesByName = function(name, callback) {
    Relative.findOne({'username' : name}, callback);
};


exports.newAndSave = function(data, callback) {
    var relative = new Relative();
    console.log(data);
    _.assign(relative, data);

    relative.save(callback);
};