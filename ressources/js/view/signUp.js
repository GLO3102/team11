define([
    'backbone',
    'underscore',
    'jquery',
    'jqueryCookie',
    'bootstrap',
    'text!template/signUp_Template.html',
    'model/user'
], function(Backbone,_,$,Cookie,Bootstrap, SignUpTemplate, User) {

    var SignUpView = Backbone.View.extend({
        template: _.template(SignUpTemplate),
        el: '#main_container',

        events: {
            "click #signUpButton": "signUp"
        },

        initialize: function () {
        },

        render:function () {
            this.$el.html(SignUpTemplate);
        },

        signUp:function (event) {
            var that = this;
            event.preventDefault();
            if($('#inputNom').val() == '' || $('#inputNom').val() == null || $('#inputEmail').val() == '' || $('#inputEmail').val() == null ||
                $('#inputPassword').val() == '' || $('#inputPassword').val() == null ){

                $('.alert-danger').text("Error: All fields are mandatory").fadeIn();

            }else {
                var formValues = {
                    name: $('#inputNom').val(),
                    email: $('#inputEmail').val(),
                    password: $('#inputPassword').val()
                };
                var avatarUser = $('input[name=radioAvatar]:checked', '#signupForm').val();

                $.ajax({
                    url: URL + '/signup',
                    type: 'POST',
                    dataType: "json",
                    data: formValues,
                    success: function (data) {
                        /*that.user = new User({id: data.id});
                         that.user.set({avatar : avatarUser});*/

                        window.location.replace('#login');
                    },
                    error: function (data) {
                        $('.alert-danger').text("unexpected error").fadeIn();
                    }
                });
            }
        }
    });

    return SignUpView;
});
