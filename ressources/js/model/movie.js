/**
 * Created by Timoth?e on 02/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var Movie = Backbone.Model.extend({
        urlRoot: URL + '/movies',
        name : '',

        parse: function(response) {
            this.name = response.results[0].trackName;
            return response.results[0];
        }
    });

    return Movie;

});