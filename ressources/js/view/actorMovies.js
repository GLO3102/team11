define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/actorMovies',
    'text!template/actorMovies_Template.html'
], function(Backbone,_,$,Bootstrap,ActorMovies, ActorMoviesTemplate) {

    var ActorMoviesView = Backbone.View.extend({
        template: _.template(ActorMoviesTemplate),
        model: ActorMovies,
        el: '#main_container',

        initialize: function () {
        },

        render: function (options) {
            var that = this;

        }
    });

    return ActorMoviesView;
});
