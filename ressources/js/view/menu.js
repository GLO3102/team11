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
            "click #search_button": "general_search",
            "click .search_type": "search_type",
        },
        render: function(){
            this.$el.html(MenuBarTemplate);
        },
        general_search : function() {
            if ($('#search_text').val() != '') {
                var text_to_search = $('#search_text').val();
                var url = '';
                var option = '';
                if ($('#type').text() != 'All ') {
                    option = $('#type').text().toString().toLowerCase().replace(" ", "");
                    if (option == 'tvshows') {
                        option = option + '/' + $('#type').data('data-target');
                    }
                    url = '#/search/' + option + '/';
                }
                else {
                    url = '#/search/';
                }

                location.href = url + 'q=' + text_to_search;
        }
            $('#search_text').val('');
            return false;
        },
         search_type: function () {

             $('#type').data('data-target', event.target.dataset.target);
             $('#type').html(event.target.innerText + " <span class='caret'></span>");
        }
    });

    return MenuView;

});