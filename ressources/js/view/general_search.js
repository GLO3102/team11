define([
'backbone',
'underscore',
'jquery',
'bootstrap',
'text!template/search_results_Template.html'
], function(Backbone,_,$,Bootstrap,GSTemplate){

var General_SearchView = Backbone.View.extend({
    template: _.template(GSTemplate),
    el: $("#main_container"),
    render: function(){
        this.$el.html(this.template({results:this.collection.toJSON()}));
    }

});

return General_SearchView;

});
