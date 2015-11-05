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
        model: Movie
    });


    return MoviesCollection ;

});
