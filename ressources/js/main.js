var URL ='https://umovie.herokuapp.com/unsecure';
//var URL ='http://localhost:3000/unsecure';
require.config({
    paths: {
        jquery:'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        auth:'utils/auth',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        bootstrap:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap',
        googleAPI:'https://apis.google.com/js/client.js?onload=googleApiClientReady'
    },
    shim:{
        'bootstrap' :{
            deps:['jquery']}
    }

});

require(['app'],function(App){
   App.initialize();
});

