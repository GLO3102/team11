/**
 * Created by Timothée on 05/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/movie'
], function(Backbone,_,$,Bootstrap,Movie){

    var MoviesCollection = Backbone.Collection.extend({
        url: 'http://localhost:3000/unsecure/watchlists',
        model: Movie,

        parse: function(response){
            return response.movies;
        }
    });

    return MoviesCollection ;

});
