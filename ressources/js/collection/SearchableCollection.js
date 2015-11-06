define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var SearchableCollection = Backbone.Collection.extend({},{
        search: function(query, options){
            var search = $.Deferred();
            options = options || {};
            var collection = new this([], options);
            collection.url = _.result(collection, 'url') + '/search?q=' +query;
            var fetch = collection.fetch();
            fetch.done(_.bind(function(){
                Backbone.Events.trigger('search:done');
                search.resolveWith(this, [collection]);
            }, this));
            fetch.fail(function(){
                Backbone.Events.trigger('search:fail');
                search.reject();
            });
            return search.promise();
        }


    });


    return SearchableCollection ;

});