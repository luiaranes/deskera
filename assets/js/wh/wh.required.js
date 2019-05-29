/**
 *
 * Includes common and required 3rd party functions/shims/plugins
 *
 */


/*!
 * modernizr v3.0.0-alpha.3
 * Build http://v3.modernizr.com/download/#-csstransforms-csstransforms3d-flash-getusermedia-localstorage-peerconnection-svg-domprefixes-prefixes-shiv-testallprops-testprop-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Alexander Farkas
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;
(function(window, document, undefined) {
    var classes = [];


    // Take the html5 variable out of the
    // html5shiv scope so we can return it.
    var html5;
    /**
    * @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
    */
    ;
    (function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.2';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
            try {
                var a = document.createElement('a');
                a.innerHTML = '<xyz></xyz>';
                //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
                supportsHtml5Styles = ('hidden' in a);

                supportsUnknownElements = a.childNodes.length == 1 || (function() {
                    // assign a false positive if unable to shiv
                    (document.createElement)('a');
                    var frag = document.createDocumentFragment();
                    return (
                        typeof frag.cloneNode == 'undefined' ||
                            typeof frag.createDocumentFragment == 'undefined' ||
                            typeof frag.createElement == 'undefined'
                    );
                }());
            } catch (e) {
                // assign a false positive if detection fails => unable to shiv
                supportsHtml5Styles = true;
                supportsUnknownElements = true;
            }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement('p'),
                parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

            p.innerHTML = 'x<style>' + cssText + '</style>';
            return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
            var elements = html5.elements;
            return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Extends the built-in list of html5 elements
         * @memberOf html5
         * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
         * @param {Document} ownerDocument The context document.
         */
        function addElements(newElements, ownerDocument) {
            var elements = html5.elements;
            if (typeof elements != 'string') {
                elements = elements.join(' ');
            }
            if (typeof newElements != 'string') {
                newElements = newElements.join(' ');
            }
            html5.elements = elements + ' ' + newElements;
            shivDocument(ownerDocument);
        }

        /**
        * Returns the data associated to the given document
        * @private
        * @param {Document} ownerDocument The document.
        * @returns {Object} An object of data.
        */
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            if (!data) {
                data = {};
                expanID++;
                ownerDocument[expando] = expanID;
                expandoData[expanID] = data;
            }
            return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createElement(nodeName);
            }
            if (!data) {
                data = getExpandoData(ownerDocument);
            }
            var node;

            if (data.cache[nodeName]) {
                node = data.cache[nodeName].cloneNode();
            } else if (saveClones.test(nodeName)) {
                node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            } else {
                node = data.createElem(nodeName);
            }

            // Avoid adding some elements to fragments in IE < 9 because
            // * Attributes like `name` or `type` cannot be set/changed once an element
            //   is inserted into a document/fragment
            // * Link elements with `src` attributes that are inaccessible, as with
            //   a 403 response, will cause the tab/window to crash
            // * Script elements appended to fragments will execute when their `src`
            //   or `text` property is set
            return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createDocumentFragment();
            }
            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode(),
                i = 0,
                elems = getElements(),
                l = elems.length;
            for (; i < l; i++) {
                clone.createElement(elems[i]);
            }
            return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
            if (!data.cache) {
                data.cache = {};
                data.createElem = ownerDocument.createElement;
                data.createFrag = ownerDocument.createDocumentFragment;
                data.frag = data.createFrag();
            }


            ownerDocument.createElement = function(nodeName) {
                //abort shiv
                if (!html5.shivMethods) {
                    return data.createElem(nodeName);
                }
                return createElement(nodeName, ownerDocument, data);
            };

            ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                'var n=f.cloneNode(),c=n.createElement;' +
                'h.shivMethods&&(' +
                // unroll the `createElement` calls
                getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                    data.createElem(nodeName);
                    data.frag.createElement(nodeName);
                    return 'c("' + nodeName + '")';
                }) +
                ');return n}'
            )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            var data = getExpandoData(ownerDocument);

            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                data.hasCSS = !!addStyleSheet(ownerDocument,
                    // corrects block display not defined in IE6/7/8/9
                    'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                    // adds styling not present in IE6/7/8/9
                    'mark{background:#FF0;color:#000}' +
                    // hides non-rendered elements
                    'template{display:none}'
                );
            }
            if (!supportsUnknownElements) {
                shivMethods(ownerDocument, data);
            }
            return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

            /**
             * An array or space separated string of node names of the elements to shiv.
             * @memberOf html5
             * @type Array|String
             */
            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

            /**
             * current version of html5shiv
             */
            'version': version,

            /**
             * A flag to indicate that the HTML5 style sheet should be inserted.
             * @memberOf html5
             * @type Boolean
             */
            'shivCSS': (options.shivCSS !== false),

            /**
             * Is equal to true if a browser supports creating unknown/HTML5 elements
             * @memberOf html5
             * @type boolean
             */
            'supportsUnknownElements': supportsUnknownElements,

            /**
             * A flag to indicate that the document's `createElement` and `createDocumentFragment`
             * methods should be overwritten.
             * @memberOf html5
             * @type Boolean
             */
            'shivMethods': (options.shivMethods !== false),

            /**
             * A string to describe the type of `html5` object ("default" or "default print").
             * @memberOf html5
             * @type String
             */
            'type': 'default',

            // shivs the document according to the specified `html5` object options
            'shivDocument': shivDocument,

            //creates a shived element
            createElement: createElement,

            //creates a shived documentFragment
            createDocumentFragment: createDocumentFragment,

            //extends list of elements
            addElements: addElements
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));


    var tests = [];


    var ModernizrProto = {
        // The current version, dummy
        _version: '3.0.0-alpha.3',

        // Any settings that don't work as separate modules
        // can go in here as configuration.
        _config: {
            'classPrefix': '',
            'enableClasses': true,
            'enableJSClass': true,
            'usePrefixes': true
        },

        // Queue of tests
        _q: [],

        // Stub these for people who are listening
        on: function(test, cb) {
            // I don't really think people should do this, but we can
            // safe guard it a bit.
            // -- NOTE:: this gets WAY overridden in src/addTest for
            // actual async tests. This is in case people listen to
            // synchronous tests. I would leave it out, but the code
            // to *disallow* sync tests in the real version of this
            // function is actually larger than this.
            var self = this;
            setTimeout(function() {
                cb(self[test]);
            }, 0);
        },

        addTest: function(name, fn, options) {
            tests.push({ name: name, fn: fn, options: options });
        },

        addAsyncTest: function(fn) {
            tests.push({ name: null, fn: fn });
        }
    };


    // Fake some of Object.create
    // so we can force non test results
    // to be non "own" properties.
    var Modernizr = function() {};
    Modernizr.prototype = ModernizrProto;

    // Leak modernizr globally when you `require` it
    // rather than force it here.
    // Overwrite name so constructor name is nicer :D
    Modernizr = new Modernizr();


/*!
{
  "name": "Local Storage",
  "property": "localstorage",
  "caniuse": "namevalue-storage",
  "tags": ["storage"],
  "knownBugs": [],
  "notes": [],
  "warnings": [],
  "polyfills": [
    "joshuabell-polyfill",
    "cupcake",
    "storagepolyfill",
    "amplifyjs",
    "yui-cacheoffline"
  ]
}
!*/

// In FF4, if disabled, window.localStorage should === null.

// Normally, we could not test that directly and need to do a
//   `('localStorage' in window) && ` test first because otherwise Firefox will
//   throw bugzil.la/365772 if cookies are disabled

// Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
// will throw the exception:
//   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
// Peculiarly, getItem and removeItem calls do not throw.

// Because we are forced to try/catch this, we'll go aggressive.

// Just FWIW: IE8 Compat mode supports these features completely:
//   www.quirksmode.org/dom/html5.html
// But IE8 doesn't support either with local files

Modernizr.addTest('localstorage', function() {
    var mod = 'modernizr';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
});

/*!
{
  "name": "SVG",
  "property": "svg",
  "caniuse": "svg",
  "tags": ["svg"],
  "authors": ["Erik Dahlstrom"],
  "polyfills": [
    "svgweb",
    "raphael",
    "amplesdk",
    "canvg",
    "svg-boilerplate",
    "sie",
    "dojogfx",
    "fabricjs"
  ]
}
!*/
/* DOC
Detects support for SVG in `<embed>` or `<object>` elements.
*/

Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);


// List of property values to set for css tests. See ticket #21
var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);

// expose these for the plugin API. Look in the source for how to join() them against your input
ModernizrProto._prefixes = prefixes;


/**
 * is returns a boolean for if typeof obj is exactly type.
 */
function is(obj, type) {
    return typeof obj === type;
};

// Run through all tests and detect their support in the current UA.
function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        //   then based on that boolean, define an appropriate className
        //   and push it into an array of classes we'll join later.
        //
        //   If there is no name, it's an 'async' test that is run,
        //   but not directly added to the object. That should
        //   be done with a post-run addTest call.
        if (feature.name) {
            featureNames.push(feature.name.toLowerCase());

            if (feature.options && feature.options.aliases && feature.options.aliases.length) {
                // Add all the aliases into the names list
                for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
                    featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                }
            }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
            featureName = featureNames[nameIdx];
            // Support dot properties as sub tests. We don't do checking to make sure
            // that the implied parent tests have been added. You must call them in
            // order (either in the test, or make the parent test a dependency).
            //
            // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
            // hashtag famous last words
            featureNameSplit = featureName.split('.');

            if (featureNameSplit.length === 1) {
                Modernizr[featureNameSplit[0]] = result;
            } else {
                // cast to a Boolean, if not one already
                /* jshint -W053 */
                if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                    Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                }

                Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
            }

            classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
    }
};

var docElement = document.documentElement;


// Pass in an and array of class names, e.g.:
//  ['no-webp', 'borderradius', ...]
function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    // Change `no-js` to `js` (we do this independently of the `enableClasses`
    // option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
        var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
        className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
        // Add the new classes
        className += ' ' + classPrefix + classes.join(' ' + classPrefix);
        docElement.className = className;
    }

};

// Following spec is to expose vendor-specific style properties as:
//   elem.style.WebkitBorderRadius
// and the following would be incorrect:
//   elem.style.webkitBorderRadius

// Webkit ghosts their properties in lowercase but Opera & Moz do not.
// Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
//   erik.eae.net/archives/2008/03/10/21.48.10/

// More here: github.com/Modernizr/Modernizr/issues/issue/21
var omPrefixes = 'Moz O ms Webkit';


var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
ModernizrProto._domPrefixes = domPrefixes;

/*!
{
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
}
!*/

var newSyntax = 'CSS' in window && 'supports' in window.CSS;
var oldSyntax = 'supportsCSS' in window;
Modernizr.addTest('supports', newSyntax || oldSyntax);


var createElement = function() {
    if (typeof document.createElement !== 'function') {
        // This is the case in IE7, where the type of createElement is "object".
        // For this reason, we cannot call apply() as Object is not a Function.
        return document.createElement(arguments[0]);
    } else {
        return document.createElement.apply(document, arguments);
    }
};


function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
        // Can't use the real body create a fake one.
        body = createElement('body');
        body.fake = true;
    }

    return body;
};

// Inject element with style element and some CSS rules
function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
        // In order not to give false positives we create a node for each test
        // This also allows the method to scale for unspecified uses
        while (nodes--) {
            node = createElement('div');
            node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
            div.appendChild(node);
        }
    }

    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
    style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
    div.id = mod;
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;
    body.appendChild(div);
    if (body.fake) {
        //avoid crashing IE8, if background image is used
        body.style.background = '';
        //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
        body.style.overflow = 'hidden';
        docOverflow = docElement.style.overflow;
        docElement.style.overflow = 'hidden';
        docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
        body.parentNode.removeChild(body);
        docElement.style.overflow = docOverflow;
        // Trigger layout so kinetic scrolling isn't disabled in iOS6+
        docElement.offsetHeight;
    } else {
        div.parentNode.removeChild(div);
    }

    return !!ret;

};

var testStyles = ModernizrProto.testStyles = injectElementWithStyles;


// Helper function for converting kebab-case to camelCase,
// e.g. box-sizing -> boxSizing
function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
        return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
};

/**
 * contains returns a boolean for if substr is found within str.
 */
function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
};

var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
ModernizrProto._cssomPrefixes = cssomPrefixes;


// hasOwnProperty shim by kangax needed for Safari 2.0 support
var hasOwnProp;

(function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
        hasOwnProp = function(object, property) {
            return _hasOwnProperty.call(object, property);
        };
    } else {
        hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
            return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
        };
    }
})();


// As far as I can think of, we shouldn't need or
// allow 'on' for non-async tests, and you can't do
// async tests without this 'addTest' module.

// Listeners for async or post-run tests
ModernizrProto._l = {};

// 'addTest' implies a test after the core runloop,
// So we'll add in the events
ModernizrProto.on = function(test, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[test]) {
        this._l[test] = [];
    }

    // Push this test on to the listener list
    this._l[test].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(test)) {
        // Next Tick
        setTimeout(function() {
            Modernizr._trigger(test, Modernizr[test]);
        }, 0);
    }
};

ModernizrProto._trigger = function(test, res) {
    if (!this._l[test]) {
        return;
    }

    var cbs = this._l[test];

    // Force async
    setTimeout(function() {
        var i, cb;
        for (i = 0; i < cbs.length; i++) {
            cb = cbs[i];
            cb(res);
        }
    }, 0);

    // Don't trigger these again
    delete this._l[test];
};

/**
 * addTest allows the user to define their own feature tests
 * the result will be added onto the Modernizr object,
 * as well as an appropriate className set on the html element
 *
 * @param feature - String naming the feature
 * @param test - Function returning true if feature is supported, false if not
 */
function addTest(feature, test) {
    if (typeof feature == 'object') {
        for (var key in feature) {
            if (hasOwnProp(feature, key)) {
                addTest(key, feature[key]);
            }
        }
    } else {

        feature = feature.toLowerCase();
        var featureNameSplit = feature.split('.');
        var last = Modernizr[featureNameSplit[0]];

        // Again, we don't check for parent test existence. Get that right, though.
        if (featureNameSplit.length == 2) {
            last = last[featureNameSplit[1]];
        }

        if (typeof last != 'undefined') {
            // we're going to quit if you're trying to overwrite an existing test
            // if we were to allow it, we'd do this:
            //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
            //   docElement.className = docElement.className.replace( re, '' );
            // but, no rly, stuff 'em.
            return Modernizr;
        }

        test = typeof test == 'function' ? test() : test;

        // Set the value (this is the magic, right here).
        if (featureNameSplit.length == 1) {
            Modernizr[featureNameSplit[0]] = test;
        } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
        }

        // Set a single class (either `feature` or `no-feature`)
        /* jshint -W041 */
        setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
        /* jshint +W041 */

        // Trigger the event
        Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
}

// After all the tests are run, add self
// to the Modernizr prototype
Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
});


/*!
  {
  "name": "Flash",
  "property": "flash",
  "tags": ["flash"],
  "polyfills": ["shumway"]
  }
  !*/
/* DOC
Detects support flash, as well as flash blocking plugins
*/

Modernizr.addAsyncTest(function() {
    /* jshint -W053 */

    var removeFakeBody = function(body) {
        // If we’re rockin’ an attached fake body, clean it up
        if (body.fake && body.parentNode) {
            body.parentNode.removeChild(body);
        }
    };
    var runTest = function(result, embed) {
        var bool = !!result;
        if (bool) {
            bool = new Boolean(bool);
            bool.blocked = (result === 'blocked');
        }
        addTest('flash', function() { return bool; });
        if (embed && body.contains(embed)) {
            body.removeChild(embed);
        }
    };
    var easy_detect;
    var activex;
    // we wrap activex in a try/catch because when flash is disabled through
    // ActiveX controls, it throws an error.
    try {
        // Pan is an API that exists for flash objects.
        activex = 'ActiveXObject' in window && 'Pan' in new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (e) {
    }

    easy_detect = !(('plugins' in navigator && 'Shockwave Flash' in navigator.plugins) || activex);

    if (easy_detect) {
        runTest(false);
    } else {
        // flash seems to be installed, but it might be blocked. We have to
        // actually create an element to see what happens to it.
        var embed = createElement('embed');
        var body = getBody();
        var blockedDetect;
        var inline_style;

        embed.type = 'application/x-shockwave-flash';
        embed.style.width = 0;

        // Need to do this in the body (fake or otherwise) otherwise IE8 complains
        body.appendChild(embed);
        docElement.appendChild(body);

        // Pan doesn't exist in the embed if its IE (its on the ActiveXObjeect)
        // so this check is for all other browsers.
        if (!('Pan' in embed) && !activex) {
            runTest('blocked', embed);
            removeFakeBody(body);
            return;
        }

        blockedDetect = function() {
            // if we used a fake body originally, we need to restart this test, since
            // we haven't been attached to the DOM, and therefore none of the blockers
            // have had time to work.
            if (!docElement.contains(body)) {
                body = document.body || body;
                embed = document.createElement('embed');
                embed.type = 'application/x-shockwave-flash';
                embed.style.width = 0;
                body.appendChild(embed);
                return setTimeout(blockedDetect, 1000);
            }
            if (!docElement.contains(embed)) {
                runTest('blocked');
            } else {
                inline_style = embed.style.cssText;
                if (inline_style !== '') {
                    // the style of the element has changed automatically. This is a
                    // really poor heuristic, but for lower end flash blocks, it the
                    // only change they can make.
                    runTest('blocked', embed);
                } else {
                    runTest(true, embed);
                }
            }
            removeFakeBody(body);
        };

        // If we have got this far, there is still a chance a userland plugin
        // is blocking us (either changing the styles, or automatically removing
        // the element). Both of these require us to take a step back for a moment
        // to allow for them to get time of the thread, hence a setTimeout.
        //
        setTimeout(blockedDetect, 10);
    }
});


/**
 * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
 * some prefixed form, or false, in the case of an unsupported rule
 *
 * @param prop - String naming the property to test
 */

var atRule = function(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
        return undefined;
    }

    if (!prop) {
        return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
        return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
        // prefixes gives us something like -o-, and we want O_
        var prefix = prefixes[i];
        var thisRule = prefix.toUpperCase() + '_' + rule;

        if (thisRule in cssrule) {
            return '@-' + prefix.toLowerCase() + '-' + prop;
        }
    }

    return false;
};


/**
 * Create our "modernizr" element that we do most feature tests on.
 */
var modElem = {
    elem: createElement('modernizr')
};

// Clean up this element
Modernizr._q.push(function() {
    delete modElem.elem;
});


var mStyle = {
    style: modElem.elem.style
};

// kill ref for gc, must happen before
// mod.elem is removed, so we unshift on to
// the front of the queue.
Modernizr._q.unshift(function() {
    delete mStyle.style;
});


// Helper function for converting camelCase to kebab-case,
// e.g. boxSizing -> box-sizing
function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
        return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
};

// Function to allow us to use native feature detection functionality if available.
// Accepts a list of property names and a single value
// Returns `undefined` if native detection not available
function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
        // Try every prefixed variant of the property
        while (i--) {
            if (window.CSS.supports(domToCSS(props[i]), value)) {
                return true;
            }
        }
        return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];
        while (i--) {
            conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
        }
        conditionText = conditionText.join(' or ');
        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
            return getComputedStyle(node, null).position == 'absolute';
        });
    }
    return undefined;
};

// testProps is a generic CSS / DOM property test.

// In testing support for a given CSS property, it's legit to test:
//    `elem.style[styleName] !== undefined`
// If the property is supported it will return an empty string,
// if unsupported it will return undefined.

// We'll take advantage of this quick test and skip setting a style
// on our modernizr element, but instead just testing undefined vs
// empty string.

// Property names can be provided in either camelCase or kebab-case.

function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
        var result = nativeTestProps(props, value);
        if (!is(result, 'undefined')) {
            return result;
        }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means
    // we're running async or after the core tests,
    // so we'll need to create our own elements to use
    if (!mStyle.style) {
        afterInit = true;
        mStyle.modElem = createElement('modernizr');
        mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we
    // we created them.
    function cleanElems() {
        if (afterInit) {
            delete mStyle.style;
            delete mStyle.modElem;
        }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
        prop = props[i];
        before = mStyle.style[prop];

        if (contains(prop, '-')) {
            prop = cssToDOM(prop);
        }

        if (mStyle.style[prop] !== undefined) {

            // If value to test has been passed in, do a set-and-check test.
            // 0 (integer) is a valid property value, so check that `value` isn't
            // undefined, rather than just checking it's truthy.
            if (!skipValueTest && !is(value, 'undefined')) {

                // Needs a try catch block because of old IE. This is slow, but will
                // be avoided in most cases because `skipValueTest` will be used.
                try {
                    mStyle.style[prop] = value;
                } catch (e) {
                }

                // If the property value has changed, we assume the value used is
                // supported. If `value` is empty string, it'll fail here (because
                // it hasn't changed), which matches how browsers have implemented
                // CSS.supports()
                if (mStyle.style[prop] != before) {
                    cleanElems();
                    return prefixed == 'pfx' ? prop : true;
                }
            }
            // Otherwise just return true, or the property name if this is a
            // `prefixed()` call
            else {
                cleanElems();
                return prefixed == 'pfx' ? prop : true;
            }
        }
    }
    cleanElems();
    return false;
};

// Modernizr.testProp() investigates whether a given style property is recognized
// Property names can be provided in either camelCase or kebab-case.
// Modernizr.testProp('pointerEvents')
// Also accepts optional 2nd arg, of a value to use for native feature detection, e.g.:
// Modernizr.testProp('pointerEvents', 'none')
var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
    return testProps([prop], undefined, value, useValue);
};


// Change the function's scope.
function fnBind(fn, that) {
    return function() {
        return fn.apply(that, arguments);
    };
};

/**
 * testDOMProps is a generic DOM property test; if a browser supports
 *   a certain property, it won't return undefined for it.
 */
function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
        if (props[i] in obj) {

            // return the property name as a string
            if (elem === false) return props[i];

            item = obj[props[i]];

            // let's bind a function
            if (is(item, 'function')) {
                // bind to obj unless overriden
                return fnBind(item, elem || obj);
            }

            // return the unbound function or obj or value
            return item;
        }
    }
    return false;
};

/**
 * testPropsAll tests a list of DOM properties we want to check against.
 *     We specify literally ALL possible (known and/or likely) properties on
 *     the element including the non-vendor prefixed one, for forward-
 *     compatibility.
 */
function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
        return testProps(props, prefixed, value, skipValueTest);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
        props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
        return testDOMProps(props, prefixed, elem);
    }
}

// Modernizr.testAllProps() investigates whether a given style property,
//     or any of its vendor-prefixed variants, is recognized
// Note that the property names must be provided in the camelCase variant.
// Modernizr.testAllProps('boxSizing')
ModernizrProto.testAllProps = testPropsAll;


/**
 * testAllProps determines whether a given CSS property, in some prefixed
 * form, is supported by the browser. It can optionally be given a value; in
 * which case testAllProps will only return true if the browser supports that
 * value for the named property; this latter case will use native detection
 * (via window.CSS.supports) if available. A boolean can be passed as a 3rd
 * parameter to skip the value check when native detection isn't available,
 * to improve performance when simply testing for support of a property.
 *
 * @param prop - String naming the property to test (either camelCase or
 *               kebab-case)
 * @param value - [optional] String of the value to test
 * @param skipValueTest - [optional] Whether to skip testing that the value
 *                        is supported when using non-native detection
 *                        (default: false)
 */
function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
}

ModernizrProto.testAllProps = testAllProps;

/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/

Modernizr.addTest('csstransforms', function() {
    // Android < 3.0 is buggy, so we sniff and blacklist
    // http://git.io/hHzL7w
    return navigator.userAgent.indexOf('Android 2.') === -1 &&
        testAllProps('transform', 'scale(1)', true);
});

/*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/

Modernizr.addTest('csstransforms3d', function() {
    var ret = !!testAllProps('perspective', '1px', true);
    var usePrefix = Modernizr._config.usePrefixes;

    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
    //   some conditions. As a result, Webkit typically recognizes the syntax but
    //   will sometimes throw a false positive, thus we must do a more thorough check:
    if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {
        var mq;
        // Use CSS Conditional Rules if available
        if (Modernizr.supports) {
            mq = '@supports (perspective: 1px)';
        } else {
            // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
            // `@media (transform-3d),(-webkit-transform-3d){ ... }`
            mq = '@media (transform-3d)';
            if (usePrefix) mq += ',(-webkit-transform-3d)';
        }
        // If loaded inside the body tag and the test element inherits any padding, margin or borders it will fail #740
        mq += '{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}';

        testStyles(mq, function(elem) {
            ret = elem.offsetLeft === 9 && elem.offsetHeight === 5;
        });
    }

    return ret;
});


// Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
// Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

// Properties can be passed as DOM-style camelCase or CSS-style kebab-case.
// Return values will always be in camelCase; if you want kebab-case, use Modernizr.prefixedCSS().

// If you're trying to ascertain which transition end event to bind to, you might do something like...
//
//     var transEndEventNames = {
//         'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
//         'MozTransition'    : 'transitionend',      // only for FF < 15
//         'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
//     },
//     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
        return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
        // Convert kebab-case to camelCase
        prop = cssToDOM(prop);
    }
    if (!obj) {
        return testPropsAll(prop, 'pfx');
    } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
    }
};


/*!
{
  "name": "getUserMedia",
  "property": "getusermedia",
  "caniuse": "stream",
  "tags": ["webrtc"],
  "authors": ["Eric Bidelman"],
  "notes": [{
    "name": "W3C Media Capture and Streams spec",
    "href": "http://www.w3.org/TR/mediacapture-streams/"
  }],
  "polyfills": ["getusermedia"]
}
!*/

Modernizr.addTest('getusermedia', !!prefixed('getUserMedia', navigator));

/*!
{
  "name": "RTC Peer Connection",
  "property": "peerconnection",
  "tags": ["webrtc"],
  "authors": ["Ankur Oberoi"],
  "notes": [{
    "name": "W3C Web RTC spec",
    "href": "http://www.w3.org/TR/webrtc/"
  }]
}
!*/

Modernizr.addTest('peerconnection', !!prefixed('RTCPeerConnection', window));


// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
}

// Leak Modernizr namespace
window.Modernizr = Modernizr;;

})(window, document);


/*
 * Avoid 'console' errors in browsers that lack a console.
 */
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());