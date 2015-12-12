define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/browse_template.html',
    'collection/SearchableCollection',
    'view/genres'
], function (Backbone, _, $, Bootstrap, BrowseTemplate, BrowseCollection, GenresView) {

    var BrowseView = Backbone.View.extend({
        template: _.template(BrowseTemplate),
        el: "#main_container",
        collection:BrowseCollection,
        events: {
            "click #previousPage": "previousPage_toDisplay",
            "click #nextPage": "nextPage_toDisplay"
        },
        initialize:function(){
            _.bindAll(this,'render');
        },
        render: function(){
            var self = this;

            var gSearch = BrowseCollection.extend({url: URL});

            gSearch.search('?q=all&limit=100').done(function (results) {
                valueDiplay = results.toJSON();
                var resultJSON = results.toJSON();
                var displayCol = [];
                var title = '';
                var by = '';
                var shortDesc = '';
                var url = '';
                var artworkUrl100;
                var type ='';
                for (var i = 0; i < 20; i++)
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
                new GenresView().render();


            });

        },
        previousPage_toDisplay: function () {
            if (this.pageNumber == 0) {
                this.pageNumber = 3;
            }
            $('#browseContainer').empty();
            this.pageNumber--;
            var displayCol = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var startValue = this.pageNumber * 20;
            for (var i = startValue; i < (20 * (this.pageNumber + 1)); i++) {
                var data = valueDiplay[0].results[i];
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
                artworkUrl100 = data.artworkUrl100;
                displayCol.push({
                    title: title,
                    by: by,
                    shortDesc: shortDesc,
                    url: url,
                    artworkUrl100: artworkUrl100
                });
            }
            $('#browseContainer').append(this.template({resultsCol: displayCol}));
            return false;

        },
        nextPage_toDisplay: function () {
            if (this.pageNumber == 4) {
                this.pageNumber = 0;
            }
            $('#browseContainer').empty();
            this.pageNumber++;
            var displayCol = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var startValue = this.pageNumber * 20;
            for (var i = startValue; i < (20 * (this.pageNumber + 1)); i++) {
                var data = valueDiplay[0].results[i];
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
                artworkUrl100 = data.artworkUrl100;
                displayCol.push({
                    title: title,
                    by: by,
                    shortDesc: shortDesc,
                    url: url,
                    artworkUrl100: artworkUrl100
                });
            }
            $('#browseContainer').append(this.template({resultsCol: displayCol}));
            return false;

        },
        pageNumber: 0,
        valueDiplay: {}


    });

    return BrowseView;

});
