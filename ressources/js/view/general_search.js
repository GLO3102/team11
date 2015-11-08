define([
'backbone',
'underscore',
'jquery',
'bootstrap',
'text!template/search_results_Template.html'
], function(Backbone,_,$,Bootstrap,GSTemplate){

var General_SearchView = Backbone.View.extend({
    template: _.template(GSTemplate),
    el: "#browse",
    render: function(){
            var resultJSON = this.collection.toJSON();
            var displayCol = [];
            var title = '';
            var by = '';
            var shortDesc = '';
            var url = '';
            var artworkUrl100;
            for (var i = 0;i < resultJSON[0].results.length;i++)
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
        this.$el.html(this.template({results:displayCol}));
    }

});

return General_SearchView;

});
