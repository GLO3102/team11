define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/actor',
    'text!template/actor_Template.html'
], function(Backbone,_,$,Bootstrap,Actor, ActorTemplate) {

    var ActorView = Backbone.View.extend({
        template: _.template(ActorTemplate),
        model: Actor,
        el: '#main_container',

        initialize: function () {
        },

        render: function (options) {
            var that = this;
            var actor = new Actor({id: options.id});
            actor.fetch({
                success: function(printActor){
                    that.$el.html(that.template({results:printActor.toJSON()}))
                }
            })
        }
    });

    return ActorView;
});
