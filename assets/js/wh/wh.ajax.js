(function(wh, undefined) {

    'use strict';

    wh.ajax = wh.ajax || {};
    wh.ajax.defaultConfiguration = { async: true };

    wh.ajax.post = function(configuration) {
        $.ajax({
            type: "POST",
            url: configuration.url,
            async: configuration.async !== 'undefined' ? configuration.async : this.defaultConfiguration.async,
            data: configuration.data,
            success: function(response) {
                if (configuration.onSuccess) {
                    configuration.onSuccess(response);
                }
            }
        });
    };

})(window.wh = window.wh || {});