/**
 * Created by Timoth�e on 29/10/2015.
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/watchlist_template.html',
    'text!template/createWatchlist_template.html',
    'collection/watchlist',
    'model/watchlist'

], function(Backbone,_,$,Bootstrap,WatchListTemplate,WatchListCreateTemplate, WatchListCollection, WatchlistModel ) {

    var WatchListView = Backbone.View.extend({
        template1: _.template(WatchListTemplate),

        template2: _.template(WatchListCreateTemplate),

        el: '#main_container',

        events: {
            'click #new-watchlist' : 'createWatchlist',
            'click #create-watchlist' : 'newWatchlist',
            'click .delete-watchlist' : 'deleteWatchlist',
            'click .delete-movie' : 'deleteMovie',
            'click .edit-watchlist' : 'editWatchlist',
            'click .change-name' : 'changeName'
        },

        initialize: function () {

            _.bindAll(this, 'render');

            var self = this;

            this.collection.bind('sync add remove', function () {
                self.render();

            });

        },

        render: function () {
            this.$el.html(this.template1({
                results: this.collection.toJSON()
            }));
        },

        createWatchlist: function(){
            this.$el.html(this.template2({}));
        },

        newWatchlist: function(event){
            var name = $('#watchName').val();
            var email = $('#email').val();
            var userName = $('#userName').val();
            var id = '562145aa9cfbe00300efe70e';

            this.collection.create({
                name: name,
                owner: {
                    id: id,
                    name: userName,
                    email: email
                }
            }, {
                wait: true
            });
         },

        deleteWatchlist : function(event){
            var watchlistId = $(event.target).data('id');
            var model = this.collection.get(watchlistId);
            model.destroy();
            this.collection.remove(watchlistId);
        },

        deleteMovie : function(event) {
            var movieId = $(event.target).data('id');
            var watchlistId = $(event.target).data('watchlist');

            var model = this.collection.get(watchlistId);
            var table = model.get('movies');

            var index = -1;
            for(var i = 0; i < table.length; i++) {
                if (table[i].trackId === movieId) {
                    index = i;
                    break;
                }
            }
            var removed = model.attributes.movies.splice(index,1);

            model.save();

        },
        editWatchlist: function(event){
            var id = $(event.target).data('id');
            if($('.edit-name'+id).is( ":hidden" )){
                $('.edit-name'+id).show();
            }
            else {
                $('.edit-name'+id).hide();
            }
        },
        changeName: function(event){
            var idd = event.target.id;
            var id = $('#input-'+idd).data('id');
            var model = this.collection.get(id);
            var name = $('#input-'+idd).val();
            model.save({name : name});
        }
    });

    return WatchListView;
});