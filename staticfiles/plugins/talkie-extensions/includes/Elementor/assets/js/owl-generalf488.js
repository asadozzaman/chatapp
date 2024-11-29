(function (jQuery) {
    "use strict";
    jQuery(document).ready(function () {
        callOwl();
    });
})(jQuery);
function callOwl() {
    /*------------------------
    Owl Carousel
    --------------------------*/
    jQuery('.owl-carousel').each(function () {

        var jQuerycarousel = jQuery(this);
        jQuerycarousel.owlCarousel({
            items: jQuerycarousel.data("items"),
            loop: jQuerycarousel.data("loop"),
            margin: jQuerycarousel.data("margin"),
            nav: jQuerycarousel.data("nav"),
            dots: jQuerycarousel.data("dots"),
            autoplay: jQuerycarousel.data("autoplay"),
            autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
            navText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
            responsiveClass: true,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: jQuerycarousel.data("items-mobile-sm"),
                    nav: false,
                    dots: true
                },
                // breakpoint from 480 up
                480: {
                    items: jQuerycarousel.data("items-mobile"),
                    nav: false,
                    dots: true
                },
                // breakpoint from 786 up
                786: {
                    items: jQuerycarousel.data("items-tab")
                },
                // breakpoint from 1023 up
                1023: {
                    items: jQuerycarousel.data("items-laptop")
                },
                1199: {
                    items: jQuerycarousel.data("items")
                }
            }
        });
    });
    window.dispatchEvent(new Event('resize'));
}