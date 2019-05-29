/**
 * wh.app
 * @module wh.app.root, wh.app.theme
 * Describes this appplication specific properties
 */

;
(function(wh, undefined) {

    'use strict';

    // Application specific properties
    wh.app = wh.app || {};


    /**
     * Application root URL, used for AJAX requests
     *
     * @method wh.app.root
     * @param {Any} [args*] Arguments to be evaluated
     * @return {String} Application root url.
     **/
    wh.app.root = (function() {
        return wh.doc.getElementById("app-base") ? wh.doc.getElementById("app-base").getAttribute("content") : wh.win.location.protocol + '//' + wh.win.location.host + '/';
    })();


    /**
     * Silks URL, used for getting URL of Silks for race cards
     *
     * @method wh.app.silks
     * @param {Any} [args*] Arguments to be evaluated
     * @return {String} Silks location url.
     **/
    wh.app.silks = (function() {
        return wh.app.root + 'images/silks/';
    })();


    /**
     * Application theme
     *
     * @method wh.app.theme
     * @param {Any} [args*] Arguments to be evaluated
     * @return {String} Application root url.
     **/
    wh.app.theme = (function() {
    })();

})(window.wh = window.wh || {});


////////////////////////////////
var respUI = {

    // User details
    User: {
        PIN: "NA",
        Status: "guest",
        Verified: "False"
    }

};
////////////////////////////////
