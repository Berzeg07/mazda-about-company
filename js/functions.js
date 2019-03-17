$(document).ready(function(){

	$('.navbar-toggle').click(function () {
		$('#navbar-main').toggleClass('in');
		$('.header').toggleClass('menu-open');
		return false;
	});
	//$("[data-fancybox]").fancybox();
	$(".phone").mask("(999) 999-99-99");
	$(window).scroll(function () {
		if ($(window).scrollTop() > 60) {
			$('.header').addClass('header_fix');
		} else {
			$('.header').removeClass('header_fix');
		}
	});
	$('.owl-carousel_catalog').on('initialized.owl.carousel + changed.owl.carousel', function (e) {
		$('.owl-carousel_catalog .owl-pager').html('<strong class="current">' + e.item.index + '</strong> из <strong class="total">' + e.item.count + '</strong>');
		$('.owl-pager .current').text($('.owl-dots .active').index() + 1);
	}).owlCarousel({
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1024: {
				items: 3
			},
			1200: {
				items: 2
			},
			1500: {
				items: 3
			}
		},
		loop: true,
		margin: 0,
		nav: true,
		navText: ['<span class="prev"></span>', '<span class="next"></span>'],
		dots: true
	});
	$('.owl-carousel_catalog .owl-next').trigger('click');
	$('.owl-carousel_samegoods').owlCarousel({
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1024: {
				items: 3
			},
			1200: {
				items: 4
			},
			1500: {
				items: 6
			}
		},
		loop: true,
		margin: 0,
		nav: false,
		dots: false
	});
	$('.owl-carousel_modal').owlCarousel({
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1024: {
				items: 3
			}
		},
		loop: true,
		margin: 0,
		nav: false,
		dots: false
	});
	$('.owl-carousel_about').owlCarousel({
		items: 1,
		loop: false,
		margin: 0,
		nav: true,
		navText: ['<span class="prev"></span>', '<span class="next"></span>'],
		dots: false
	});
	
	$('.owl-carousel_team').owlCarousel({
		responsive: {
			0: {
				items: 1
			},
			1280: {
				items: 3
			}
		},
		loop: true,
		margin: 20,
		nav: false,
		dots: true
	});
	$('.owl-carousel_otherservices').owlCarousel({
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			}
		},
		loop: true,
		margin: 20,
		nav: false,
		dots: true
	});
	setTimeout(function () {
		$('select').styler();
	}, 100);
	$('.btn').on('mouseenter', function (e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('.btn__hover-effect').css({
			top: relY,
			left: relX
		})
	}).on('mouseout', function (e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('.btn__hover-effect').css({
			top: relY,
			left: relX
		})
	});
	$('.popular__more a').on('click', function () {
		$("html, body").animate({
			scrollTop: $('#service').offset().top
		}, 800);
		return false;
	});
	$('[data-scroll]').on('click', function () {
		var elem = $(this).attr('data-scroll');
		$("html, body").animate({
			scrollTop: $(elem).offset().top
		}, 800);
		return false;
	});
	$('.counter__control').on('click', function () {
		var counterValue = $(this).parent('.counter').find('.counter__input').val() * 1;
		if ($(this).hasClass('counter__control_plus')) {
			counterValue = counterValue + 1;
		} else if ($(this).hasClass('counter__control_minus') && counterValue > 1) {
			counterValue = counterValue - 1;
		}
		$(this).parent('.counter').find('.counter__input').val(counterValue);
		if ($(this).closest('.basket__table').length) {
			calculate_cart();
		}
	});
	$('.modal').on('hidden.bs.modal', function () {
		if ($(".modal:visible").length > 0) {
			setTimeout(function () {
				$('body').addClass('modal-open');
			}, 200)
		}
	});
	$(window).scroll(function () {
		if ($(window).scrollTop() > $(window).height()) {
			$('.toUp').fadeIn(500);
		} else {
			$('.toUp').fadeOut(500);
		}
	});
	$('.toUp a').on('click', function () {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$('.order__delivery-item > input[type="radio"]').on('change', function () {
		$(this).parent().find(' > label a[data-toggle="collapse"]').trigger('click');
	});
	$('.otherservices__price').on('click', function () {
		var child = $(this).closest(".otherservices__item").find('.list_service');
		if (child.css('display') == 'none') {
			$(this).addClass('open');
			child.show();
		} else {
			child.hide();
			$(this).removeClass('open');
		}
	});
	$('a[href^="#"]').on('click', function (e) {
		var target = this.hash;
		if ($(this).attr('data-parent') == '#accordion') {
			return true;
		}
		if (target) {
			var $target = $(target);
			$('.slides li').removeClass('active');
			$target.addClass('active');
			return false;
		}
	});
	$('.service_btn').on('click', function (e) {
		$('#service_id').val($('#serviceSelect').val());
	});
	$('#repairModal').on('hide.bs.modal', function () {
		$('#service_id').val('0');
	});
    var isMobileDevice = navigator.userAgent.match(/iPad|iPhone|iPod/i) != null
        || screen.width <= 480;

		$('.form').on('submit',function(){			
			$.ajax({
				url:"/mains/submit_form",
				type:'POST',
				data:$(this).serialize(),
				success:function(result){
					$(".modal").modal('hide');
					$("#thankstModal").modal('show');
					$('form input[type="text"]').val('');
					$('form textarea').val('');
					setTimeout(function(){
						$('#thankstModal').modal('hide')
					},3000);
				}
			});
			return false;
		});
		$('.respond').on('click',function(){
			$('input[name=vacancy]').val($(this).attr('data-r'));
		});

		$('.page_mainpage #video-bg').height($('.header').outerHeight() + $('.teasers').outerHeight());

		$(window).resize(function() {
			var w = $(window).width();
			if (w <= 992) {
				$('.main-nav').removeAttr('style');
			}
		});
		// $(function(){
		// 	$(window).scroll(function() {
		// 		if($(this).scrollTop()) {
		// 			$('.header__main').addClass('stickytop');
		// 			$('.toTop').addClass('toTop-show');
		// 		}
		// 		else{
		// 			$('.header__main').removeClass('stickytop');
		// 			$('.toTop').removeClass('toTop-show');
		// 		}
		// 	});
		// });

});
