define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'model/actorMovies',
    'collection/actorMoviesCollection',
    'text!template/actorMovies_Template.html',
    'utils/utils'
], function(Backbone,_,$,Bootstrap,ActorMovies, ActorMoviesCollection, ActorMoviesTemplate,Utils) {

    var ActorMoviesView = Backbone.View.extend({
        template: _.template(ActorMoviesTemplate),
        model: ActorMovies,
        collection: ActorMoviesCollection,
        el: '#main_container',
        events:{
            "click #btn-trailer": "showTrailer",
        },

        initialize: function () {

            _.bindAll(this, 'render');

            var self = this;

            this.collection.bind('change', function () {
                self.render();
            });
        },

        render: function (id) {
            var that = this;
            var actorMoviesCollection = new ActorMoviesCollection({});
            actorMoviesCollection.url = URL + '/actors/'+id.id+'/movies';
            actorMoviesCollection.fetch({
                success: function(data){
                    that.$el.append(that.template({results: data.toJSON()}));

                }
            })
        },

        showTrailer: function(event){

            var index = event.target.name;
            if($('#video-trailer-'+index).is( ":hidden" )){
                Utils.searchTrailer($('#video-trailer-'+index).attr('name'),function(src){
                    $('#trailer-'+index).attr('src', src)
                    $('#video-trailer-'+index).show()});
            }
            else {
                $('#video-trailer-'+index).hide();
            }
        }
    });

    return ActorMoviesView;
});
