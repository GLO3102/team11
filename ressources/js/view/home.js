define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'view/carousel',
    'view/browse'
], function(Backbone,_,$,Bootstrap, CarouselView, BrowseView){

    var HomeView = Backbone.View.extend({
        render: function(){
            new CarouselView().render();
            new BrowseView().render();
        }

    });

    return HomeView;

});

