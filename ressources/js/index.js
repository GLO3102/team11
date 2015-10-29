/**
 * Created by Francis on 2015-09-25.
 */
function changePage(pageName)
{
    document.location = pageName;
}
require.config({
    paths: {
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone'
    }

});

require([

    // Load our app module and pass it to our definition function
    'app',

], function(App,menuView){
    // The "app" dependency is passed in as "App"
    App.initialize();
    new menuView;
});