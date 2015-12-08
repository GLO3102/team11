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
    'model/watchlist',
    'jqueryCookie'
], function(Backbone,_,$,Bootstrap,Movie, MovieTemplate, Utils, WatchListCollection, WatchlistModel, Cookie) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        el: '#main_container',

        idUserCurrent: $.cookie('user_id'),

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
                success:function(watchlists){
                    that.movie.fetch({
                        success: function(printMovie){
                            table.push(watchlists.toJSON());
                            table.push(printMovie.toJSON());
                            table.push(that.idUserCurrent);
                            console.log(table);
                            that.$el.html(that.template({results: table}));

                        }
                    });
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

        addToWatchlist: function(event){
            if($('#watchlist-name').is( ":hidden" )){
                    $('#watchlist-name').show();
            }
            else {
                $('#watchlist-name').hide();
            }
        },

        addWatchlist: function(){
            var that = this;
            var id = $('.radio-watch:checked').val();
            var watchlistModel = new WatchlistModel();
            watchlistModel.url = URL + '/watchlists/' + id;
            watchlistModel.fetch({
                success: function(data){
                    var json = that.movie.toJSON();
                    for(var i = 0; i < data.attributes.movies.length; i++){
                          if(data.attributes.movies[i].trackId === json.trackId){
                              $('#alert-success').hide();
                              $('#alert-danger').fadeIn();
                              return
                          }
                    }
                    data.attributes.movies.push(that.movie.toJSON());
                    data.save();
                    $('#alert-success').fadeIn();
                }
            });

        }
    });
    return MovieView;
});
