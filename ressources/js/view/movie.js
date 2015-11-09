/**
 * Created by Timoth?e on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/movie',
    'text!template/movie_template.html',
    'utils/utils',
    'collection/watchlist',
    'model/watchlist'
], function(Backbone,_,$,Bootstrap,Movie, MovieTemplate, Utils, WatchListCollection, WatchlistModel) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        el: '#main_container',

        events:{
            'click #addWatchlist' : 'addWatchlist'
        },
        initialize: function () {
        },

        render: function (options) {
            var table = new Array();
            var that = this;
            this.movie = new Movie({id: options.id});
            var watchlistCollection = new WatchListCollection();
            watchlistCollection.url = URL + '/watchlists';

            this.movie.fetch({
               success: function(printMovie)
            {
                watchlistCollection.fetch({
                    success:function(watchlists){
                        table.push(watchlists.toJSON());
                        table.push(printMovie.toJSON());
                        that.$el.html(that.template({results: table}));
                        Utils.searchTrailer(that.movie.name, function (src) {
                            $('#trailer').attr('src', src)
                        });
                    }
                });

            }
        });

        },
        addWatchlist: function(){
            var that = this;
            var id = $('.radio-watch:checked').val();
            var watchlistModel = new WatchlistModel();
            watchlistModel.url = URL + '/watchlists/' + id;
            watchlistModel.fetch({
                success: function(data){
                    data.attributes.movies.push(that.movie.toJSON());
                    data.save();
                }
            });

        }
    });
    return MovieView;
});
