define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/browse_template.html'
], function(Backbone,_,$,Bootstrap,BrowseTemplate){

    var BrowseView = Backbone.View.extend({
        el: $("#browse"),
        initialize:function(){

        },
        render: function(){
            this.$el.html(BrowseTemplate);
        }

    });

    return BrowseView;

});
