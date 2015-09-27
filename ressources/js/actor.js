/**
 * Created by Alessandro on 2015-09-27.
 */

$(document).ready(function(){
    /* Show or hide trailer movie */
    $('.video-trailer').hide();
    var show = false;
    $('.btn-trailer').click(function(){


        if(show == false){
            $('.video-trailer').show();
            show = true;

        }

        else {
            $('.video-trailer').hide();
            show = false;
        }
    });
});

