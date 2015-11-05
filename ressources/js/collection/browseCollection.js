define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/movie'
], function(Backbone,_,$,Bootstrap,MovieModel){

    var BrowseCollection = Backbone.Collection.extend({
        url:'http://localhost:3000/unsecure/movies',
        model: GenreModel
        //parse:function(response){
        //    return response.genres;
        // }

    });


    return BrowseCollection ;

});
