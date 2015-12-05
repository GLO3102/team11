define([
    'jquery',
    'underscore',
    'backbone',
    'view/home',
    'view/footer',
    'collection/SearchableCollection',
    'view/general_search',
    'view/movie',
    'view/menu',
    'view/watchlist',
	'view/actor',
    'view/actorMovies',
    'view/tvshow',
    'collection/watchlist',
    'view/user'
], function($, _, Backbone,HomeView, FooterView,SearchableCollection,GSView,MovieView, MenuView, WatchListView,
            ActorView,ActorMoviesView,TvShowView, WatchlistCollection, UserView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home':'home',
            'movies/:id': 'movie',
            'tvshows/seasons/:id' : 'tvshow',
            'search/:q':'search',
            'actors/:id': 'actor',
            'actors/:id/movies': 'actorMovies',
            'watchlist' : 'watchlist',
            'users/:id' : 'user',
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
            stopZombies(this.lastMovie);
            var movieView = new MovieView();
            this.lastMovie = movieView;
            movieView.render({id: id});
        });

        app_router.on('route:tvshow', function(id){
            stopZombies(this.lastTv);
            var tvshowView = new TvShowView();
            this.lastTv = tvshowView;
            tvshowView.render({id: id});
        });
        app_router.on('route:search', function(q){
            var gSearch = SearchableCollection.extend({url: URL});
            gSearch.search(q).done(function(results){
                new GSView({collection:results}).render();
            });
        });


        app_router.on('route:watchlist', function(){
            stopZombies(this.lastWatchlist);
            var watchlistCollection = new WatchlistCollection();
            watchlistCollection.url = URL + '/watchlists';

            var watchListView = new WatchListView({
                collection: watchlistCollection
            });
            this.lastWatchlist = watchListView;
            watchlistCollection.fetch().complete(function () {
                watchListView.render();
            });
        });

        app_router.on('route:actor', function(id){
            stopZombies(this.lastActorView);
            var actorView = new ActorView();
            actorView.render({id: id});
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});
            this.lastActorView = actorMoviesView;
        });
        app_router.on('route:actorMovies', function(id){
            stopZombies(this.lastMovieView);
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});
            this.lastMovieView = actorMoviesView;
        });

        app_router.on('route:user', function(id){
            var userView = new UserView();
            userView.render({id: id});
        });



        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        var menuView = new MenuView();
        var footerView = new FooterView();

        // http://stackoverflow.com/questions/7883947/event-triggered-multiple-times-after-using-back-button-in-backbone-js
        var stopZombies= function(objView){
            if(typeof objView === "object"){
                objView.undelegateEvents();
                $(objView.el).empty();
            }
        };

        Backbone.history.start();
    };


    return {
        initialize: initialize
    };
});