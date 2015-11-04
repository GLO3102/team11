define([
    'jquery',
    'underscore',
    'backbone',
    'view/home',
    'view/footer',
    'collection/SearchableCollection',
    'view/general_search',
    'view/menu'
], function($, _, Backbone,HomeView, FooterView,SearchableCollection,GSView,MenuView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home':'home',
            'movies/id:id': 'movie',
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
        app_router.on('route:movies', function(id){
            console.log(id);
        });
        app_router.on('route:search', function(q){
            var gSearch = SearchableCollection.extend({url: 'http://localhost:3000/unsecure/'});
            gSearch.search(q).done(function(results){
                new GSView({collection:results}).render();
            });

//     url:'http://localhost:3000/unsecure/genres'
        });

        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        var menuView = new MenuView();
        var footerView = new FooterView();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});