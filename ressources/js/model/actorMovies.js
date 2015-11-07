define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'collection/actorMoviesCollection'
], function(Backbone,_,$,Bootstrap, actorMoviesCollection){

    var actorMoviesModel = Backbone.Model.extend({
        defaults: function() {
            return {
                name: '',
                owner: '',
                movies: new actorMoviesCollection
            };
        },

        parse: function(response){
            this.id = response.id;
            return response;
        },

        validate: function(attrs){
            if(!attrs.name || !attrs.owner || attrs.name === '' || attrs.owner === ''){
                return 'Please enter a valid name or/and a valid owner !';
            }
        }
    });

    return actorMoviesModel;

});