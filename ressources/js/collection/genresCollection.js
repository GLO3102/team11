define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/genre'
], function (Backbone, _, $, Bootstrap, GenreModel) {

    var GenresCollection = Backbone.Collection.extend({
        model: GenreModel,
        parse: function (response) {
            var results = [];
            _(response).each(function (genre) {
                results.push({
                    id: genre.id,
                    genre_name: genre.name
                });
            });
            return results;
        }
    });


    return GenresCollection;

});