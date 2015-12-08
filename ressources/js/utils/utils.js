/**
 * Created by Timoth?e on 02/11/2015.
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
    if(hours == 0)
        return minutes + ' ' + 'minutes' + ' ' + seconds + ' ' + 'seconds';
    else
        return hours + ' ' + 'hours' + ' ' + minutes + ' ' + 'minutes' + ' ' + seconds + ' ' + 'seconds';
};

formatImageSize = function(str, taille){
    var cpy = str.replace(new RegExp('...x...'), "400x"+taille);
    return cpy;
};

changeModal= function(sName, epName, description, cover, time){
    $("#myModalLabel").text(sName);
    $("#trackName").empty();
    $("#trackName").append("<b>"+epName+"</b><br>"+time);
    $("#myModalDescription").text(description);
    $("#modalImg").attr('src', cover);
    searchTrailer(sName + " "+epName,function(src){
        $("#modalTrailer").attr('src', src)
    });

};
addToWatchlist = function (id) {
    $("#idOfMovie").empty();
    $("#idOfMovie").html(id);
    $("#modalWatchlist").modal('show');
};

function getImageActor(actorName, callback) {
    var image = "";

    function successCB(data) {
        jsonData = JSON.parse(data);
        theMovieDb.people.getImages({"id": jsonData.results[0].id}, successImageCB, errorImageCB);
        function successImageCB(dataImage) {
            jsonDataImage = JSON.parse(dataImage);
            image = jsonDataImage.profiles[0].file_path;
            callback("http://image.tmdb.org/t/p/w500" + image);
        }

        function errorImageCB(dataImage) {
            console.log(dataImage);
        }

        callback('http://www.omprakashsharma.com/images/Default.gif');//Image par défaut. On l'a prit sur internet.
    }

    function errorCB(data) {
        console.log(data);
    }


    theMovieDb.search.getPerson({"query": encodeURIComponent(actorName)}, successCB, errorCB);
}

define([
    'jquery',
    'underscore',
    'backbone',
    'auth',
    'googleAPI'
], function($, _, Backbone,Auth, GoogleAPI){
    searchTrailer = function(query, callback) {
        gapi.client.setApiKey(API_Key);
        gapi.client.load('youtube', 'v3').then(search);

        search : function search() {

            var q =  query + " trailer";
            var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet'
            });

            request.execute(function (response) {
                var src = 'https://www.youtube.com/v/' + response.items[0].id.videoId;
                callback(src);
            });

        }
    }
    return {
        searchTrailer: searchTrailer
    };
});