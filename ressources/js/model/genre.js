define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var GenreModel = Backbone.Model.extend({
        defaults: {
            name: ''
        },
        parse: function (response) {
            this.id = response.id;
            return response;
        }

    });

    return GenreModel;

});