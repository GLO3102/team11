define([
    'backbone',
    'text!template/footer_Template.html'
], function(Backbone,FooterTemplate){

    var FooterView = Backbone.View.extend({
        el: $("footer"),
        initialize:function(){
            this.$el.html(FooterTemplate);
        },
        render: function(){
            this.$el.html(FooterTemplate);
        }

    });

    return FooterView;

});
