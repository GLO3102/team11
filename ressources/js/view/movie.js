/**
 * Created by Timothée on 29/10/2015.
 */
define([
    'backbone',
    'model/movie',
    'text!template/movie_template.html'
], function(Backbone,MovieTemplate) {

    var MovieView = Backbone.View.extend({
        template: _.template(MovieTemplate),

        el: '#main_container',

        initialize: function () {
            _.bindAll(this, 'render');

            var that = this;

            this.model.bind('sync', function () {
                that.render();
            });
        },

        render: function () {
            this.$el.html(MovieTemplate);
            return this;
        }
    });

    return MovieView;
});