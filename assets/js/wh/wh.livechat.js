(function (wh, undefined) {

    'use strict';

    wh.livechat = wh.livechat || {};

    wh.livechat.onClick = function () {
        wh.intercom.publishClickEvent('LiveChat');
        window.open('https://server.iad.liveperson.net/hc/33290757/?cmd=file&file=visitorWantsToChat&site=33290757&SESSIONVAR!skill=WilliamHill%20Support&imageUrl=https://server.iad.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a&referrer=' + escape(document.location), 'chat33290757', 'width=472,height=360,resizable=yes');
    };

})(window.wh = window.wh || {});