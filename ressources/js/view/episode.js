define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/episode',
    'collection/episodeCollection',
    'text!template/episode_modal_template.html',
    'utils/utils'
], function(Backbone,_,$,Bootstrap,EpisodeModel, EpisodeCollection, EpisodeTemplate,Utils) {

    var EpisodeView = Backbone.View.extend({
        template: _.template(EpisodeTemplate),
        model: EpisodeModel,
        collection: EpisodeCollection,
        el: '#episodes',

        initialize: function () {

            _.bindAll(this, 'render');

            var self = this;

            this.collection.bind('change', function () {
                self.render();
            });
        },

        render: function (id) {
            var that = this;
            that.el = 'episodes';
            var episodeCollection = new EpisodeCollection({});
            episodeCollection.url = URL + '/tvshows/season/'+id.id+'/episodes';
            episodeCollection.fetch({
                success: function(data){
                    nextThat = that;
                    $('#main-container').ready(function(){
                        document.getElementById(nextThat.el).innerHTML = that.template({results: data.toJSON()});
                        data.toJSON()[0]["results"].forEach(function(episode){
                            $("#"+episode.trackId+"-ep").click(function(e){
                                changeModal(episode.artistName, episode.trackName, episode.longDescription,formatImageSize(episode.artworkUrl100, 100),formattime(episode.trackTimeMillis));
                            })
                        });
                    });
                }
            })
        },
    });

    return EpisodeView;
});
