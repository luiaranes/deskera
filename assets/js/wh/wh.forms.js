/**
 * wh.ui
 * @module wh.ui.togglePassword
 * Describes forms related functionality
 */

;
(function(wh, undefined) {

    'use strict';

    // Forms related module
    wh.ui = wh.ui || {};


    /**
     * Snow/Hide password
     *
     * @method wh.forms.togglePassword
     * @param {Elements Classname} Classname of an input field to process
     *
     *  <input type="password" class="wh-ui-toggle-password">
     *  <a href="#" class="btn" data-default-text="Show" data-alt-text="Hide"></a>
     *
     **/
    wh.ui.togglePassword = function(elclass) {
        var inputs = wh.class(elclass);
        for (var i = 0; i < inputs.length; i++) {
            var button = inputs[i].nextElementSibling;
            button.addEventListener('click', function() {
                var input = this.previousElementSibling;
                input.type.toLowerCase() === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
                return false;
            }, false);
        }
    };

})(window.wh = window.wh || {});