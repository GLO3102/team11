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
            var tvshow = new TvShow({id: options.id});
            tvshow.fetch({
                success: function(printTvShow){
                    that.$el.html(that.template({results:printTvShow.toJSON()}))
                }
            })
        }
    });

    return TvShowView;
});