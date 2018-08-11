$(function (){
	var navbarToggler = $('.navbar-toggler');
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
});