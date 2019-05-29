(function(wh, undefined) {

    'use strict';

    // Local storage utility
    // Based off https://github.com/marcuswestin/wh.store.js
    wh.store = wh.store || {};

    wh.store.init = (function() {

        var win = wh.win,
            doc = wh.doc,
            localStorageName = 'localStorage',
            scriptTag = 'script',
            storage;
        wh.store.disabled = false;
        wh.store.version = '1.3.17';
        wh.store.set = function(key, value) {};
        wh.store.get = function(key, defaultVal) {};
        wh.store.has = function(key) {
            return wh.store.get(key) !== undefined;
        };
        wh.store.remove = function(key) {};
        wh.store.clear = function() {};
        wh.store.transact = function(key, defaultVal, transactionFn) {
            if (transactionFn == null) {
                transactionFn = defaultVal;
                defaultVal = null;
            }
            if (defaultVal == null) {
                defaultVal = {};
            }
            var val = wh.store.get(key, defaultVal);
            transactionFn(val);
            wh.store.set(key, val);
        };
        wh.store.getAll = function() {};
        wh.store.forEach = function() {};
        wh.store.serialize = function(value) {
            return JSON.stringify(value);
        };
        wh.store.deserialize = function(value) {
            if (typeof value != 'string') {
                return undefined;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        };

        // Functions to encapsulate questionable FireFox 3.6.13 behavior
        // when about.config::dom.storage.enabled === false
        // See https://github.com/marcuswestin/wh.store.js/issues#issue/13
        function isLocalStorageNameSupported() {
            try {
                return (localStorageName in win && win[localStorageName]);
            } catch (err) {
                return false;
            }
        }

        if (isLocalStorageNameSupported()) {
            storage = win[localStorageName];
            wh.store.set = function(key, val) {
                if (val === undefined) {
                    return wh.store.remove(key);
                }
                storage.setItem(key, wh.store.serialize(val));
                return val;
            };
            wh.store.get = function(key, defaultVal) {
                var val = wh.store.deserialize(storage.getItem(key));
                return (val === undefined ? defaultVal : val);
            };
            wh.store.remove = function(key) {
                storage.removeItem(key);
            };
            wh.store.clear = function() {
                storage.clear();
            };
            wh.store.getAll = function() {
                var ret = {};
                wh.store.forEach(function(key, val) {
                    ret[key] = val;
                });
                return ret;
            };
            wh.store.forEach = function(callback) {
                for (var i = 0; i < storage.length; i++) {
                    var key = storage.key(i);
                    callback(key, wh.store.get(key));
                }
            };
        } else if (doc.documentElement.addBehavior) {
            var storageOwner,
                storageContainer;
            // Since #userData storage applies only to specific paths, we need to
            // somehow link our data to a specific path.  We choose /favicon.ico
            // as a pretty safe option, since all browsers already make a request to
            // this URL anyway and being a 404 will not hurt us here.  We wrap an
            // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
            // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
            // since the iframe access rules appear to allow direct access and
            // manipulation of the document element, even for a 404 page.  This
            // document can be used instead of the current document (which would
            // have been limited to the current path) to perform #userData storage.
            try {
                storageContainer = new ActiveXObject('htmlfile');
                storageContainer.open();
                storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>');
                storageContainer.close();
                storageOwner = storageContainer.w.frames[0].document;
                storage = storageOwner.createElement('div');
            } catch (e) {
                // somehow ActiveXObject instantiation failed (perhaps some special
                // security settings or otherwse), fall back to per-path storage
                storage = doc.createElement('div');
                storageOwner = doc.body;
            }
            var withIEStorage = function(storeFunction) {
                return function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    args.unshift(storage);
                    // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                    // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                    storageOwner.appendChild(storage);
                    storage.addBehavior('#default#userData');
                    storage.load(localStorageName);
                    var result = storeFunction.apply(store, args);
                    storageOwner.removeChild(storage);
                    return result;
                };
            };

            // In IE7, keys cannot start with a digit or contain certain chars.
            // See https://github.com/marcuswestin/wh.store.js/issues/40
            // See https://github.com/marcuswestin/wh.store.js/issues/83
            var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            var ieKeyFix = function(key) {
                return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___');
            };
            wh.store.set = withIEStorage(function(storage, key, val) {
                key = ieKeyFix(key);
                if (val === undefined) {
                    return wh.store.remove(key);
                }
                storage.setAttribute(key, wh.store.serialize(val));
                storage.save(localStorageName);
                return val;
            });
            wh.store.get = withIEStorage(function(storage, key, defaultVal) {
                key = ieKeyFix(key);
                var val = wh.store.deserialize(storage.getAttribute(key));
                return (val === undefined ? defaultVal : val);
            });
            wh.store.remove = withIEStorage(function(storage, key) {
                key = ieKeyFix(key);
                storage.removeAttribute(key);
                storage.save(localStorageName);
            });
            wh.store.clear = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes;
                storage.load(localStorageName);
                while (attributes.length) {
                    storage.removeAttribute(attributes[0].name);
                }
                storage.save(localStorageName);
            });
            wh.store.getAll = function(storage) {
                var ret = {};
                wh.store.forEach(function(key, val) {
                    ret[key] = val;
                });
                return ret;
            };
            wh.store.forEach = withIEStorage(function(storage, callback) {
                var attributes = storage.XMLDocument.documentElement.attributes;
                for (var i = 0, attr; attr = attributes[i]; ++i) {
                    callback(attr.name, wh.store.deserialize(storage.getAttribute(attr.name)));
                }
            });
        }

        try {
            var testKey = '__storejs__';
            wh.store.set(testKey, testKey);
            if (wh.store.get(testKey) != testKey) {
                wh.store.disabled = true;
            }
            wh.store.remove(testKey);
        } catch (e) {
            wh.store.disabled = true;
        }

        wh.store.enabled = !wh.store.disabled;
    })();

})(window.wh = window.wh || {});