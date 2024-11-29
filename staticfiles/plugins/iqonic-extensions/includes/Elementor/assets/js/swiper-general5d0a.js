(function (jQuery) {
    "use strict";
    jQuery(window).ready(function () {
        Widget_swiperSlider();
    });
})(jQuery);

function Widget_swiperSlider() {

    if (jQuery('.css_prefix-widget-swiper').length > 0) {
        jQuery('.css_prefix-widget-swiper').each(function (e) {

            let slider = jQuery(this);

            var navNext = (slider.data('navnext')) ? "#" + slider.data('navnext') : "";
            var navPrev = (slider.data('navprev')) ? "#" + slider.data('navprev') : "";
            var pagination = (slider.data('pagination')) ? "#" + slider.data('pagination') : "";
            var swiper = (slider.data('swiper')) ? "." + slider.data('swiper') : "";

            var sliderAutoplay = slider.data('autoplay');
            if (sliderAutoplay) {
                sliderAutoplay = {
                    delay: slider.data('autoplay')
                };
            } else {
                sliderAutoplay = false;
            }

            var iqonicPagination = {
                
                el: pagination,
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.48617 10.4838C7.77126 10.4288 6.61644 10.0988 5.62656 9.16396C5.13162 8.72402 4.74667 8.17409 4.5267 7.51417C4.41671 7.2392 4.36169 6.96423 4.36169 6.74425C4.36169 6.52428 4.36172 6.3043 4.5267 5.97434C4.69168 5.64438 4.96667 5.25941 5.24163 4.92945C5.5166 4.5445 5.79157 4.21454 6.06653 3.82959C6.61646 3.16968 7.11143 2.6198 7.60636 2.23485C8.54124 1.40995 9.53109 1.18993 9.64108 0.804974C9.69607 0.585002 9.47607 0.310063 8.92614 0.145084C8.4312 -0.0198947 7.55126 -0.0748876 6.67137 0.145085C5.79148 0.365057 4.85671 0.860022 4.03181 1.40995C3.59187 1.68492 3.20689 2.01485 2.76695 2.34481C2.38199 2.67477 1.88706 3.05974 1.39212 3.60968C0.897182 4.15961 0.402272 4.9295 0.182299 5.86438C-0.0376727 6.74427 -0.0377799 7.62414 0.0722063 8.39405C0.347172 9.93385 1.00712 11.2537 1.88701 12.3535C3.64678 14.4982 6.06653 15.4331 7.71632 15.6531C8.54122 15.7631 9.641 15.7631 10.7959 15.4882C11.9507 15.2132 13.1607 14.7182 14.2055 13.8933C15.3054 13.1234 16.2403 12.0236 16.9552 10.7588C17.6151 9.49393 18 8.0641 18 6.68927C18 5.31444 17.6701 3.93962 16.9552 2.83976C16.2953 1.7399 15.3603 1.025 14.5354 0.585055C13.7105 0.14511 12.8857 0.0900906 12.3907 0.145084C11.8408 0.200077 11.5658 0.420063 11.5658 0.640035C11.5658 1.07998 12.5007 1.51994 13.2156 2.50981C13.6006 3.00475 13.9305 3.60965 14.0954 4.26956C14.2604 4.92948 14.2604 5.69938 14.0954 6.46929C13.7655 8.00909 12.6657 9.21891 11.4008 9.87883C10.301 10.5387 9.14609 10.5388 8.48617 10.4838Z" fill="currentColor"/></svg>' + "</span>";
                },
               
            };

            var breakpoint = {
                // when window width is >= 0px
                0: {
                    slidesPerView: slider.data('mobile'),
                    spaceBetween: slider.data('spacemobile'),
                },
                576: {
                    slidesPerView: slider.data('mobile'),
                    spaceBetween: slider.data('spacemobile'),
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: slider.data('tab'),
                    spaceBetween: slider.data('spacetablet'),
                },
                // when window width is >= 1025px
                1025: {
                    slidesPerView: slider.data('laptop'),
                    spaceBetween: slider.data('spacelaptop'),
                },
                // when window width is >= 1500px
                1500: {
                    slidesPerView: slider.data('slide'),
                    spaceBetween: slider.data('spacebtslide'),
                },
            }

            var sw_config = {

                loop: slider.data('loop'),
                speed: slider.data('speed'),
                spaceBetween: slider.data('spacebtslide'),
                slidesPerView: (slider.data('slide')) ? slider.data('slide') : 1,
                autoplay: sliderAutoplay,
                navigation: {
                    nextEl: navNext,
                    prevEl: navPrev
                },
                pagination: (slider.data('pagination')) ? iqonicPagination : "",
                breakpoints: breakpoint,
            };
            new Swiper(swiper, sw_config);
        });

        /* Resize window on load */
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 500);

    }
}