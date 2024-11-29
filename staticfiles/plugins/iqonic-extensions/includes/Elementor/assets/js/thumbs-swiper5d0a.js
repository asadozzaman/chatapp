(function ($) {
    "use strict";
    $(window).ready(function () {
        ThumbSwiper();
    });
})(jQuery);

function ThumbSwiper() {
    if (jQuery('.css_prefix-testimonial').length > 0) {
        jQuery('.css_prefix-testimonial').each(function (e) {
            let slider = jQuery(this);
            let productSlider = {
                spaceBetween: 0,
                loop: slider.data('loop'),
                loopedSlides: 5,
                resizeObserver: true,
            }

            let productThumbs = {
                spaceBetween: 0,
                centeredSlides: true,
                loop: slider.data('loop'),
                slideToClickedSlide: true,
                slidesPerView: 3,
                loopedSlides: 3,
                pagination: { el: '.swiper-pagination', clickable: true },
                spaceBetween: slider.data('spacebtslide'),
                scrollbar: { el: ".swiper-scrollbar", hide: false, },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev", },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 3,
                    }
                }
            }

            var swiper = new Swiper('.content-slider', productSlider);
            swiper.controller.control = swiper_thumb;

            var swiper_thumb = new Swiper('.user-thumbs', productThumbs);
            swiper_thumb.controller.control = swiper;

            document.addEventListener('theme_scheme_direction', (e) => {
                swiper.destroy(true, true)
                swiper_thumb.destroy(true, true)
                setTimeout(() => {
                    swiper = new Swiper('.content-slider', productSlider);
                    swiper_thumb = new Swiper('.user-thumbs', productThumbs);
                    swiper_thumb.controller.control = swiper;
                }, 500);
            })

        });
    }

}