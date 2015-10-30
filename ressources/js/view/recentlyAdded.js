define([
    'backbone',
    'text!template/recently_added.html'
], function(Backbone,RATemplate){

    var RAView = Backbone.View.extend({
        el: $("#recently_added"),
        initialize:function(){
            this.$el.html(RATemplate);
        },
        render: function(){
            this.$el.html(RATemplate);
        }

    });

    return RAView;

});
