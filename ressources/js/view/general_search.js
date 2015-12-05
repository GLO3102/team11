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
    render: function(){
            var resultJSON = this.collection.toJSON();
            var displayCol = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            var type ='';
            for (var i = 0;i < resultJSON[0].results.length;i++)
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
                else if (data.wrapperType == "artist") {
                    title = data.artistName
                    by = data.primaryGenreName
                    url = '#/actors/' + data.artistId;
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
                artworkUrl100 = resultJSON[0].results[i].artworkUrl100;
                displayCol.push({
                    title:title,
                    by:by,
                    shortDesc :shortDesc,
                    url:url,
                    artworkUrl100:artworkUrl100,
                    type:type,
                });
            }
        this.$el.html(this.template({results:displayCol}));
    }

});

return General_SearchView;

});
