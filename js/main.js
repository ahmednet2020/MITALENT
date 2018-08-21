$(function (){
	var navbarToggler = $('.navbar-toggler');
	var carouselIndicators = $('.carousel-indicators');
	var search = $('#search');
	var btnFilter = $('.btn-filter');
	var carouselControl = $('.carousel-control');
	//preload function
	$(window).load(function() {
		$('.preload').delay(1000).fadeOut('500');
	});
	//navbar toggler button function
	navbarToggler.on('click', function(event) {
		event.preventDefault();
		if(navbarToggler.attr('aria-expanded') === 'false')
		{
			//$(navbarToggler.attr('data-target')).removeAttr('style')
			$(navbarToggler.attr('data-target')).addClass(navbarToggler.attr('data-toggle'));
			navbarToggler.attr('aria-expanded', 'true');
		} else {
			navbarToggler.attr('aria-expanded', 'false');
 			$(navbarToggler.attr('data-target')).removeClass(navbarToggler.attr('data-toggle'));
 			$(navbarToggler.attr('data-target')).one('transitionend', function(event) {
				//$(this).css('display', 'none');
 			});
		}
	});
	//slider show function 
	carouselIndicators.on('click', 'li', function(event) {
		event.preventDefault();
		$($(this).attr('data-target')).find('.carousel-item').eq($(this).attr('data-slide-to'))
			.addClass('active').siblings().removeClass('active');
		$(this).addClass('active').siblings().removeClass('active');
	});
	//loop animation auto run slider
	// carouselIndicators.each(function (i,e) {
	// 	setInterval(function() {
	// 		if($(e).find('li.active').next('li').length === 0)
	// 		{
	// 			$(e).find('li:first-child').click();
	// 		} else {
	// 			$(e).find('li.active').next('li').click();
	// 		}
	// 	}, 3000)
	// });

	//search form
	search.on('click', 'label', function(event) {
		event.preventDefault();
		$('#'+$(this).attr('for')).toggleClass('active');
	});
	//clients filter
	btnFilter.on('click', function(event) {
		event.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		if($(this).data('target') === 'all')
		{
			$(".client[data-filter]").parent().fadeIn('500');
			return;
		} else {
			$(".client:not([data-filter="+$(this).data('target')+"])").parent().css("display","none");
			$(".client[data-filter="+$(this).data('target')+"]").parent().fadeIn('500');
		}
	});
	//carouselControl
	carouselControl.on('click', 'a', function(event) {
		event.preventDefault();
		$($(this).attr('data-target')).find('.carousel-item.active')[$(this).attr('data-slide')](".carousel-item")
			.addClass('active').siblings().removeClass('active');
	});
	//serviceWorker
	if ('serviceWorker' in navigator) {
	  window.addEventListener('load',(e) => {
	    navigator.serviceWorker
	    .register('../cashe.min.js')
	    .then((registration) => {
	      // Registration was successful
	      console.log('ServiceWorker registration successful with scope: ', registration.scope);
	    })
	    .catch((err) => {
	      // registration failed :(
	      console.log('ServiceWorker registration failed: ', err);
	    });
	  });
	}
});