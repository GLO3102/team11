define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/actorMovies'
], function(Backbone,_,$,Bootstrap, ActorMoviesModel){

    var ActorMoviesCollection = Backbone.Collection.extend({},{
        url: URL +'actor/:id/movies',

        model: ActorMoviesModel

    });
    return ActorMoviesCollection;
});