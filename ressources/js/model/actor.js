define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var Actor = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/actors',

        parse: function(response) {
            return response.results[0];
        }
    });


    return Actor;

});
