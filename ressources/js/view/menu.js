define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/menuBar_Template.html',
    'model/menu',
    'collection/SearchableCollection',
    'view/general_search'
], function(Backbone,_,$,Bootstrap,MenuBarTemplate,MenuModel,SearchableCollection,GSView){

     var MenuView = Backbone.View.extend({
        model:MenuModel,
        el: $("#menubar"),
        initialize:function(){
            var self = this;
        },
        events: {
             "click #search_button": "general_search"
        },
        render: function(){
            this.$el.html(MenuBarTemplate);
        },
        general_search : function()
        {

            var text_to_search = $('#search_text').val();
            var generalSearch = SearchableCollection.extend({url:'http://localhost:3000/unsecure/'});
            generalSearch.search(text_to_search).done(function(results){
                new GSView({collection:results}).render();
            });
            $('#search_text').val('');
            return false;
        }

    });

    return MenuView;

});