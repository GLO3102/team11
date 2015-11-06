/**
 * Created by Timoth�e on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/movie',
    'text!template/movie_template.html',
    'utils/utils'
], function(Backbone,_,$,Bootstrap,Movie, MovieTemplate, Utils) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        model: Movie,
        el: '#main_container',
        events:{
            "click #btn-trailer": "showTrailer"
        },
        initialize: function () {
        },

        render: function (options) {
            var that = this;
            var movie = new Movie({id: options.id});
            movie.fetch({
                success: function(printMovie){
                    that.$el.html(that.template({results:printMovie.toJSON()}))
                    $('#video-trailer').hide();
                }
            })
        },
        showTrailer: function(){
            if($('#video-trailer').is( ":hidden" )){
                $('#video-trailer').show();
                $('html, body').animate({
                    scrollTop: $("#video-trailer").offset().top
                }, 1000);

                var src = Utils.searchTrailer('Birdman');
                $('#trailer').src = src;
            }

            else {
                $('#video-trailer').hide();
            }
        }
    });

    return MovieView;
});