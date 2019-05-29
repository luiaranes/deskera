/**
 * wh.dim
 * @module wh.dim.element, wh.dim.open, wh.ui.close, wh.ui.onescape
 * Describes simple screen dimming plugin
 */

;
(function(wh, undefined) {

    'use strict';

    // Dim screen
    wh.dim = wh.dim || {};

    // Common variables
    var dimId = 'dim',
        htmlActive = 'js-dim-is-active';


    /**
     * Creates a dim element in the body
     *
     * @method wh.dim.element
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Returns created element
     **/
    wh.dim.element = (function() {
        var el = wh.doc.createElement('div');
        el.id = dimId;
        el.className += ' dim black';
        wh.body.appendChild(el);
        return el;
    })();


    /**
     * Opens dim by adding a class to html element
     *
     * @method wh.dim.open
     * @param {z|load}  Z index to override and to show loader or not
     **/
    wh.dim.open = function(z) {
        z = z || 12000;
        if (!wh.html.className.match(htmlActive) && wh.dim.element) {
            wh.html.className += ' ' + htmlActive;
            wh.dim.element.style.zIndex = z;
        }
    };


    /**
     * Closes dim by removing a class from html element and resetting z-index on dim element
     *
     * @method wh.dim.close
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.dim.close = function() {
        if (wh.html.className.match(htmlActive) && wh.dim.element) {
            wh.html.className = wh.html.className.replace(htmlActive, '');
            wh.dim.element.style.zIndex = 'auto';
        }
    };


    /**
     * Closes dim on escape key
     *
     **/
    wh.doc.onescape = function(e) {
        e = e || wh.win.event;
        if (e.keyCode === 27) { // escape
            wh.dim.close();
        }
    };

})(window.wh = window.wh || {});