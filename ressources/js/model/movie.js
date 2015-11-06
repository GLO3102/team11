/**
 * Created by Timoth�e on 02/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var Movie = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/unsecure/movies',

        parse: function(response) {
            return response.results[0];
        }
    });

    return Movie;

});