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
                    gapi.client.setApiKey(API_Key);
                }
            })
        },
        showTrailer: function(){
            if($('#video-trailer').is( ":hidden" )){

                gapi.client.load('youtube', 'v3').then(search);
                var self = this;
                search : function search() {

                    var q = self.movie.name + " trailer";
                    var request = gapi.client.youtube.search.list({
                        q: q,
                        part: 'snippet'
                    });

                    request.execute(function (response) {
                        var src = 'https://www.youtube.com/v/' + response.items[0].id.videoId;
                        $('#trailer').attr('src', src);
                        $('#video-trailer').show();
                    });

                }


            }

            else {
                $('#video-trailer').hide();
            }
        }
    });

    return MovieView;
});
