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
            if($('#inputEmail').val() == '' || $('#inputEmail').val() == null || $('#inputPassword').val() == '' || $('#inputPassword').val() == null){
                $('#loginError').text("Error: All fields are mandatory").fadeIn();
            }else {

                var formValues = {
                    email: $('#inputEmail').val(),
                    password: $('#inputPassword').val()
                };
                $.ajax({
                    url: URL + '/login',
                    type: 'POST',
                    dataType: "json",
                    data: formValues
                }).success(function (data) {
                    console.log("ok");
                    $.cookie('user_id', data.id);
                    $.cookie('auth_token', data.token);
                    window.location.replace('#home');
                }).error(function (data) {
                    if (data.status == 401) {
                        $('#loginError').text("email/password incorrect").fadeIn();
                    } else {
                        //console.log($('#loginError'));
                        $('#loginError').text("unexpected error").fadeIn();
                    }
                });
            }
            console.log("fin click");
        }
    });

    return LoginView;
});
