/**
 * Created by Timoth�e on 02/11/2015.
 */
formatdate = function(date){
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    return day + ' ' + monthNames[month] + ' ' + year;
};

formattime = function(time){
    var x = Math.floor(time / 1000);
    var seconds = x % 60;
    x = Math.floor(x / 60);
    var minutes = x % 60;
    x = Math.floor(x / 60);
    var hours = x %24;
    return hours + ' ' + 'hours' + ' ' + minutes + ' ' + 'minutes' + ' ' + seconds + ' ' + 'seconds';
}

formatImageSize = function(str){
    var cpy = str.replace("100x100", "400x400");
    return cpy;
}



define([
    'jquery',
    'underscore',
    'backbone',
    'auth',
    'googleAPI'
], function($, _, Backbone,Auth, GoogleAPI){
    var searchTrailer = function(query){
        var request =  gapi.client.youtube.search.list({
            q:query,
           part:'snippet'
        })
        request.execute(function(response) {
           var str = JSON.stringify(response.result);
            return str;
        });
    }

    return {
        searchTrailer: searchTrailer
    };
});