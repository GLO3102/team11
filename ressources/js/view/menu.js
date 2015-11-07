define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/menuBar_Template.html',
    'model/menu'
], function(Backbone,_,$,Bootstrap,MenuBarTemplate,MenuModel){

     var MenuView = Backbone.View.extend({
        model:MenuModel,
        el: $("#menubar"),
        initialize:function(){
            var self = this;
            this.$el.html(MenuBarTemplate);
        },
        events: {
            "click #search_button": "general_search"
        },
        render: function(){
            this.$el.html(MenuBarTemplate);
        },
        general_search : function() {
            if ($('#search_text').val() != '') {
                var text_to_search = $('#search_text').val();
                location.href='#/search/query' + text_to_search;
        }
            $('#search_text').val('');
            return false;
        }

    });

    return MenuView;

});