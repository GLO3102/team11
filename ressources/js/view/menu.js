define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/menuBar_Template.html',
    'model/menu',
    'model/user',
    'jqueryCookie'
], function(Backbone,_,$,Bootstrap,MenuBarTemplate,MenuModel, User, Cookie){

     var MenuView = Backbone.View.extend({
         template: _.template(MenuBarTemplate),

        model:MenuModel,

        el: $('#menubar'),

        initialize:function(){
            var defaultUser = new User();
            this.$el.html(this.template({user: defaultUser.toJSON()}));
        },
        events: {
            "click #search_button": "general_search",
            'click #logout' : 'logout'
        },
        render: function(){
            var that = this;
            var idUserCurrent = $.cookie('user_id');
            var userCurrent = new User({id : idUserCurrent});

            userCurrent.fetch({
                success: function(userCurr){
                    that.$el.html(that.template({user: userCurr.toJSON()}));
                }
            });

        },
        general_search : function() {
            if ($('#search_text').val() != '') {
                var text_to_search = $('#search_text').val();
                location.href = '#/search/q=' + text_to_search;
        }
            $('#search_text').val('');
            return false;
        },

         logout : function(){
             $.ajax({
                 url: URL + '/logout',
                 type: 'GET'

             });
             $.removeCookie('auth_token');
             $.removeCookie('user_id');
         }

    });

    return MenuView;

});