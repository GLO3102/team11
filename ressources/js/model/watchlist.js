/**
 * Created by Timoth�e on 05/11/2015.
 */

define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap'
], function(Backbone,_,$,Bootstrap){

    var WatchListModel = Backbone.Model.extend({
        defaults: {
                name: '',
                owner: '',
                movies: []
        },

        validate: function(attrs){
            if(!attrs.name ||  attrs.name === '' ){
                $('#alert').fadeIn();
                return 'Please enter a valid name !';
            }
        }
    });

    return WatchListModel;

});