/**
 * Created by Timoth�e on 05/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/watchlist'
], function(Backbone,_,$,Bootstrap, WatchListModel){

    var WatchListCollection = Backbone.Collection.extend({},{
        url: URL + '/ewatchlists',

        model: WatchListModel
    });
    return WatchListCollection;
});