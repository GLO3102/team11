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

        showTrailer: function(){
            console.log("allo");
            if($('#video-trailer').is( ":hidden" )){

                Utils.searchTrailer(this.movie.name,function(src){
                    $('#trailer').attr('src', src)
                    $('#video-trailer').show()});
            }
            else {
                $('#video-trailer').hide();
            }
        }
    });

    return ActorMoviesView;
});
