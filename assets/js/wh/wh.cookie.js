/**
 * wh.cookie
 * @module wh.cookie.set, wh.cookie.get, wh.cookie.erase
 * Describes cookies related functionality
 * Please note: we use decodeURIComponent/encodeURIComponent instead of encodeURI/decodeURI
 */

;
(function(wh, undefined) {

    'use strict';

    // User related module
    wh.cookie = wh.cookie || {};


    /**
     * Set cookie name/value and lifetime in days. Default lifetime is session if days are not specified
     *
     * @method wh.cookie.set
     * @param {name|value|days} Name and value of the cookie to set. Number of days to store the cookie for
     *
     **/
    wh.cookie.set = function(name, value, days, domain) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }
        domain = typeof domain === 'undefined' ? '' : '; domain=' + domain;
        wh.doc.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/' + domain;
    };


    /**
     * Get cookie value with specified name
     *
     * @method wh.cookie.get
     * @param {name} Name of the cookie to get
     *
     **/
    wh.cookie.get = function(name) {
        var nameEQ = name + '=';
        var ca = wh.doc.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    };


    /**
     * Erase cookie with specified name
     *
     * @method wh.cookie.erase
     * @param {name} Name of the cookie to erase
     *
     **/
    wh.cookie.erase = function(name) {
        wh.cookie.set(name, '', -1);
    };

})(window.wh = window.wh || {});
