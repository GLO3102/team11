/**
 * Created by Timoth�e on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/watchlist_template.html',
    'text!template/createWatchlist_template.html',
    'collection/watchlist',
    'model/watchlist'

], function(Backbone,_,$,Bootstrap,WatchListTemplate,WatchListCreateTemplate, WatchListCollection, WatchlistModel ) {

    var WatchListView = Backbone.View.extend({
        template1: _.template(WatchListTemplate),

        template2: _.template(WatchListCreateTemplate),

        el: '#main_container',

        events: {
            'click #new-watchlist' : 'createWatchlist',
            'click #create-watchlist' : 'newWatchlist',
            'click .delete-watchlist' : 'deleteWatchlist',
            'click .delete-movie' : 'deleteMovie'
        },

        initialize: function () {

            _.bindAll(this, 'render');

            var self = this;

            this.collection.bind('sync add remove', function () {
                self.render();

            });

        },

        render: function () {
            this.$el.html(this.template1({
                results: this.collection.toJSON()
            }));
        },

        createWatchlist: function(){
            this.$el.html(this.template2({}));
        },

        newWatchlist: function(event){
            var name = $('#watchName').val();
            var owner = $('#email').val();

            this.collection.create({
                name: name,
                owner: owner }, {
                validate: true,
                wait: true
            });
         },

        deleteWatchlist : function(event){
            var watchlistId = $(event.target).data('id');
            var model = this.collection.get(watchlistId);
            model.destroy();
            this.collection.remove(watchlistId);
        },

        deleteMovie : function(event) {
            var movieId = $(event.target).data('id');
            var watchlistId = $(event.target).data('watchlist');
            //console.log(movieId);
            var model = this.collection.get(movieId);
            console.log(this.collection.toJSON());
           // console.log(model.toJSON());
        }
    });

    return WatchListView;
});