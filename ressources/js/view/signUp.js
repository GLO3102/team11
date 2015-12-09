define([
    'backbone',
    'underscore',
    'jquery',
    'jqueryCookie',
    'bootstrap',
    'text!template/signUp_Template.html'
], function(Backbone,_,$,Cookie,Bootstrap, SignUpTemplate) {

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
            event.preventDefault();
            var url = 'https://umovie.herokuapp.com/signup';
            var formValues = {
                name: $('#inputNom').val(),
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()
            };

            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    console.log(data);
                    window.location.replace('#login');
                },
                error:function (data){
                    $('.alert-danger').text("unexpected error").fadeIn();
                }
            });
        }
    });

    return SignUpView;
});
