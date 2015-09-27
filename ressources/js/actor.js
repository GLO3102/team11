/**
 * Created by Alessandro on 2015-09-27.
 */

$(document).ready(function(){
    /* Show or hide trailer movie */
    $('.video-trailer').hide();
    $('.btn-trailer').click(function(){

    $(".trailer" + $(this).attr('target')).show();

    });
});

