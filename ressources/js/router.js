define([
    'jquery',
    'underscore',
    'backbone',
    'view/menu',
    'view/carousel',
    'view/recentlyAdded',
    'view/footer'
], function($, _, Backbone, MenuView, CarouselView, RAView, FooterView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movie/id:id': 'movie',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:defaultAction', function(){
            new MenuView().render();
            new CarouselView().render();
            new RAView().render();
            new FooterView().render();
            app_router.navigate('home',{trigger:true});

        });
        app_router.on('route:movie', function(id){

        });






        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        var footerView = new FooterView();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});