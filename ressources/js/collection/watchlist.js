/**
 * Created by Timothée on 05/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/WatchList'
], function(Backbone,_,$,Bootstrap, WatchListModel){

    var WatchListsCollection = Backbone.Collection.extend({},{
        url: 'http://localhost:3000/unsecure/watchlists/',

        model: WatchListModel,

        parse: function(response){
            response.name;
        }

    });
    return WatchListsCollection;
});