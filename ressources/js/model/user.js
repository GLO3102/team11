/**
 * Created by Timothee on 02/11/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var User = Backbone.Model.extend({
        urlRoot: URL + '/users',
        defaults: {
            name:'User',
            email: 'user@umovie.com',
            id:'',
            avatar:'ressources/img/avatar/default.png'
        },
        getGravatarImage: function () {
            if (this.id != '' && this.attributes.email != '' && typeof this.attributes.email != 'undefined') {
                var em = this.attributes.email;
                em = em.trim();
                var hashKey = hashMD5(em);
                this.attributes.avatar = 'http://www.gravatar.com/avatar/' + hashKey;
            }
        },
    });

    return User;

});