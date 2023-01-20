/* ===================================================================
 * Pudding - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800 // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var puddingPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var puddingMenuOnScrolldown = function() {
        
        var hdr= $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var puddingMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap'),
            solutionsCards = $('.solutions-cards');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.toggleClass('open');
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile') && solutionsCards.addClass('solutions-cards--slider');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile') && solutionsCards.addClass('solutions-cards--slider');
            else nav.removeClass('mobile') && solutionsCards.removeClass('solutions-cards--slider');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.toggleClass('open');
            }
        });

    };
   /* slick slider
    * ------------------------------------------------------ */
    var puddingSlickSlider = function() {
        
        $('.about-desc__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var puddingSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var puddingAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var puddingAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* Back to Top
    * ------------------------------------------------------ */
    var puddingBackToTop = function() {
        
    var pxShow      = 500,
        goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Tilt
    * ------------------------------------------------------ */
    var puddingTilt = function() {
        $('.career-list-block, .pudding-tilt').tilt({
            glare: true,
            maxGlare: .25,
            perspective: 1000,
            maxTilt: 15,
            reset: false
        });
    };

    var puddingDropdown = function() {
        document.addEventListener("click", e => {
            const isDropdownButton = e.target.matches("[data-dropdown-button]")
            if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return
          
            let currentDropdown
            if (isDropdownButton) {
              currentDropdown = e.target.closest("[data-dropdown]")
              currentDropdown.classList.toggle("active")
            }
          
            document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
              if (dropdown === currentDropdown) return
              dropdown.classList.remove("active")
            })
          })
    };

       /* photoswipe
    * ----------------------------------------------------- */
       var puddingPhotoSwipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $galleryItems = $('.gallery-item');

        $galleryItems.each( function(i) {

            var $gallery = $(this),
                $thumbLink =  $gallery.find('.thumb-link'),
                $title = $gallery.find('.gallery-item__title'),
                $caption = $gallery.find('.gallery-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            var item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        $galleryItems.each(function(i) {

            $(this).on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };

   /* Cookie Control
    * ------------------------------------------------------ */
    // var cookieCtrl = function () {
    //     $(window).on("load", function () {
    //         $(".cookie-alert").delay(300).fadeIn("slow");
    //     });

    //     $('.cookie-close').on('click', function (e) {
    //         $(".cookie-alert").fadeOut("slow");
    //     });
    // };

   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        puddingPreloader();
        puddingMenuOnScrolldown();
        puddingMobileMenu();
        puddingSlickSlider();
        puddingSmoothScroll();
        puddingAlertBoxes();
        puddingAOS();
        puddingBackToTop();
        puddingTilt();
        // cookieCtrl();
        puddingDropdown();        
        puddingPhotoSwipe();
    })();

})(jQuery);