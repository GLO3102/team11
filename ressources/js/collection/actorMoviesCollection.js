define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/actorMovies'
], function(Backbone,_,$,Bootstrap, ActorMoviesModel){

    var ActorMoviesCollection = Backbone.Collection.extend({},{
        url: 'https://umovie.herokuapp.com/unsecure/actors id /movies',

        model: ActorMoviesModel,
        initialize: function(model, options){
            this.id = options.id;
        },
        parse: function(response){
            response.name;
        }

    });
    return ActorMoviesCollection;
});