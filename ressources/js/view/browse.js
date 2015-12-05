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
                var type ='';
                 for (var i = 0;i < 75;i++)
                 {
                     var data = resultJSON[0].results[i];
                     type = data.wrapperType;
                     if (data.wrapperType == "track")
                     {
                        title = data.trackName
                        by = data.artistName
                        shortDesc = data.longDescription;
                         if(data.longDescription!=undefined && data.longDescription.length > 80)
                             shortDesc = data.longDescription.substring(0, 80);
                        url = '#/movies/' + data.trackId;
                     }
                     else
                     {
                         title = data.artistName
                         by =data.collectionName
                         shortDesc = data.longDescription;
                         if(data.longDescription!=undefined && data.longDescription.length > 80)
                            shortDesc = data.longDescription.substring(0, 80);
                         url = '#/tvshows/seasons/' + data.collectionId
                     }
                     artworkUrl100 = data.artworkUrl100;
                     displayCol.push({
                        title:title,
                         by:by,
                         shortDesc :shortDesc,
                         url:url,
                         type:type,
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
