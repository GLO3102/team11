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
    'collection/watchlist'
], function(Backbone,_,$,Bootstrap,Movie, MovieTemplate, Utils, WatchListCollection) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        el: '#main_container',

        events:{
            "click #btn-trailer": "showTrailer",
            'click #add-to-watchlist' : 'addToWatchlist',
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
            watchlistCollection.fetch({
                success: function(watchlists){
                    table.push({watchlist : watchlists});

                }
            });
            this.movie.fetch({
                success: function(printMovie){
                    table.push({movie: printMovie});
                    console.log(table);
                    that.$el.html(that.template({results:table}));

                }
            });

        },
        showTrailer: function(){
            if($('#video-trailer').is( ":hidden" )){
                Utils.searchTrailer(this.movie.name,function(src){
                    $('#trailer').attr('src', src)
                    $('#video-trailer').show()});
            }
            else {
                $('#video-trailer').hide();
            }
        },

        addToWatchlist: function(){
            if($('#watchlist-name').is( ":hidden" )){
                Utils.searchTrailer(this.movie.name,function(src){
                    $('#watchlist-name').attr('src', src)
                    $('#watchlist-name').show()});
            }
            else {
                $('#watchlist-name').hide();
            }
        },

        addWatchlist: function(){
            var that = this;
            var id = $('.radio-watch:checked').val();
            var watchlistCollection = new WatchListCollection();
            watchlistCollection.url = URL + '/watchlists/' + id;
            watchlistCollection.fetch({
                success: function(data){

                }
            })
        }
    });

    return MovieView;
});
