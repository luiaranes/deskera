(function (wh, undefined) {

    'use strict';

    wh.intercom = wh.intercom || {};

    wh.intercom.publishClickEvent = function (targetName) {
        wh.ajax.post({ url: wh.app.root + '/Intercom/PublishClickEvent', data: { targetName: targetName } });
    };

})(window.wh = window.wh || {});