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
        initialize: function () {
        },

        render: function (options) {
            var that = this;
            this.tvshow = new TvShow({id: options.id});
            this.tvshow.fetch({
                success: function(printTvShow){
                    that.$el.html(that.template({results:printTvShow.toJSON()}))
                    Utils.searchTrailer(that.tvshow.name, function (src) {
                        $('#trailer').attr('src', src)
                    });
                }
            })
        }
    });

    return TvShowView;
});