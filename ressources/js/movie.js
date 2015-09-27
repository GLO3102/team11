$(document).ready(function(){
    /* Show or hide trailer movie */
   $('#video-trailer').hide();
    var show = false;
    $('#btn-trailer').click(function(){


        if(show == false){
            $('#video-trailer').show();
            show = true;
            $('html, body').animate({
                scrollTop: $("#video-trailer").offset().top
            }, 1000);
        }

        else {
            $('#video-trailer').hide();
            show = false;
        }
    });
});
