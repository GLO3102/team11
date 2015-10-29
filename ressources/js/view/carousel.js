define([
'backbone',
    'text!template/carousel.html'
], function(Backbone,CarouselTemplate){

    var CarouselView = Backbone.View.extend({
        el: $("#carourel"),
        initialize:function(){
            this.$el.html(CarouselTemplate);
        },
        render: function(){
            //this.$el.html(menuBarTemplate);
            console.log('allo!');
        }

    });

    return CarouselView;

});
