define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'collection/episodeCollection'
], function(Backbone,_,$,Bootstrap, EpisodeCollection){

    var EpisodeModel = Backbone.Model.extend({
        defaults: function() {
            return {
                episode: new EpisodeCollection
            };
        },

        parse: function(response){
            this.id = response.id;
            console.log(response);
            return response;
        },

    });

    return EpisodeModel;

});