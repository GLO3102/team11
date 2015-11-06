define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/browse_template.html',
    'view/genres',
    'collection/genres',
    'collection/SearchableCollection'
], function(Backbone,_,$,Bootstrap,BrowseTemplate,GenreView,CollectionGenre,BrowseCollection){

    var BrowseView = Backbone.View.extend({
        template: _.template(BrowseTemplate),
        el: "#main_container",

        initialize:function(){
            _.bindAll(this,'render');
        },
        render: function(){
            var self = this;
            var gSearch = BrowseCollection.extend({url: 'http://localhost:3000/unsecure/'});

            gSearch.search('all&limit=20').done(function(results){
                self.$el.append(self.template({resultsCol:results.toJSON()}));
            });
            var moviesGenreCol = new CollectionGenre();
            moviesGenreCol.url ='http://localhost:3000/unsecure/genres/movies';
            var genremovie = new GenreView({el:'#listMovies',collection:moviesGenreCol});
            moviesGenreCol.fetch();


            var tvshowsGenreCol = new CollectionGenre();
            tvshowsGenreCol.url = 'http://localhost:3000/unsecure/genres/tvshows';
            var genretvshows = new GenreView({el:'#listTVshows',collection:tvshowsGenreCol});
            tvshowsGenreCol.fetch();
        }

    });

    return BrowseView;

});
