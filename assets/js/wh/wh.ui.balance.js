/**
 * wh.ui
 * @module wh.ui.balance
 * Describes hide/show balance functionality in the header
 */

;
(function(wh, undefined) {

    'use strict';

    wh.ui = wh.ui || {};
    wh.ui.balance = wh.ui.balance || {};

    var balanceEl = '',
        toggleEl = '',
        balanceElId = 'js-headerBalance',
        toggleElId = 'js-toggleBalance',
        openClass = 'is-open';


    /**
     * Open balance
     * @method wh.ui.balance.open
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.balance.open = function () {
        balanceEl.className += ' ' + openClass;
        wh.store.set('balanceState', openClass);
    };


    /**
     * Close balance
     * @method wh.ui.balance.close
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.balance.close = function () {
        balanceEl.className = balanceEl.className.replace(openClass,'');
        wh.store.set('balanceState', '');
    };


    /**
     * Update status on load
     * @method wh.ui.balance.toggle
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.balance.toggle = function() {
        if ( wh.store.get('balanceState') === openClass || typeof wh.store.get('balanceState') === 'undefined' ) {
            wh.ui.balance.open();
        } else {
            wh.ui.balance.close();
        }
    };


    /**
     * Update status on click
     * @method wh.ui.balance.click
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.balance.clicked = function () {
        if ( balanceEl.className.indexOf(openClass) >= 0 ) {
            wh.ui.balance.close();
        } else {
            wh.ui.balance.open();
        }
    };


    /**
     * Initialize
     * @method wh.ui.balance.init
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.balance.init = (function() {
        wh.ready(function(){
            balanceEl = wh.id(balanceElId);
            toggleEl = wh.id(toggleElId);
            if (balanceEl) {
                wh.ui.balance.toggle();
                toggleEl.addEventListener('click', function() {
                    wh.ui.balance.clicked();
                });
            }
        });
    })();

})(window.wh = window.wh || {});
