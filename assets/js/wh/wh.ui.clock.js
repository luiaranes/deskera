/**
 * wh.ui
 * @module wh.ui.clock
 * Describes clock and session timer in the right sidebar
 */

;
(function(wh, undefined) {

    'use strict';

    wh.ui = wh.ui || {};
    wh.ui.clock = wh.ui.clock || {};



    var clockElId = 'js-clockClock',
        zoneElId = 'js-clockZone',
        timerElId = 'js-clockTimer',
        dateNow = new Date(),
        dateString = dateNow.toString(),
        timezone = (dateString.indexOf('(') > -1 ? dateString.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') : dateString.match(/[A-Z]{3,4}/)[0]).replace('AUS','A'),
        timerStart = dateNow - (wh.cookie.get('clockTimer') && !isNaN(wh.cookie.get('clockTimer')) ? wh.cookie.get('clockTimer') : 0),
        timerSave;



    /**
     * Update clock every other second
     * @method wh.ui.clock.update
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.clock.update = function (clockEl) {
        var timerEl = wh.id(timerElId);
        setTimeout(function() {
            wh.ui.clock.time(clockEl);
            wh.ui.clock.timer(timerEl);
        }, 1000);
    };



    /**
     * Get and display current time
     * @method wh.ui.clock.time
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.clock.time = function (clockEl) {
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            time = hours + ':' + ('0' + minutes).slice(-2);
            if (clockEl !== null && typeof clockEl !== "undefined") {
                clockEl.innerHTML = time;
                wh.ui.clock.update(clockEl);
            }
    };



    /**
     * Transform milliseconds to clock format
     * @method wh.ui.clock.transform
     * @param {t} [args*] Time in milliseconds
     **/
    wh.ui.clock.transform = function (t) {
        if( t >= 86400000 ) {
            t = 0;
        }
        var h = ('0' + Math.floor((t/(1000*60*60))%24)).slice(-2);
        var m = ('0' + Math.floor((t/(1000*60))%60)).slice(-2);
        var s = ('0' + Math.floor((t/1000)%60)).slice(-2);
        return h+':'+m+':'+s;
    }



    /**
     * Calculated spent time and update timer
     * @method wh.ui.clock.timer
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.clock.timer = function (el) {
        var newDate = new Date();
        timerSave = newDate - timerStart;
        el.innerHTML = 'Session Time<br />' + wh.ui.clock.transform(newDate-timerStart);
    }



    /**
     * Get and display current timezone separately so we do not have to update it every second
     * @method wh.ui.clock.zone
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.clock.zone = (function () {
        wh.ready(function(){
            var zoneEl = wh.id(zoneElId);
            if (zoneEl !== null && typeof zoneEl !== "undefined") {
                zoneEl.innerHTML = timezone;
            }
        });
    })();



    /**
     * Initialize
     * @method wh.ui.clock.init
     * @param {Any} [args*] Arguments to be evaluated
     **/
    wh.ui.clock.init = (function() {
        wh.ready(function(){
            var clockEl = wh.id(clockElId);
            wh.ui.clock.time(clockEl);
        });
        wh.win.onbeforeunload = function(){
            wh.cookie.set('clockTimer',timerSave);
        }
    })();

})(window.wh = window.wh || {});
