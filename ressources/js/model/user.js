/**
 * Created by Timothee on 02/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var User = Backbone.Model.extend({
        urlRoot: URL + '/users',
        defaults: {
            name:'User',
            email: 'user@umovie.com',
            id:''
        }
    });

    return User;

});