
/**
* wh.tabs
* @module wh.tabs
* Tab functionality
*/

;
(function(wh, undefined) {

    'use strict';

    // UI & browser related module
    wh.tabs = wh.tabs || {};
    wh.tabs.init = function($this) {

        // save all vars
        var active = false,
            target = $("#" + $this.attr("data-js-tab")),
            context = $this.parents(".js-tabs");

        // add dim
        target.append('<div class="dim white is-active"></div>');

        // sort out menu classes
        $this.hasClass("is-active") ? active = true : false;
        $this.siblings().removeClass("is-active");

        // sort out tab classes
        if (!active) {
            $this.addClass("is-active");
            context.find(".js-tab").removeClass("is-active");
            target.addClass("is-active");
        }

        // remove dim
        target.find(".dim").remove();

    };

    wh.tabs.events = (function() {
        jQuery(document).ready(function($) {
            $(document).on('click', '.js-tabs [data-js-tab]', function (e) {
                e.preventDefault();
                wh.tabs.init($(this));
            });
        });
    })();

})(window.wh = window.wh || {});