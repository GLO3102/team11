/**
 * Created by Timothée on 05/11/2015.
 */

define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'collection/moviesCollection'
], function(Backbone,_,$,Bootstrap, MoviesCollection){

    var WatchListModel = Backbone.Model.extend({
        url: URL + '/watchlists',
        defaults: {
                name: '',
                owner: ''
        }

        /*parse: function(response){
            console.log(response);
            this.id = response.id;
            return response;
        },*/

       /* validate: function(attrs){
            if(!attrs.name || !attrs.owner || attrs.name === '' || attrs.owner === ''){
                return 'Please enter a valid name or/and a valid owner !';
            }
        }*/
    });

    return WatchListModel;

});