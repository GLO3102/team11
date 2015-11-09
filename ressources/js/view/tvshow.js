/**
 * Created by Manuel on 03/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/tvshow',
    'text!template/tvshow_template.html',
    'utils/utils'
], function(Backbone,_,$,Bootstrap,TvShow, TvShowTemplate, Utils) {

    var TvShowView = Backbone.View.extend({
        template: _.template(TvShowTemplate),
        model: TvShow,
        el: '#main_container',

        events:{
            "click #btn-trailer": "showTrailer"
        },
        initialize: function () {
        },

        render: function (options) {
            var that = this;
            this.tvshow = new TvShow({id: options.id});
            this.tvshow.fetch({
                success: function(printTvShow){
                    that.$el.html(that.template({results:printTvShow.toJSON()}))
                    $('#video-trailer').hide();
                }
            })
        },

        showTrailer: function(){
            if($('#video-trailer').is( ":hidden" )){
                Utils.searchTrailer(this.tvshow.name,function(src){
                    $('#trailer').attr('src', src)
                    $('#video-trailer').show()});
            }
            else {
                $('#video-trailer').hide();
            }
        }
    });

    return TvShowView;
});