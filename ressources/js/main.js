require.config({
    paths: {
        jquery:'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        bootstrap:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap',
        router:'../js/router'
    },
    shim:{
        'bootstrap' :{
            deps:['jquery']}
    }

});

require(['app'],function(App){
   App.initialize();
});