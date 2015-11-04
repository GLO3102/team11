define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'text!template/genres_Template.html'
], function(Backbone,_,$,Bootstrap,GenreTemplate){

    var GenreView = Backbone.View.extend({
        template: _.template(GenreTemplate),
        initialize:function(){
            _.bindAll(this,'render');
            var self = this;
            self.collection.bind('sync',function(){
                self.render();
            })
        },
        render: function(){
            console.log(this.collection);
           this.$el.html(this.template({genres:this.collection.toJSON()}));
        }

    });
    return GenreView;
});

