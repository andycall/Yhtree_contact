/**
 * Created by andycall on 15/4/16.
 */

var startPerson = "andy";
var Phone = require('../proxy/phone');
var EventProxy = require('eventproxy');
var _ = require('lodash');
var relative = require('../proxy/relative');


function Person(name, phones, contacts) {
    this.username = name;
    this.phone = phones;
    this.relatives = {};
    this.contacts = contacts;
}

var proxy = EventProxy.create('relative', findRelative);

Phone.getPhoneByName(startPerson, function(err, person) {
    if(err) {
        console.log(err);
    }

    var base = new Person(person.username, person.phone, person.contacts);

    proxy.emit('relative', base);

});


function findRelative(base) {

    _.each(base.contacts, function(contact) {
        Phone.getPhoneByName(contact.username, proxy.done('searchRelative'));
    });

    proxy.fail(function(err){
        throw new Error(err);
    });

    proxy.after('searchRelative', base.contacts.length, function(persons) {

        _.each(persons, function(person) {

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

        });
        relative.newAndSave(base, function(){
            console.log('relative saved');
        });
    });
}