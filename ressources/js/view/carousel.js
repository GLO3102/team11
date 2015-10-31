define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/carousel_Template.html'
], function(Backbone,_,$,Bootstrap,CarouselTemplate){

    var CarouselView = Backbone.View.extend({
        el: $("#carourel"),
        initialize:function(){
        },
        render: function(){
            this.$el.html(CarouselTemplate);
            $('.carousel').carousel();
        }

    });

    return CarouselView;

});
