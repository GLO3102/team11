/**
 * Created by Timothée on 05/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/watchlist'
], function(Backbone,_,$,Bootstrap, WatchListModel){

    var WatchListCollection = Backbone.Collection.extend({},{
        url: 'http://localhost:3000/unsecure/watchlists',

        model: WatchListModel
    });
    return WatchListCollection;
});