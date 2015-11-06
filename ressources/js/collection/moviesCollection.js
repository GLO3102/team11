/**
 * Created by Timoth�e on 05/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/movie'
], function(Backbone,_,$,Bootstrap,Movie){

    var MoviesCollection = Backbone.Collection.extend({
        url: URL + '/watchlists',
        model: Movie,

        parse: function(response){
            return response.movies;
        }
    });

    return MoviesCollection ;

});
