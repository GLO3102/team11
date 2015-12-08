define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'view/carousel',
    'view/browse',
    'view/genres',
    'view/menu'
], function (Backbone, _, $, Bootstrap, CarouselView, BrowseView, GenresView, MenuView) {

    var HomeView = Backbone.View.extend({
        render: function(){
            new CarouselView().render();
            new BrowseView().render();

        }

    });

    return HomeView;

});

