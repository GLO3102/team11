define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/genre'
], function(Backbone,_,$,Bootstrap,GenreModel){

    var GenresCollection = Backbone.Collection.extend({
        model: GenreModel
        //parse:function(response){
        //    return response.genres;
       // }

    });


    return GenresCollection ;

});
