define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'view/menu',
    'view/carousel',
    'view/browse'
], function(Backbone,_,$,Bootstrap,MenuView, CarouselView, BrowseView){

    var HomeView = Backbone.View.extend({
        render: function(){
            new MenuView().render();
            new CarouselView().render();
            new BrowseView().render();
        }

    });

    return HomeView;

});

