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
        model: WatchListModel
    });
    return WatchListCollection;
});