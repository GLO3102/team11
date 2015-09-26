$(document).ready(function(){
   $('#video-trailer').hide();
    var show = false;
    $('#btn-trailer').click(function(){


        if(show == false){
            $('#video-trailer').show();
            show = true;
        }

        else {
            $('#video-trailer').hide();
            show = false;
        }
    });
});
