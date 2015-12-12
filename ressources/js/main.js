var URL ='https://umovie.herokuapp.com';
//var URL ='http://localhost:3000/unsecure';
require.config({
    paths: {
        jquery:'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery',
        jqueryCookie:'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
        jqueryUI: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
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

