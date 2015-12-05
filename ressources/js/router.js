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
    'view/episode',
    'view/login',
    'view/signUp',
    'collection/watchlist',
    'view/user'
], function($, _, Backbone,HomeView, FooterView,SearchableCollection,GSView,MovieView, MenuView, WatchListView, ActorView,ActorMoviesView,TvShowView,EpisodeView,LoginView, SignUpView, WatchlistCollection, UserView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home':'home',
            'movies/:id': 'movie',
            'tvshows/seasons/:id' : 'tvshow',
            'tvshows/seasons/:id/episodes' : 'episodes',
            'search/:q':'search',
            'search/:movies/:q': 'search/movies',
            'search/:tvshows/:season/:q': 'search/tvshows/seasons',
            'actors/:id': 'actor',
            'actors/:id/movies': 'actorMovies',
            'watchlist' : 'watchlist',
            'users/:id' : 'user',
            'login':'login',
            'signup':'signup',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        $.ajaxSetup({
            statusCode: {
                401: function(){
                    window.location.replace('#login');

                },
                403: function() {
                    window.location.replace('#signup');
                }
            }
        });

        var customHeader = function(){
            $.ajaxSetup({
                headers: {
                    Authorization: $.cookie('auth_token')
                }
            });
        };

        var app_router = new AppRouter;

        app_router.on('route:signup', function(){
            new SignUpView().render();
        });

        app_router.on('route:login', function(){
            new LoginView().render();
        });

        app_router.on('route:home', function(){
            customHeader();
            new HomeView().render();
        });

        app_router.on('route:defaultAction', function(){
            // Ici on va mettre la page de login
            app_router.navigate('home',{trigger:true});
        });
        app_router.on('route:movie', function(id){
            customHeader();
            stopZombies(this.lastMovie);
            var movieView = new MovieView();
            this.lastMovie = movieView;
            movieView.render({id: id});
        });

        app_router.on('route:tvshow', function(id){
            customHeader();
            stopZombies(this.lastTv);
            var tvshowView = new TvShowView();
            this.lastTv = tvshowView;
            tvshowView.render({id: id});

            stopZombies(this.lastEpisodes);
            var episodeView = new EpisodeView();
            episodeView.render({id: id});
            this.lastEpisodes = episodeView;
        });
        app_router.on('route:search', function(q){
            customHeader();
            var gSearch = SearchableCollection.extend({url: URL});
            gSearch.search('?' + q).done(function (results) {
                new GSView({collection:results}).render();
            });
        });
        app_router.on('route:search/movies', function (movies, q) {
            customHeader();
            var gSearch = SearchableCollection.extend({url: URL});
            gSearch.search('/' + movies + '?' + q).done(function (results) {
                new GSView({collection: results}).render();
            });
        });
        app_router.on('route:search/tvshows/seasons', function (tvshows, season, q) {
            customHeader();
            var gSearch = SearchableCollection.extend({url: URL});
            gSearch.search('/' + tvshows + '/' + season + '?' + q).done(function (results) {
                new GSView({collection: results}).render();
            });
        });
        app_router.on('route:watchlist', function(){
            customHeader();
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
            customHeader();
            stopZombies(this.lastActorView);
            var actorView = new ActorView();
            actorView.render({id: id});
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});
            this.lastActorView = actorMoviesView;
        });
        app_router.on('route:actorMovies', function(id){
            customHeader();
            stopZombies(this.lastMovieView);
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});
            this.lastMovieView = actorMoviesView;
        });

        app_router.on('route:episodes', function(id){
            customHeader();
            stopZombies(this.lastEpisodes);
            var episodeView = new EpisodeView();
            episodeView.render({id: id});
            this.lastEpisodes = episodeView;
        });

        app_router.on('route:user', function(id){
            customHeader();
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