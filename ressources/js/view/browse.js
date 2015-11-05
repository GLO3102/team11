define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/browse_template.html',
    'view/genres',
    'collection/genres',
    'collection/browseCollection'
], function(Backbone,_,$,Bootstrap,BrowseTemplate,GenreView,CollectionGenre,BrowseCollection){

    var BrowseView = Backbone.View.extend({
        template: _.template(BrowseTemplate),
        collection:new BrowseCollection(),
        el: $("#browse"),
        initialize:function(){
            _.bindAll(this,'render');
            var self = this;
            this.collection.bind('sync', function(){self.render();});
            //this.collection.fetch();
        },
        render: function(){
            this.$el.html(this.template({resultsCol:this.collection.toJSON()}));

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
