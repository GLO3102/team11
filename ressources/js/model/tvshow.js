/**
 * Created by Manuel on 04/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var TvShow = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/unsecure/tvshows/season/',

        parse: function(response) {
            return response.results[0];
        }
    });

    return TvShow;

});