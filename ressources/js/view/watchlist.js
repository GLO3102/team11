/**
 * Created by Timothée on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/watchlist_template.html',
    'collection/watchlist'

], function(Backbone,_,$,Bootstrap,WatchListTemplate, WatchListCollection ) {

    var WatchListView = Backbone.View.extend({
        template: _.template(WatchListTemplate),

        collection: WatchListCollection,

        el: '#main_container',

        initialize: function () {

            _.bindAll(this, 'render');

            var self = this;

            this.collection.bind('sync', function () {
                self.render();
            });
        },

        render: function () {
            var that = this;
            var watchListCollection = new WatchListCollection();
            //this.$el.html(this.template());
            watchListCollection.fetch({
                success: function(){
                    that.$el.html(that.template({results: this.collection.toJSON()}))
                }
            })
        }
    });

    return WatchListView;
});