/**
 * Created by Timoth�e on 02/11/2015.
 */
formatdate = function(date){
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    return day + ' ' + monthNames[month] + ' ' + year;
};

formattime = function(time){
    var x = Math.floor(time / 1000);
    var seconds = x % 60;
    x = Math.floor(x / 60);
    var minutes = x % 60;
    x = Math.floor(x / 60);
    var hours = x %24;
    return hours + ' ' + 'hours' + ' ' + minutes + ' ' + 'minutes' + ' ' + seconds + ' ' + 'seconds';
}

formatImageSize = function(str){
    var cpy = str.replace("100x100", "400x400");
    return cpy;
}

define([
    'jquery',
    'underscore',
    'backbone',
    'auth',
    'googleAPI'
], function($, _, Backbone,Auth, GoogleAPI){
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});