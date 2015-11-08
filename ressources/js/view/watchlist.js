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

        collection: WatchListCollection,

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
            var that = this;
            var watchListCollection = new WatchListCollection({});
            watchListCollection.url = URL + '/watchlists';

            watchListCollection.fetch({
                success: function(data){
                    that.$el.html(that.template1({results: data.toJSON()}))

                }
            });
            this.collection = watchListCollection;
        },

        createWatchlist: function(){
            this.$el.html(this.template2({}));
        },

        newWatchlist: function(event){
            var name = $('#watchName').val();
            var owner = $('#email').val();

            var watchlistModel = new WatchlistModel({name: name, owner: owner})
            var that = this;
            watchlistModel.save("","",   {
                success: function() {
                    that.collection.add(watchlistModel);
                    that.render();
                }
            });
         },

        deleteWatchlist : function(event){
            var that = this;
            var watchlistId = $(event.target).data('id');
            var model = this.collection.get(watchlistId);
            model.destroy({
                success: function(){
                    that.collection.remove(watchlistId);
                    that.render();
                }
            });

        },

        deleteMovie : function(event) {
            var that = this;
            var movieId = $(event.target).data('id');
            var watchlistId = $(event.target).data('watchlist');
            console.log(movieId);
            //var model = this.collection.get(movieId);
            console.log(this.collection.toJSON());
           // console.log(model.toJSON());
        }
    });

    return WatchListView;
});