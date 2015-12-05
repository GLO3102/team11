define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/genres_Template.html',
    'text!template/display_genres_Template.html',
    'collection/genresCollection',
], function (Backbone, _, $, Bootstrap, GenreTemplate, DiplayGenresTemplate, GenresCollection) {

    var GenreView = Backbone.View.extend({
        template: _.template(GenreTemplate),
        el: '#browse_genre',
        initialize:function(){
            //_.bindAll(this,'render');
            // var self = this;
            //this.collection.bind('sync', function(){self.render();});
        },
        render: function(){
            this.$el.html(this.template);


            var moviesGenreCol = new GenresCollection();
            moviesGenreCol.url = URL + '/genres/movies';
            var templateMovie = _.template(DiplayGenresTemplate);
            moviesGenreCol.fetch().done(function () {
                $('#listMovies').html(templateMovie({genres: moviesGenreCol.toJSON(), type: 'movies'}));
            });

            var tvshowsGenreCol = new GenresCollection();
            tvshowsGenreCol.url = URL + '/genres/tvshows';
            var templateTvShow = _.template(DiplayGenresTemplate);
            tvshowsGenreCol.fetch().done(function () {
                $('#listTVshows').html(templateTvShow({genres: tvshowsGenreCol.toJSON(), type: 'tvshows/seasons'}));
            });
        }

    });
    return GenreView;
});

