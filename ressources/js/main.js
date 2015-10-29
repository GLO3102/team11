require.config({
    paths: {
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text'
    }

});

require(['view/menu'],function(MenuView){
    new MenuView;
});