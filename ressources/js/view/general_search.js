define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/search_results_Template.html',
    'collection/watchlist',
    'jqueryCookie',
    'model/movie',
    'model/watchlist'
], function(Backbone,_,$,Bootstrap,GSTemplate, WatchListCollection, Cookie, Movie, WatchlistModel){

var General_SearchView = Backbone.View.extend({
    template: _.template(GSTemplate),
    el: "#browseContainer",
    events:{
        'click #addWatchlist': 'addWatchlist',
        'click #allFilter': 'allGenre',
        'click .genreFilter': 'filterByGenre'
    },
    render: function(){
        var that = this;
            var resultJSON = this.collection.toJSON();
            var displayCol = [];
        var genreFilter = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var type ='';
            var id='';
        var pushGenreIfNotExist = function (val) {
            if (typeof(val) == 'undefined' || val == '') {
                return
            }
            val = $.trim(val)
            if ($.inArray(val, genreFilter) == -1) {
                genreFilter.push(val);
            }
        };
        if (typeof (resultJSON[0].results) != "undefined") {
            for (var i = 0; i < resultJSON[0].results.length; i++) {
                var data = resultJSON[0].results[i];
                id = data.trackId;
                type = data.wrapperType;
                pushGenreIfNotExist(data.primaryGenreName);
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
                    pushGenreIfNotExist(data.primaryGenreName);
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
                if (typeof data.avatar === 'undefined') {
                    artworkUrl100 = 'ressources/img/avatar/default.png';//resultJSON[i].artworkUrl100;
                }
                else {
                    artworkUrl100 = data.avatar;
                }

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

        var idCurrentUser = $.cookie('user_id');

        var watchlistCollection = new WatchListCollection();
        watchlistCollection.url = URL + '/watchlists';
        watchlistCollection.fetch({
            success: function (watchlists) {

                that.$el.html(that.template({
                    results: displayCol,
                    watchlist: watchlists.toJSON(),
                    idUser: idCurrentUser,
                    genres: genreFilter
                }));


                watchlists.toJSON().forEach(function (wl) {
                    if (wl.owner.id == idCurrentUser) {
                        wl.movies.forEach(function (movie) {
                            $('#' + movie.trackId).removeClass('glyphicon glyphicon-star-empty addTo').addClass("glyphicon glyphicon-star addTo");
                        });
                    }
                });
            }
        });



    },
    addWatchlist: function(){
        var that = this;
        var idWatchlist = $('.radio-watch:checked').val();
        var idMovie = $('#idOfMovie').text();

        var watchlistModel = new WatchlistModel();
        watchlistModel.url = URL + '/watchlists/' + idWatchlist;
        watchlistModel.fetch({
            success: function(data){
                var movie = new Movie({id: idMovie});
                movie.fetch({
                    success: function(movieFetch){
                        for(var i = 0; i < data.attributes.movies.length; i++){
                            if(data.attributes.movies[i].trackId === movie.toJSON().trackId){
                                $('#alert-danger').fadeIn().delay(5000).fadeOut();
                                return
                            }
                        }
                        data.attributes.movies.push(movie.toJSON());
                        data.save();
                        $('#alert-success').fadeIn().delay(5000).fadeOut();
                        $('#' + idMovie).removeClass('glyphicon glyphicon-star-empty addTo').addClass("glyphicon glyphicon-star addTo");
                    }

                })
            }
        });
    },
    allGenre: function () {
        if ($('#allFilter').is(':checked')) {
            $('.genreFilter').prop('checked', false);
            this.render();
        }
    },
    filterByGenre: function () {
        if ($('.genreFilter').is(':checked')) {
            $('#allFilter').prop('checked', false);
            var checkedFilter = $('.genreFilter');
            var checkedGenre = []
            for (var i = 0; i < checkedFilter.length; i++) {
                if (checkedFilter[i].parentElement.innerText === $('.genreFilter')[i].parentElement.innerText) {
                    if ($('.genreFilter')[i].checked) {
                        checkedGenre.push($('.genreFilter')[i].parentElement.innerText);
                    }
                }
            }

            var that = this;
            var resultJSON = this.collection.toJSON();
            var displayCol = [];
            var genreFilter = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var type = '';
            var id = '';
            var pushGenreIfNotExist = function (val) {
                if (typeof(val) == 'undefined' || val == '') {
                    return
                }
                val = $.trim(val)
                if ($.inArray(val, genreFilter) == -1) {
                    genreFilter.push(val);
                }
            };
            for (var i = 0; i < resultJSON[0].results.length; i++) {
                var data = resultJSON[0].results[i];
                pushGenreIfNotExist(data.primaryGenreName);
                if ($.inArray(data.primaryGenreName, checkedGenre) != -1) {
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
                        trackId: id,
                    });
                }
            }
            var idCurrentUser = $.cookie('user_id');
            var watchlistCollection = new WatchListCollection();
            watchlistCollection.url = URL + '/watchlists';
            watchlistCollection.fetch({
                success: function (watchlists) {

                    that.$el.html(that.template({
                        results: displayCol,
                        watchlist: watchlists.toJSON(),
                        idUser: idCurrentUser,
                        genres: genreFilter
                    }));
                    $('#allFilter').prop('checked', false);
                    for (var i = 0; i < checkedFilter.length; i++) {
                        if (checkedFilter[i].parentElement.innerText === $('.genreFilter')[i].parentElement.innerText) {
                            $('.genreFilter')[i].checked = checkedFilter[i].checked;
                        }
                    }
                }
            });
        }
        else {
            $('#allFilter').prop('checked', true);
            this.render();
        }
    }

});

return General_SearchView;

});
