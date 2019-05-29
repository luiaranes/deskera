
/**
* wh.track
* @module wh.track
* Describes tracking/referrer analytics
*/

;
(function(wh, undefined) {

    'use strict';

    // Track
    wh.trackga = wh.trackga || {};


    // Attribute to look for in tracking events
    // Event tracking attribute should look like data-ga="category/action/label"
    // Event will be sent using ga('send', 'event', 'category', 'action', 'label');
    var attribute = "data-ga";


    /**
     * Send event details to GA
     *
     * @method send
     * @param {Object} Element with tracking attribute
     * @return -
     **/
    function sendga(el) {
        var attr = el.getAttribute("data-ga");
        if (attr) {
            attr = attr.split("/");
        }
        ga('send', 'event', attr[0], attr[1], attr[2]);
/*          console.log(attr);
            console.log(attr[0]);
            console.log(attr[1]);
            console.log(attr[2]);
*/
};


/**
 * Going up the DOM to find closest parent with required attribute
 *
 * @method parent
 * @param {object} Element to start from
 * @return {HTMLCollection || false}
 **/
function parent(el) {
    var oldel = el;
    while (el.nodeType === 1 && !el.hasAttribute(attribute)) {
        el = el.parentNode;
        if (!el) {
            return null;
        }
    }
    return (el !== oldel && el.nodeType === 1 && el.hasAttribute(attribute)) ? el : false;
};


/**
 * Attach event listener to the document on document ready
 *
 * @method attach
 * @return
 **/
wh.trackga.attach = (function() {
    wh.doc.addEventListener("DOMContentLoaded", function() {
        wh.doc.addEventListener("click", function(e) {
            var e = e || window.event;
            var el = e.target || e.srcElement;
            if (!el.hasAttribute(attribute)) {
                var el = parent(el);
                if (el) {
                    sendga(el);
                }
            } else {
                sendga(el);
            }

        }, !1);
    }, !1);
})();

wh.trackga.send = function(eventCategory, eventAction, eventLabel, eventValue) {
    ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
};
})(window.wh = window.wh || {});