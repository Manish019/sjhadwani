(function($) {
	$(document).ready(function() {
		"use strict";
		
		
	// HOVER TOGGLE
		$('.side-navigation .menu ul li a').on('click', function(e) {
	  	$(this).parent().children('.side-navigation .menu ul li ul').slideToggle(300);
        return true;
	  	});
		
		
		
	// CONTACT FORM INPUT LABEL
		function checkForInput(element) {
			  const $label = $(element).siblings('span');
			  if ($(element).val().length > 0) {
				$label.addClass('label-up');
			  } else {
				$label.removeClass('label-up');
			  }
		}

		$('input, textarea').each(function(e) {
			  checkForInput(this);
		});

		$('input, textarea').on('change keyup', function(e) {
			  checkForInput(this);  
		});
		
		
		
	// TOOLTIP
		$('[data-toggle="tooltip"]').tooltip()
		
		
		
	// PARALLAX
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				responsive:true
			});
		
		
		
	// DROPDOWN
		$('.dropdown-toggle').dropdown()
	
	
		
	// HAMBURGER
		$('.hamburger').on('click', function(e) {
			$(this).toggleClass('open');
			$('body').toggleClass('overflow');
			$('.side-navigation').toggleClass('active');
		});
	
	
	
	// DATA BACKGROUND IMAGE
			var pageSection = $("*");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-image", "url(" + $(this).data("background") + ")");
				}
			});
		
		
		
	// PAGE TRANSITION
		$('body a').on('click', function(e) {
			if (typeof $( this ).data('fancybox', 'filter') == 'undefined') {
			e.preventDefault(); 	
			var url = this.getAttribute("href"); 
			if( url.indexOf('#') != -1 ) {
			var hash = url.substring(url.indexOf('#'));
				
		
			if( $('body ' + hash ).length != 0 ){
			$('.transition-overlay').removeClass("active");
			$(".hamburger").toggleClass("open");
			$(".navigation-menu").removeClass("active");


			$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 1300);

			}
			}
			else {
			$('.transition-overlay').toggleClass("active");
			setTimeout(function(){
			window.location = url;
			},1300); 

			}
			}
			});
		
			
		
		
	
		
	});	
		
	
	
	// COUNTER
			 $(document).scroll(function(){
				$('.odometer').each( function () {
					var parent_section_postion = $(this).closest('section').position();
					var parent_section_top = parent_section_postion.top;
					if ($(document).scrollTop() > parent_section_top - 300) {
						if ($(this).data('status') == 'yes') {
							$(this).html( $(this).data('count') );
							$(this).data('status', 'no')
						}
					}
				});
			});
	
	
	
	
	var swiper = new Swiper(".gallery-container", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    /* Remove dots */
    pagination: false,

    /* Add next / prev arrows */
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

	
	
	
	// SLIDER
	var swiper = new Swiper('.slider-container', {
		touchRatio: 0,
		loop: true,
		speed: 600,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
      	},
      	pagination: {
			el: '.pagination',
			type: 'fraction',
      	},
      	navigation: {
			nextEl: '.button-next',
			prevEl: '.button-prev',
      	},
    });
	
	
	
	// MASONRY
			$(window).load(function(){
				$('.gallery').isotope({
				  itemSelector: '.gallery li',
				  percentPosition: true
				});
			});
		
		
	
		// ISOTOPE FILTER
			var $container = $('.gallery');
			$container.isotope({
			filter: '*',
			animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
			}
			});

			$('.gallery-filter li a').click(function(){
			$('.gallery-filter li a.current').removeClass('current');
			$(this).addClass('current');

			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
				}
			});
			return false;
			}); 
	
	
	
		// WOW ANIMATION 
			wow = new WOW(
				{
					boxClass:     'wow',      // default
					animateClass: 'animated', // default
					offset:       100,          // default
					mobile:       true,       // default
					live:         true        // default
				}
			)
			wow.init();
			
	
	
	// PRELOADER
			$(window).load(function(){
				$("body").addClass("page-loaded");	
			});
	
		
		
})(jQuery);


(function () {
  'use strict';

  // Configuration
  const SELECTOR_WRAPPER = '.swiper .swiper-wrapper';
  const SELECTOR_TICKER = '.ticker';
  const MIN_SLIDES = 12;      // minimum slides after cloning (prevents gaps)
  const MAX_CLONE_ATTEMPTS = 10;
  const SWIPER_SPEED = 7000;  // larger = slower

  // Utility: wait for window load (images + resources)
  function onWindowLoad(fn) {
    if (document.readyState === 'complete') {
      // already loaded
      setTimeout(fn, 0);
    } else {
      window.addEventListener('load', fn);
    }
  }

  // Clone slides until we have at least MIN_SLIDES
  function ensureMinSlides(wrapper, minSlides) {
    const initialSlides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
    if (!initialSlides.length) return 0;

    let total = initialSlides.length;
    let i = 0;
    while (total < minSlides && i < MAX_CLONE_ATTEMPTS) {
      const clone = initialSlides[i % initialSlides.length].cloneNode(true);
      wrapper.appendChild(clone);
      i++; total++;
    }
    return total;
  }

  // Wait for all images inside a container to be loaded
  function waitForImages(container, cb) {
    const imgs = Array.from(container.querySelectorAll('img'));
    if (!imgs.length) {
      cb();
      return;
    }

    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', function onload() {
          img.removeEventListener('load', onload);
          loaded++;
          if (loaded === imgs.length) cb();
        });
        img.addEventListener('error', function onerr() {
          // treat error as loaded to avoid blocking
          img.removeEventListener('error', onerr);
          loaded++;
          if (loaded === imgs.length) cb();
        });
      }
    });

    if (loaded === imgs.length) cb();
  }

  // Initialize Swiper ticker
  function initTicker() {
    const wrapper = document.querySelector(SELECTOR_WRAPPER);
    const tickerEl = document.querySelector(SELECTOR_TICKER);

    if (!wrapper || !tickerEl) {
      // nothing to initialize
      return;
    }

    // Clone slides to avoid gaps
    ensureMinSlides(wrapper, MIN_SLIDES);

    // Re-query slides to get updated count
    const slides = wrapper.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length || 0;

    // Defensive: if Swiper isn't available, bail
    if (typeof Swiper === 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('Swiper not found. Please include Swiper JS before ticker.js');
      return;
    }

    // Create Swiper instance for continuous marquee-like loop
   const ticker = new Swiper(SELECTOR_TICKER, {
     slidesPerView: "auto",
     spaceBetween: 0,
     loop: true,
     speed: SWIPER_SPEED,
     autoplay: {
       delay: 1, // 1ms = continuous motion
       disableOnInteraction: false,
     },
     allowTouchMove: false, // STOP USER DRAG (big reason of jitter)
     grabCursor: false,
     waitForTransition: true,
     observer: true,
     observeParents: true,
     centeredSlides: false,
   });


    // Force update after images inside ticker fully load
    waitForImages(tickerEl, function () {
      try { ticker.update(); } catch (e) { /* ignore */ }
    });

    // Optional: update on window resize (debounced)
    let resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        try { ticker.update(); } catch (e) { /* ignore */ }
      }, 200);
    });
  }

  // Start after load
  onWindowLoad(initTicker);

})();
  
