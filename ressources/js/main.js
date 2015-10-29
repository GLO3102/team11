require.config({
    paths: {
        jquery:'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        bootstrap:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap'
    },
    shim:{
        'bootstrap' :{
            deps:['jquery']}
    }

});

require(['view/menu','view/carousel','view/recentlyAdded','view/footer'],function(MenuView,CarouselView,RAView,FooterView){
    new MenuView;
    new CarouselView;
    new RAView;
    new FooterView;
});