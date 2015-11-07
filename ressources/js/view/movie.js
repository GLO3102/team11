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
            'click #add-to-watchlist' : 'addToWatchlist'
        },
        initialize: function () {
        },

        render: function (options) {
            var that = this;
            this.movie = new Movie({id: options.id});
            this.movie.fetch({
                success: function(printMovie){
                    that.$el.html(that.template({results:printMovie.toJSON()}))
                    $('#video-trailer').hide();

                }
            })
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

        }
    });

    return MovieView;
});
