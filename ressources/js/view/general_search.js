define([
'backbone',
'underscore',
'jquery',
'bootstrap',
'text!template/search_results_Template.html'
], function(Backbone,_,$,Bootstrap,GSTemplate){

var General_SearchView = Backbone.View.extend({
    template: _.template(GSTemplate),
    el: "#browseContainer",
    events:{
        'click #addWatchlist' : 'addWatchlist'
    },
    render: function(){
            var resultJSON = this.collection.toJSON();
            var displayCol = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var type ='';
            var id='';
        if (typeof (resultJSON[0].results) != "undefined") {
            for (var i = 0; i < resultJSON[0].results.length; i++) {
                var data = resultJSON[0].results[i];
                id = data.trackId;
                type = data.wrapperType;

                if (data.wrapperType == "track") {
                    title = data.trackName
                    by = data.artistName
                    shortDesc = data.longDescription;
                    if (data.longDescription != undefined && data.longDescription.length > 80)
                        shortDesc = data.longDescription.substring(0, 80);
                    url = '#/movies/' + data.trackId;
                }
                else if (data.wrapperType == "artist") {
                    title = data.artistName
                    by = data.primaryGenreName
                    url = '#/actors/' + data.artistId;
                }
                else {
                    title = data.artistName
                    by = data.collectionName
                    shortDesc = data.longDescription;
                    if (data.longDescription != undefined && data.longDescription.length > 80)
                        shortDesc = data.longDescription.substring(0, 80);
                    url = '#/tvshows/seasons/' + data.collectionId
                }
                artworkUrl100 = resultJSON[0].results[i].artworkUrl100;
                displayCol.push({
                    title: title,
                    by: by,
                    shortDesc: shortDesc,
                    url: url,
                    artworkUrl100: artworkUrl100,
                    type: type,
                    trackId:id,
                });
            }

        }
        else {
            for (var i = 0; i < resultJSON.length; i++) {
                var data = resultJSON[i];
                id = data.id;
                type = 'user';
                title = data.name
                by = data.email
                url = '#/users/' + id;
                artworkUrl100 = 'http://www.omprakashsharma.com/images/Default.gif';//resultJSON[i].artworkUrl100;
                displayCol.push({
                    title: title,
                    by: by,
                    shortDesc: shortDesc,
                    url: url,
                    artworkUrl100: artworkUrl100,
                    type: type,
                    trackId: id,
                });
            }
        }
        this.$el.html(this.template({results:displayCol}));
    },
    addWatchlist: function(){
        var that = this;
        var id=$('#idOfMovie').html();
        /*

        A TOI DE VOIR SI T'AS BESOIN DE CA

        var id = $('.radio-watch:checked').val();
        var watchlistModel = new WatchlistModel();
        watchlistModel.url = URL + '/watchlists/' + id;
        watchlistModel.fetch({
            success: function(data){
                var json = that.movie.toJSON();
                for(var i = 0; i < data.attributes.movies.length; i++){
                    if(data.attributes.movies[i].trackId === json.trackId){
                        $('#alert-success').hide();
                        $('#alert-danger').fadeIn();
                        return
                    }
                }
                data.attributes.movies.push(that.movie.toJSON());
                data.save();
                $('#alert-success').fadeIn();
            }
        });

        */


        /* PLACE CES LIGNES QUAND LE FORMULAIRE SERA VALIDE
        * Le bouton doit rester allum� tant que le nombre de watchlist est >0
        */

        if(/*R�el : Nombre watchlist == 0 -- Pour les tests :*/$("#"+id).hasClass('glyphicon glyphicon-star-empty addTo'))
            $("#"+id).attr('class',"glyphicon glyphicon-star addTo");
        else
            $("#"+id).attr('class',"glyphicon glyphicon-star-empty addTo");
        $("#modalWatchlist").modal('hide');
    }

});

return General_SearchView;

});
