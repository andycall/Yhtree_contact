/**
 * Created by andycall on 15/4/16.
 */
var Phone = require('../proxy/phone');
var EventProxy = require('eventproxy');
var _ = require('lodash');
var Relative = require('../proxy/relative');


function Person(name, phones, contacts) {
    this.username = name;
    this.phone = phones;
    this.relatives = {};
    this.contacts = contacts;
}

function getUserData(startPerson, callback){
    var proxy = new EventProxy();

    Relative.findRelativesByName(startPerson, function(err, relative) {
        if(err || relative){
            callback(null, relative);
        }
        else{
            Phone.getPhoneByName(startPerson, function(err, person) {
                if(err) {
                    callback(err);
                } else if(!person) {
                    callback("No such person!");
                }

                var base = new Person(person.username, person.phone, person.contacts);

                _.each(base.contacts, function(contact) {
                    Phone.getPhoneByName(contact.username, proxy.done('searchRelative'));
                });

                proxy.fail(function(err){
                    callback(err);
                });

                proxy.after('searchRelative', base.contacts.length, function(persons) {

                    _.each(persons, function(person) {

                        if(person){
                            _.each(person.contacts, function(relative) {
                                var username = relative.username;
                                if( username === startPerson){
                                    return;
                                }

                                if( ! base.relatives[username] ) {
                                    base.relatives[username] = 0;
                                }

                                base.relatives[username] ++;
                            });
                        }
                    });

                    Relative.newAndSave(base, function(err){
                        if(err){
                            callback(err);
                        }
                        else{
                            callback(null, base);
                        }
                    });
                });
            });
        }
    });

}

module.exports = getUserData;