define([
    'backbone',
    'text!template/menuBarTemplate.html'
], function(Backbone,MenuBarTemplate){

     var MenuView = Backbone.View.extend({
        el: $("#menubar"),
        initialize:function(){
            this.$el.html(MenuBarTemplate);
        },
        render: function(){
            //this.$el.html(menuBarTemplate);
            console.log('allo!');
        }

    });

    return MenuView;

});