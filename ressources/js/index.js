/**
 * Created by Francis on 2015-09-25.
 */
function changePage(pageName)
{
    document.location = pageName;
}

$(function(){

    // Instantiate MixItUp:

    $('#Container').mixItUp({
        animation: {
            enable: false
        },
        callbacks: {
            onMixLoad: function(){
                $(this).mixItUp('setOptions', {
                    animation: {
                        enable: true
                    },
                });
            }
        }
    });
});