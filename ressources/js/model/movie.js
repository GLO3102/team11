/**
 * Created by Timothée on 02/11/2015.
 */
$(function(){
    var Movie = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/unsecure/movies',

        parse: function(response) {
            return response.results[0];
        }
    });

    return Movie;

});