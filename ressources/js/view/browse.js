define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/browse_template.html',
    'view/genres',
    'collection/genres'
], function(Backbone,_,$,Bootstrap,BrowseTemplate,GenreView,CollectionGenre){

    var BrowseView = Backbone.View.extend({
        el: $("#browse"),
        events:{
            "click #tabMovies": "tabMoviesGenres",
            "click #tabTVshows": "tabTVshowsGenres"
        },
        initialize:function(){
        },
        render: function(){
            this.$el.html(BrowseTemplate);

            var moviesGenreCol = new CollectionGenre({url: 'http://localhost:3000/unsecure/genres/movies'});
            var genremovie = new GenreView({el:'#listMovies'},{collection:moviesGenreCol});
            moviesGenreCol.fetch();

            var tvshowsGenreCol = new CollectionGenre({url: 'http://localhost:3000/unsecure/genres/tvshows'});
            var genretvshows = new GenreView({el:'#listTVshows'},{collection:tvshowsGenreCol});
            tvshowsGenreCol.fetch();
        },
        tabMoviesGenres: function(event){

        },
        tabTVshowsGenres: function(event){

        }

    });

    return BrowseView;

});
