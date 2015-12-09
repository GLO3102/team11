define([
    'backbone',
    'underscore',
    'jquery',
    'jqueryCookie',
    'bootstrap',
    'text!template/login_Template.html',
], function(Backbone,_,$,Cookie,Bootstrap, LoginTemplate) {

    var LoginView = Backbone.View.extend({
        template: _.template(LoginTemplate),
        el: '#main_container',

        events: {
            "click #loginButton": "login"
        },

        initialize: function () {

        },

        render:function () {
            this.$el.html(LoginTemplate);
        },

        login:function (event) {
            event.preventDefault();
            var formValues = {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()
            };
            $.ajax({
                url:URL + '/login',
                type:'POST',
                dataType:"json",
                data: formValues
            }).success(function (data) {
                $.cookie('user_id', data.id);
                $.cookie('auth_token', data.token);
                window.location.replace('#home');
            }).error( function (data){
                if(data.status == 401){
                    $('#loginError').text("email/password incorrect").fadeIn();
                }else{
                    //console.log($('#loginError'));
                    $('#loginError').text("unexpected error").fadeIn();
                }
            });
        }
    });

    return LoginView;
});
