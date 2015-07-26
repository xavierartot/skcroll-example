 /*!
 * Plugin for skrollr.
 * This file is the bridge between iscroll and skrollr.
 * It configures the page so that both work together
 * and exposes an instance of iscroll to skrollr.

 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function(window, document, undefined) {
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);

	document.addEventListener('DOMContentLoaded', function () {
		window.setTimeout(function() {
			var skrollrBody = document.getElementById('skrollr-body');

			if(!skrollrBody) {
				throw "For mobile support skrollr needs a #skrollr-body element";
			}

			skrollrBody.style.cssText += 'position:absolute;width:100%;';

			document.body.style.cssText += 'position:absolute;left:0;top:0;bottom:0;width:100%;padding:0;margin:0;';

			skrollr.iscroll = new iScroll(document.body, {
				bounce: false,
				//When using transform, all fixed-positioned child elements degrade to absolut positioned.
				useTransform: false,
				onBeforeScrollStart: function(e) {
					var target = e.target;

					while(target.nodeType != 1) {
						target = target.parentNode;
					}

					if(!/(select|input|textarea)/i.test(target.tagName)) {
						e.preventDefault();
					}
				}
			});

			document.documentElement.className += ' skrollr-mobile';

			window.scroll(0, 0);
		}, 200);
	},false);
}(window, document));