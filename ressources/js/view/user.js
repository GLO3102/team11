/**
 * Created by Timothée on 24/11/2015.
 */
/**
 * Created by Timoth?e on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/user',
    'text!template/user_template.html',
    'model/user'
], function(Backbone,_,$,Bootstrap, User, UserTemplate,User) {

    var UserView = Backbone.View.extend({
        template: _.template(UserTemplate),
        el: '#main_container',

        render: function(options){
            var that = this;
            this.user = new User({id: options.id});
            this.user.fetch({
                success: function(printUser){
                    that.$el.html(that.template({user: printUser.toJSON()}));
                    console.log(printUser.toJSON());
                }
            })

        }
    });

    return UserView;
});
