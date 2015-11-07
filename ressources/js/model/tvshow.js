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
        urlRoot: URL + '/tvshows/season/',
        name : '',

        parse: function(response) {
            this.name = response.results[0].collectionCensoredName;
            return response.results[0];
        }
    });

    return TvShow;

});