/**
 * Created by Timothée on 25/09/2015.
 */
$(document).ready(function(){
var cover = ["http://static1.purecine.fr/series/1/10/55/61/@/303893-689-stvp1426058764-jpg-620x0-1.jpg",
    "http://www.cinemay.com/wp-content/uploads/2013/08/breaking-bad-poster_399299_31440.jpg",
    "http://www.maxipopcorn.com//wp-content/uploads/2010/02/breakingbad_poster_s3.jpg",
    "https://pennydreadfulbooks.files.wordpress.com/2015/05/bb4.jpg",
    "http://www.cinechronicle.com/wp-content/uploads/2012/06/Breaking-Bad-saison-5-affiche.jpg"];

    $('#cover-tvshows').attr('src',cover[0]);


    $('.target').hide();
    $('.btn-season').click(function () {
        $('.target').hide();
        $('#season' + $(this).attr('target')).show();
        $('#cover-tvshows').attr('src',cover[$(this).attr('target')-1]);
    });
});