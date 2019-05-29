/**
 * wh.track
 * @module wh.track
 * Describes tracking/referrer analytics
 */

;
(function(wh, undefined) {

    'use strict';

    // Track
    wh.track = wh.track || {};

    // Empty objct for query string parameters
    var params = {},
        referrer = document.referrer ? document.referrer.split('/')[2] : false,
        where = location.hostname,
        socialSites = [
            'twitter.com', 't.co', 'facebook.com', 'fb.me', 'youtube.com', 'weebly.com',
            'linkedin.com', 'lnkd.in', 'plus.google.com', 'tinyurl.com', 'scribd.com',
            'wordpress.com', 'wordpress.org', 'getpocket.com', 'pocket.co', 'paper.li',
            'dailymotion.com', 'ustream.tv', 'vk.com', 'vkontakte.ru', 'blogger.com',
            'blogspot.com', 'ning.com', 'justin.tv', 'instagram.com', 'pinterest.com', 'tumblr.com', 'flickr.com', 'vine.com', 'meetup.com'
        ],
        searchSites = [
            'google.', 'yahoo.com', 'bing.com', 'yandex.', 'bng.loc', 'a9.', 'alexa.', 'alltheweb.', 'altavista.', 'aol.', 'yahoo.', 'atlas.', 'azet.', 'francite.',
            'centrum.', 'clusty.', 'cnn.', 'live.', 'collarity.', 'cometquery.', 'congoo.', 'cuil.', 'debeste.', 'digger.', 'dogpile.', 'eli.', 'emulti.', 'entireweb.', 'excite.', 'fazzle.', 'freenet.',
            'gigablast.', 'gmx.', 'gooru.', 'goyams.', 'hotbot.', 'icerocket.', 'ilse.', 'ithaki.', 'iwon.', 'ixquick.', 'kartoo.', 'kobala.', 'kx.', 'leonardo.', 'libero.', 'looksmart.', 'lycos.',
            'mamma.', 'metacrawler.', 'metaspider.', 'mnemo.', 'mojeek.', 'mooter.', 'msdewey.', 'msn.', 'netmenu.', 'netscape.', 'netsprint.', 'quintura.', 'releton.', 'alice.', 'vmgo.',
            'rollyo.', 'search.', 'seznam.', 'spinneweb.', 'surfwax.', 'sympatimsn.', 'szukacz.', 'theking.', 'tiscali.', 't-online.', 'track.', 'ujiko.', 'url.', 'vinden.', 'webcrawler.', 'web.',
            'yoople.', 'zapmeta.', 'zoekhet.', 'zoek.', 'zuula.', 'avg.', 'ask.', 'conduit.', 'babylon.', 'globo.', 'search.', 'baidu.com'
        ],
        origin = {
            affiliate: false,
            direct: false,
            ppc: false,
            mediabuy: false,
            seoserp: false,
            organic: false,
            socialmedia: false,
            paidsocial: false,
            edm: false
        },
        cookie = {
            source: '',
            refurl: '',
            keyword: '',
            campaign: '',
            btag: '',
            uid: '',
            affid: ''
        },
        gotrack = true,
        override = false,
        ttl = 30;


    /**
     * Get all URL parameters and cache them
     *
     * @method wh.track.params
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Returns object with query parameters and their values
     **/
    wh.track.query = function() {
        var result = {};
        var query = location.href || '';
        query = query.substring(query.indexOf('?') + 1);
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        params = result;
    };


    /**
     * Set cookie
     *
     * @method wh.cookie
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Creates a cookie with params
     **/
    wh.track.savecookie = function() {
        wh.cookie.set('SBASource', cookie.source + '|' + cookie.refurl + '|' + cookie.keyword + '|' + cookie.campaign + '|' + cookie.btag + '|' + cookie.uid + '|' + cookie.affid, ttl);
    };


    /**
     * Save cookie values
     *
     * @method wh.cookie.savevals
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Saves values into a cookie object
     **/
    wh.track.savevals = function(source, refurl, keyword, campaign, btag, uid, affid) {
        cookie = {
            source: source,
            refurl: refurl,
            keyword: keyword,
            campaign: campaign,
            btag: btag,
            uid: uid,
            affid: affid
        };
    };


    /**
     * Get traffic origin
     *
     * @method wh.track.origin
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Returns traffic origin
     **/
    wh.track.origin = function() {
        // affiliate
        if (params.btag && params.utm_medium === 'affiliate') {
            origin.affiliate = true;
            override = true;
        }
        // ppc
        if (params.utm_medium === 'ppc') {
            origin.ppc = true;
            override = true;
            ttl = 0.5;
        }
        // paid social
        if (params.utm_medium === 'paidsocial') {
            origin.paidsocial = true;
        }
        // edm
        if (params.utm_medium === 'email') {
            origin.edm = true;
        }
        // mediabuy
        if (params.utm_medium === 'media') {
            origin.mediabuy = true;
        }
        // seoserp
        if (params.utm_medium === 'seoserp') {
            origin.seoserp = true;
        }
        // social
        if (params.utm_medium === 'social') {
            origin.socialmedia = true;
        }
        // social
        if (referrer) {
            socialSites.filter(function(site) {
                if (referrer.indexOf(site) >= 0) {
                    origin.socialmedia = true;
                }
            });
        }
        // organic
        if (referrer) {
            searchSites.filter(function(site) {
                if (referrer.indexOf(site) >= 0) {
                    origin.organic = true;
                }
            });
        }
        // direct
        if (!referrer) {
            origin.direct = true;
        }

    };


    /**
     * Update cookie values from saved cookie
     *
     * @method wh.track.fromcookie
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Updates cookie params
     **/
    wh.track.fromcookie = function() {
        var cookieVars = wh.cookie.get('SBASource');
        if (cookieVars !== undefined && cookieVars !== '' && cookieVars !== null) {
            var cookieProps = cookieVars.split('|');
            // wh.track.savevals(cookieProps[0], cookieProps[1], cookieProps[2], cookieProps[3], cookieProps[4], cookieProps[5], cookieProps[6]);
            if (cookieProps[0] === 'Affiliate' || cookieProps[0] === 'PPC') {
                gotrack = false;
            }
        }
    };


    /**
     * Update cookie values from query string
     *
     * @method wh.track.tocookie
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Updates cookie params
     **/
    wh.track.tocookie = function() {

        // affiliate traffic
        if (origin.affiliate) {
            var refurl = params.u || referrer;
            wh.track.savevals('Affiliate', refurl, 'na', 'na', params.btag, 'na', 'na');
        }

        // ppc traffic
        if (origin.ppc) {
            var kw = params.utm_term || params.q;
            wh.track.savevals('PPC', params.utm_source, kw, params.utm_campaign, params.btag, 'na', 'na');
        }

        // organic traffic
        if (origin.organic) {
            var kw = params.q && params.q !== '' ? params.q : '';
            kw = params.p && params.p !== '' ? params.p : '';
            kw = params.s && params.s !== '' ? params.s : '';
            kw = params.wd && params.wd !== '' ? params.wd : '';
            kw = params.text && params.text !== '' ? params.text : '';
            kw = kw && kw !== '' ? kw : 'na';
            wh.track.savevals('SEO', referrer, kw, 'na', 'na', 'na', 'na');
        }

        // mediabuy traffic
        if (origin.mediabuy) {
            var refurl = params.u || referrer;
            wh.track.savevals('Media', refurl, 'na', params.utm_campaign, params.btag, params.utm_source, 'na');
        }

        // seoserp traffic
        if (origin.seoserp) {
            var refurl = params.u || referrer;
            wh.track.savevals('Seoserp', refurl, 'na', params.utm_campaign, params.btag, params.utm_source, 'na');
        }

        // social media
        if (origin.socialmedia) {
            wh.track.savevals('Organic Social', referrer, 'na', 'na', params.btag, 'na', 'na');
        }

        // paid social
        if (origin.paidsocial) {
            var refurl = params.u || referrer;
            wh.track.savevals('Paid Social', refurl, 'na', params.utm_campaign, params.btag, 'na', 'na');
        }

        // edm
        if (origin.edm) {
            wh.track.savevals('EDM', referrer, 'na', params.utm_campaign, 'na', params.utm_source, 'na');
        }

        // Assume direct
        if (!origin.affiliate && !origin.ppc && !origin.mediabuy && !origin.organic && !origin.socialmedia && !origin.paidsocial && !origin.edm && !origin.seoserp && !referrer) {
            wh.track.savevals('Direct', where, 'na', 'na', 'na', 'na', 'na');
        }

    };


    /**
     * Run the process only if referrer
     *
     * @method wh.track.init
     * @param {Any} [args*] Arguments to be evaluated
     * @return {Object} Run the process
     **/
    wh.track.init = (function() {
        wh.track.fromcookie();
        wh.track.query();
        wh.track.origin();
        if (gotrack === true || override === true) {
            if (!referrer || referrer !== where) {
                wh.track.tocookie();
                wh.track.savecookie();
            }
        }
    })();

    // console.log(params, referrer, origin, cookie);

})(window.wh = window.wh || {});