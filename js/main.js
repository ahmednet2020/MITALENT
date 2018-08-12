$(function (){
	var navbarToggler = $('.navbar-toggler');
	var carouselIndicators = $('.carousel-indicators');
	var search = $('#search');
	//navbar toggler button function
	navbarToggler.on('click', function(event) {
		event.preventDefault();
		if(navbarToggler.attr('aria-expanded') === 'false')
		{
			//$(navbarToggler.attr('data-target')).removeClass('collapse');
			$(navbarToggler.attr('data-target')).addClass(navbarToggler.attr('data-toggle'));
			navbarToggler.attr('aria-expanded', 'true');
		} else {
			navbarToggler.attr('aria-expanded', 'false');
 			$(navbarToggler.attr('data-target')).removeClass(navbarToggler.attr('data-toggle'));
 			$(navbarToggler.attr('data-target')).one('transitionend', function(event) {
				//$(this).addClass('collapse');
 			});
		}
	});
	//slider show function 
	carouselIndicators.on('click', 'li', function(event) {
		event.preventDefault();
		$($(this).attr('data-target')).children().eq($(this).attr('data-slide-to'))
			.addClass('active').siblings().removeClass('active');
		$(this).addClass('active').siblings().removeClass('active');
	});
	//search form
	search.on('click', 'label', function(event) {
		event.preventDefault();
		$('#'+$(this).attr('for')).toggleClass('active');
	});

});