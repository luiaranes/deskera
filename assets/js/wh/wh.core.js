/**
 * wh
 * @module wh
 * Defines core ui functions.
 */
;
(function(wh, undefined) {

    'use strict';



    // Common use inside wh: document/window/html
    wh.doc = typeof document !== 'undefined' && document;
    wh.win = typeof window !== 'undefined' && window;
    wh.html = wh.doc.documentElement;



    /**
     * Document ready check
     *
     * @method ready
     * @param  {fn} function to run on event
     * @return {fn} function to run on event
     **/
    wh.ready = function(fn) {
        if (typeof fn !== 'function')
        {
            throw new Error('wh.ready: no fn');
        }
        if (wh.doc.readyState === 'complete' || wh.doc.readyState === 'interactive') {
            return fn();
        }
        wh.doc.addEventListener( 'DOMContentLoaded', fn, false );
        // load
        // document.addEventListener( 'complete', fn, false );
    };



    // Common use inside wh: body/head
    wh.ready(function(){
        wh.body = wh.doc.body;
        wh.head = wh.doc.getElementsByTagName("head")[0];
    });



    /**
     * Alias to document.getElementById
     *
     * @method id
     * @param {String} id Element ID
     * @return {DOMElement}
     **/
    wh.id = function(id) {
        if (!id) {
            throw new Error('wh.id: no param');
        } else if (typeof id === 'string') {
            return wh.doc.getElementById(id);
        } else {
            return null;
        }
    };


    /**
     * Alias to document.getElementsByClassName
     *
     * @method class
     * @param {String} class Elements class name
     * @return {HTMLCollection}
     **/
    wh.class = function(clas) {
        if (!clas) {
            throw new Error('wh.class: no param');
        } else if (typeof clas === 'string') {
            return wh.doc.getElementsByClassName(clas);
        } else {
            return null;
        }
    };


    /**
     * Alias to document.getElementsByTagName
     *
     * @method tag
     * @param {String} tag Elements tag name
     * @return {HTMLCollection}
     **/
    wh.tag = function(tag) {
        if (!tag) {
            throw new Error('wh.tag: no param');
        } else if (typeof tag === 'string') {
            return wh.doc.getElementsByTagName(tag);
        } else {
            return null;
        }
    };


    /**
     * Gets offset of passed through element
     *
     * @param  {obj} element DOM element
     * @return {obj} left and top offset to screen
     **/
    wh.elementOffset = function(element) {
        element = element.getBoundingClientRect();

        return {
            left: element.left + window.pageXOffset,
            top: element.top + window.pageYOffset,
            height: element.height,
            width: element.width
        };
    };


    /**
     * Set css styles on element
     *
     * @param {obj} element selected element
     * @param {obj} styles object of css properties
     **/
    wh.setStyles = function(element, styles) {
        for(var prop in styles) {
            element.style[prop] = styles[prop];
        }
    };


    /**
     * Calls native console.log if available.
     *
     * @method log
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.log = function() {
        // IE does not have console.log.apply in IE10 emulated mode
        var console = wh.win.console;
        if (console && console.log) {
            Function.prototype.apply.call(console.log, console, arguments);
        }
    };


    /**
     * Dynamically load a javascript file
     *
     * @method loadjs
     * @param {string} JS_FILE_PATH js file needed to be loaded
     **/
    wh.loadjs = function(file) {
        if (!file) {
            throw new Error('wh.loadjs: no param');
        }
        var el = wh.doc.createElement('script');
        el.type = 'text/javascript';
        el.src = file;
        el.async = true;

        if (typeof el !== 'undefined') {
            wh.head.appendChild(el);
        }
        return;
    };



    /**
     * Get query string parameters
     *
     * @method loadjs
     * @param {string} parameter to look for
     **/
    wh.query = function(param) {
        var url = window.location.search.substring(1);
        var urlVars = url.split('&');
        for (var i = 0; i < urlVars.length; i++) {
            var paramName = urlVars[i].split('=');
            if (paramName[0] == param) {
                return paramName[1];
            }
        }
    };



    /**
     * Generate uuid
     *
     * @method uuid
     * @param {Any} [args*] Arguments to be evaluated
     **/

    wh.uuid = function() {
        var lut = [];
        for ( var i=0; i<256; i++ ) {
            lut[i] = ( i < 16 ? '0' : '') + (i).toString(16);
        }
        var d0 = Math.random()*0xffffffff|0;
        var d1 = Math.random()*0xffffffff|0;
        var d2 = Math.random()*0xffffffff|0;
        var d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    };

})(window.wh = window.wh || {});
