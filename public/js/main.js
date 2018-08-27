'use strict';

// start juqery code
$(function () {
	var navbarToggler = $('.navbar-toggler');
	var carouselIndicators = $('.carousel-indicators');
	var search = $('.search');
	var btnFilter = $('.btn-filter');
	var carouselControl = $('.carousel-control');
	var buttonGrid = $('.button-grid');
	//registerSw function
	$.prototype.registerSw();
	// preload function
	$(window).load(function () {
		$('.preload').fadeOut('500');
	});
	//navbar toggler button function
	navbarToggler.on('click', function (event) {
		event.preventDefault();
		if (navbarToggler.attr('aria-expanded') === 'false') {
			//$(navbarToggler.attr('data-target')).removeAttr('style')
			$(navbarToggler.attr('data-target')).addClass(navbarToggler.attr('data-toggle'));
			navbarToggler.attr('aria-expanded', 'true');
		} else {
			navbarToggler.attr('aria-expanded', 'false');
			$(navbarToggler.attr('data-target')).removeClass(navbarToggler.attr('data-toggle'));
			$(navbarToggler.attr('data-target')).one('transitionend', function (event) {
				//$(this).css('display', 'none');
			});
		}
	});
	//slider show function 
	carouselIndicators.on('click', 'li', function (event) {
		event.preventDefault();
		$($(this).attr('data-target')).find('.carousel-item').eq($(this).attr('data-slide-to')).addClass('active').siblings().removeClass('active');
		$(this).addClass('active').siblings().removeClass('active');
	});
	//loop animation auto run slider
	carouselIndicators.each(function (i, e) {
		setInterval(function () {
			requestAnimationFrame(function () {
				if ($(e).find('li.active').next('li').length === 0) {
					$(e).find('li:first-child').click();
				} else {
					$(e).find('li.active').next('li').click();
				}
			});
		}, 5000);
	});

	//search form
	search.on('click', 'label', function (event) {
		event.preventDefault();
		$(this).parents('.search').toggleClass('active');
	});
	//clients filter
	btnFilter.on('click', function (event) {
		event.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		if ($(this).data('target') === 'all') {
			$(".client[data-filter]").parent().fadeIn('500');
			return;
		} else {
			$(".client:not([data-filter=" + $(this).data('target') + "])").parent().css("display", "none");
			$(".client[data-filter=" + $(this).data('target') + "]").parent().fadeIn('500');
		}
	});
	//carouselControl
	carouselControl.on('click', 'a', function (event) {
		event.preventDefault();
		$($(this).attr('href')).find('.carousel-item.active')[$(this).attr('data-slide')](".carousel-item").addClass('active').siblings().removeClass('active');
	});
	// clients row style
	buttonGrid.on('click', 'button', function (event) {
		event.preventDefault();
		if ($(this).hasClass('active')) return;
		$(this).addClass('active').siblings().removeClass('active');
		$($(this).data('target')).toggleClass($(this).data('toggle'));
	});
});
// end juqery code


// =================================
// ========start serviceWorker =====
// =================================

//start register Worker
$.prototype.registerSw = function () {
	// check if browser support serviceWorker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function (e) {
			navigator.serviceWorker.register('../sw.js').then(function (reg) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', reg.scope);
				// chack if you have old version of serviceWorker
				if (!navigator.serviceWorker.controller) {
					return;
				}
				if (reg.waiting) {
					reg.waiting.postMessage({ action: 'skipWaiting' });
				}
			}).catch(function (err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});
		});
		navigator.serviceWorker.addEventListener('controllerchange', function () {
			$.prototype.alertSw();
		});
	}
	//end sw
};

$.prototype.alertSw = function () {
	var alertSw = '<div id="alertSw">New Version Available<button id="refresh" data-val="ref">Refresh</button><button id="dismiss" data-val="dis">Dismiss</button></div>';
	var alertSwStyle = '<style id=\'alertSwStyle\'>\n\t\t#alertSw {\n\t\t\tdisplay:none;\n\t\t\tbackground-color: #c3dbdb;\n    \t\tcolor: #fff;\n    \t\tposition: fixed;\n\t\t    bottom: 0;\n\t\t    right: 0;\n\t\t    left: 0;\n\t\t    width: 100%;\n\t\t    text-align: center;\n\t\t    padding: 15px;\n\t\t    font-size: 18px;\n    \t\tfont-weight: bold;\n    \t\ttext-transform: capitalize;\n    \t\tz-index: 9999;\n\t\t}\n\t\t#alertSw button {\n\t\t\tdisplay: inline-block;\n\t\t    padding: 10px;\n    \t\tfont-weight: bold;\n\t\t}\n\t\t</style>\n\t';
	// add element to dom 
	$('body').append(alertSw);
	$('head').append(alertSwStyle);
	var alertSwDom = $('#alertSw');
	var alertSwStyleDom = $('#alertSwStyle');
	alertSwDom.fadeIn('5000');
	alertSwDom.on('click', 'button', function (event) {
		event.preventDefault();
		var val = $(this).data('val');
		$.prototype.refPage(val).then(function (data) {
			if (data === 'ref') {
				window.location.reload();
			} else {
				alertSwDom.slideUp('5000', function () {
					$(this).remove();
					alertSwStyleDom.remove();
				});
			}
		}).catch(function (err) {
			console.log(err);
		});
	});
};
$.prototype.refPage = function (val) {
	return new Promise(function (resolve, reject) {
		if (val) {
			return resolve(val);
		} else {
			return reject('error');
		}
	});
};
// =================================
// ========end serviceWorker =====
// =================================
