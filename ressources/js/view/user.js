/**
 * Created by Timoth�e on 24/11/2015.
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
    'collection/watchlist',
    'utils/utils',
    'jqueryCookie'
], function(Backbone,_,$,Bootstrap, User, UserTemplate, WatchListCollection, Utils, Cookie) {

    var UserView = Backbone.View.extend({
        template: _.template(UserTemplate),

        el: '#main_container',

        events:{
            'click #followUser' : 'followUser',
            'click #unfollowUser' : 'unfollowUser'
        },

        render: function (options) {
            var idUserCurrent = $.cookie('user_id');
            var userCurrent = new User({id : idUserCurrent});
            var table = new Array();
            var that = this;
            this.user = new User({id: options.id});
            //console.log(userCurrent.toJSON());

            var watchlistCollection = new WatchListCollection();
            watchlistCollection.url = URL + '/watchlists';
            watchlistCollection.fetch({
                success: function (watchlists) {
                    that.user.fetch({
                        success: function (userToPrint) {
                            userCurrent.fetch({
                                success: function(userCurr){
                                    userCurr.getGravatarImage();
                                    table.push(watchlists.toJSON());
                                    var userF = [];
                                    var utp = userToPrint.toJSON();
                                    utp.following.forEach(function (follower) {
                                        var tempUser = new User({
                                            id: follower.id,
                                            name: follower.name,
                                            email: follower.email
                                        });
                                        tempUser.getGravatarImage();
                                        userF.push(tempUser);
                                    });
                                    table.push({
                                        id: utp.id,
                                        name: utp.name,
                                        email: utp.email,
                                        followers: userF
                                    });
                                    table.push(userCurr.toJSON());
                                    that.$el.html(that.template({results: table}));
                                    //console.log(table);
                                }
                            })

                        }
                    });

                }
            });
        },

        followUser: function(){
            var id = $(event.target).data('id');
                var idData = JSON.stringify({id: id});
                $.ajax({
                    url: URL + '/follow',
                    type: 'POST',
                    data: idData,
                    dataType: "json",
                    contentType: 'application/json'
                })
                    .done(function () {
                        $('#followSuccess').fadeIn().delay(5000).fadeOut();

                    })
                    .fail(function (jqXHR, textStatus) {
                        if(jqXHR.status === 412)
                            $('#followError').fadeIn().delay(5000).fadeOut();
                        else{
                            $('#errorUnexpected').fadeIn().delay(5000).fadeOut();
                        }
                    })

        },

        unfollowUser: function(){
            var id = $(event.target).data('id');

                $.ajax({
                    url: URL + '/follow/' + id,
                    type: 'DELETE'
                }).done(function () {
                    $('#unfollowSuccess').fadeIn().delay(5000).fadeOut();
                })
                    .fail(function (jqXHR, textStatus) {
                        $('#errorUnexpected').fadeIn().delay(5000).fadeOut();
                    });
        }

    });
    return UserView;
});
