'use strict';

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var wh = {
		// All pages
		'common': {
			init: function() {
				// JavaScript to be fired on all pages
				//uses classList, setAttribute, and querySelectorAll
				//if you want this to work in IE8/9 youll need to polyfill these
				/* jshint ignore:start */
				(function(){
					var d = document,
					accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
					setAria,
					setAccordionAria,
					switchAccordion,
				  touchSupported = ('ontouchstart' in window),
				  pointerSupported = ('pointerdown' in window);
				  
				  skipClickDelay = function(e){
					e.preventDefault();
					e.target.click();
				  }

						setAriaAttr = function(el, ariaType, newProperty){
						el.setAttribute(ariaType, newProperty);
					};
					setAccordionAria = function(el1, el2, expanded){
						switch(expanded) {
					  case "true":
						setAriaAttr(el1, 'aria-expanded', 'true');
						setAriaAttr(el2, 'aria-hidden', 'false');
						break;
					  case "false":
						setAriaAttr(el1, 'aria-expanded', 'false');
						setAriaAttr(el2, 'aria-hidden', 'true');
						break;
					  default:
								break;
						}
					};
				//function
				switchAccordion = function(e) {
					e.preventDefault();
					var thisAnswer = e.target.parentNode.nextElementSibling;
					var thisQuestion = e.target;
					if(thisAnswer.classList.contains('is-collapsed')) {
						setAccordionAria(thisQuestion, thisAnswer, 'true');
					} else {
						setAccordionAria(thisQuestion, thisAnswer, 'false');
					}
					thisQuestion.classList.toggle('is-collapsed');
					thisQuestion.classList.toggle('is-expanded');
						thisAnswer.classList.toggle('is-collapsed');
						thisAnswer.classList.toggle('is-expanded');
					
					thisAnswer.classList.toggle('animateIn');
					};
					for (var i=0,len=accordionToggles.length; i<len; i++) {
						if(touchSupported) {
					  accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
					}
					if(pointerSupported){
					  accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
					}
					accordionToggles[i].addEventListener('click', switchAccordion, false);
				  }
				})();
				/* jshint ignore:end */
				
				// Srearch
				jQuery('.action-icons i.fa-search').click(function () {
					if(jQuery('.wha-mobile .search-box').is(':visible')) {
						jQuery('.wha-mobile .search-box').fadeOut(300);
					} else {
						jQuery('.search-box').fadeIn(300);
						jQuery('.wha-mobile .search-box form input').focus();
					}
				}); 
				/* jshint ignore:start */
				// close search box on body click
				if(jQuery('.wha-mobile i.fa-search').length != 0) {
					jQuery('.wha-mobile .search-box, .wha-mobile i.fa-search').on('click', function(e){
						e.stopPropagation();
					});

					jQuery('body').on('click', function() {
						if(jQuery('.wha-mobile .search-box').is(':visible')) {
							jQuery('.wha-mobile .search-box').fadeOut(300);
						}
					});
				}
				/* jshint ignore:end */
				jQuery(document).bind('click', function() {
					if(jQuery('.wha-mobile .search-box').is(':visible')) {
						jQuery('.wha-mobile .search-box').fadeOut(300);
					}
				});
				
				// Close Fullscreen Search
				jQuery('.close-search').bind('click', function(e) {
					e.preventDefault();

					jQuery('.wha-mobile .search-box').fadeOut(300);
				});
				/* jshint ignore:start */
				// Mobile Menu
				jQuery('.wha-btn').bind('click', function(e) {
					jQuery('#menu-icon').toggleClass('fa-bars fa-times', 1000, 'easeOutBounce');
					jQuery('#wrapper').toggle(300);
					jQuery('.wha-mobile-menu').slideToggle( 'slow' );
				});
				jQuery('.mobile-view .parent-li').bind('click', function(e) {
					jQuery(this).children('a').find('i').toggleClass('fa-angle-down fa-angle-up', 1000, 'easeOutBounce');
					jQuery(this).children('a').toggleClass('color-yellow');
					jQuery(this).next('.parent-ul').slideToggle( 'slow' );
				});
				jQuery('.mobile-view .child-li').bind('click', function(e) {
					jQuery(this).children('a').find('i').toggleClass('fa-angle-down fa-angle-up', 1000, 'easeOutBounce');
					jQuery(this).children('a').toggleClass('color-yellow');
					jQuery(this).next('.child-ul').slideToggle( 'slow' );
				});
				/* jshint ignore:end */
				/* jshint ignore:start */
				//scroll menu fixed
				/*jQuery(window).on( 'scroll', function(){
					jQuery('#wrapper').addClass('display-none');
					jQuery('.wha-mobile-menu').removeClass('display-none');
					if ($(this).scrollTop() == 0) {
						jQuery('#wrapper').removeClass('display-none');
						jQuery('.wha-mobile-menu').addClass('display-none');
					}
				});*/
				/* jshint ignore:end */
			},
			finalize: function() {
				// JavaScript to be fired on all pages, after page specific JS is fired
			}
		},
		// Home page
		'home': {
			init: function() {
				// JavaScript to be fired on the home page
			},
			finalize: function() {
				// JavaScript to be fired on the home page, after the init JS
			}
		},
		// About us page, note the change from about-us to about_us.
		'about_us': {
			init: function() {
				// JavaScript to be fired on the about us page
			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = wh;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {
			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
