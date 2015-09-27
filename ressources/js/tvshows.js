/**
 * Created by Timothée on 25/09/2015.
 */
$(document).ready(function(){

var cover = ['ressources/img/tvshows/breaking_bad_season1.jpg',
    'ressources/img/tvshows/breaking_bad_season2.jpg',
    'ressources/img/tvshows/breaking_bad_season3.jpg',
    'ressources/img/tvshows/breaking_bad_season4.jpg',
    'ressources/img/tvshows/breaking_bad_season5.jpg'];

    $('#cover-tvshows').attr('src',cover[0]);


    $('.target').hide();
    $('.btn-season').click(function () {
        $('.target').hide();
        $('#season' + $(this).attr('target')).show(); // show the list of episode of a season
        $('#cover-tvshows').attr('src',cover[$(this).attr('target')-1]); // display the cover of a tvshows season
        $('html, body').animate({
            scrollTop: $('#season' +$(this).attr('target')).offset().top
        }, 1000);
    });
});