define([
    'jquery',
    'underscore',
    'backbone',
    'view/home',
    'view/footer'
], function($, _, Backbone,HomeView, FooterView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home':'home',
            'movies/:id': 'movie',
            'search/query:q':'search',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:home', function(){
            new HomeView().render();
        });

        app_router.on('route:defaultAction', function(){
            // Ici on va mettre la page de login
            app_router.navigate('home',{trigger:true});
        });
        app_router.on('route:movie', function(id){
            console.log('movie ' + id);
        });
        app_router.on('route:search', function(q){
                console.log('search : ' + q);
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