define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/menuBar_Template.html',
    'model/menu',
    'model/user',
    'jqueryCookie'
], function (Backbone, _, $, Bootstrap, MenuBarTemplate, MenuModel, User, Cookie, UI) {

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
            'click #logout' : 'logout',
            'click .search_type': 'search_type',
            'keyup #search_text': 'auto_complete_text'
        },
        render: function(){
            var that = this;
            var idUserCurrent = $.cookie('user_id');
            var userCurrent = new User({id : idUserCurrent});

            if($.cookie('auth_token') == null){
                $('#user').hide();
            }

            userCurrent.fetch({
                success: function(userCurr){
                    userCurr.getGravatarImage();
                    var currentUser = userCurr.toJSON();
                    that.$el.html(that.template({user: currentUser}));
                }
            });



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

         logout : function(){
             $.ajax({
                 url: URL + '/logout',
                 type: 'GET'

             });
             $.removeCookie('auth_token');
             $.removeCookie('user_id');
             $('#user').hide();
         
        },
         search_type: function () {

             $('#type').data('data-target', event.target.dataset.target);
             $('#type').html(event.target.innerText + " <span class='caret'></span>");
         },

         auto_complete_text: function () {

             var url = '';
             var option = '';
             if ($('#type').text() != 'All ') {
                 option = $('#type').text().toString().toLowerCase().replace(" ", "");
                 if (option == 'tvshows') {
                     option = option + '/' + $('#type').data('data-target');
                 }
                 url = 'search/' + option + '?q=';
             }
             else {
                 url = 'search?q=';
             }

             $("#search_text").autocomplete({
                 source: function (request, response) {
                     $.ajax({
                         url: URL + url + $('#search_text').val(),
                         dataType: "json",
                         headers: {
                             Authorization: $.cookie('auth_token')
                         },
                         success: function (data) {
                             if (option == 'users') {
                                 response($.map(data, function (object) {
                                     return object.name;
                                 }));
                             } else if(option == ''){
                                 response($.map(data.results, function (object) {
                                     if(object.wrapperType == "track"){
                                         return object.trackName;
                                     }else{
                                         return object.artistName;
                                     }
                                 }));
                             }else {
                                 response($.map(data.results, function (object) {
                                     if (option == 'movies') {
                                         return object.trackName;
                                     } else if (option == 'tvshows/seasons') {
                                         return object.collectionName;
                                     } else if (option == 'actors') {
                                         return object.artistName;
                                     }

                                 }));
                             }
                         }
                     });
                 }
             });
         }
    });

    return MenuView;

});