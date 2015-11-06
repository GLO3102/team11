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
    'utils/utils'
], function(Backbone,_,$,Bootstrap,Movie, MovieTemplate, Utils) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),
        el: '#main_container',

        events:{
            "click #btn-trailer": "showTrailer"
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
                    googleApiClientReady();
                }
            })
        },
        showTrailer: function(){
            if($('#video-trailer').is( ":hidden" )){
                // Search for a specified string.
                var that=this;
                function search() {

                    var q = that.movie.name + " trailer";
                    if(gapi.client.youtube == undefined){
                        $('#login-container').show();
                    }else {
                        var request = gapi.client.youtube.search.list({
                            q: q,
                            part: 'snippet'
                        });

                        request.execute(function (response) {
                            var str = JSON.stringify(response.result);
                            document.getElementById("trailer").src = 'https://www.youtube.com/v/' + response.items[0].id.videoId;
                        });


                        $('#video-trailer').show();
                        $('html, body').animate({
                            scrollTop: $("#video-trailer").offset().top
                        }, 1000);
                    }
                }

                search();
            }

            else {
                $('#video-trailer').hide();
            }
        }
    });

    return MovieView;
});
