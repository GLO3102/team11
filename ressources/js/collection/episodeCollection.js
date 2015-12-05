define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/episode'
], function(Backbone,_,$,Bootstrap, EpisodeModel){

    var EpisodeCollection = Backbone.Collection.extend({},{
        url: URL +'/tvshows/season/:id/episodes',

        model: EpisodeModel

    });
    return EpisodeCollection;
});