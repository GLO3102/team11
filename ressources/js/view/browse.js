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
        collection:BrowseCollection,
        initialize:function(){
            _.bindAll(this,'render');
        },
        render: function(){
            var self = this;
            var gSearch = BrowseCollection.extend({url: URL});

            gSearch.search('all&limit=75').done(function(results){
                var resultJSON = results.toJSON();
                var displayCol = [];
                var title = '';
                var by = '';
                var shortDesc = '';
                var url = '';
                var artworkUrl100;
                 for (var i = 0;i < 75;i++)
                 {
                     if (resultJSON[0].results[i].wrapperType == "track")
                     {
                        title = resultJSON[0].results[i].trackName
                        by = resultJSON[0].results[i].artistName
                        shortDesc = resultJSON[0].results[i].shortDescription
                        url = '#/movies/' + resultJSON[0].results[i].trackId
                     }
                     else
                     {
                         title = resultJSON[0].results[i].artistName
                         by = resultJSON[0].results[i].collectionName
                         shortDesc = ''
                         url = '#/tvshows/seasons/' + resultJSON[0].results[i].collectionId
                     }
                     artworkUrl100 = resultJSON[0].results[i].artworkUrl100;
                     displayCol.push({
                        title:title,
                         by:by,
                         shortDesc :shortDesc,
                         url:url,
                         artworkUrl100:artworkUrl100
                     });
                }
                self.$el.append(self.template({resultsCol:displayCol}));


                var moviesGenreCol = new CollectionGenre();
                moviesGenreCol.url = URL + '/genres/movies';
                var genremovie = new GenreView({el:'#listMovies',collection:moviesGenreCol});
                moviesGenreCol.fetch();


                var tvshowsGenreCol = new CollectionGenre();
                tvshowsGenreCol.url = URL + '/genres/tvshows';
                var genretvshows = new GenreView({el:'#listTVshows',collection:tvshowsGenreCol});
                tvshowsGenreCol.fetch();
            });

        }

    });

    return BrowseView;

});
