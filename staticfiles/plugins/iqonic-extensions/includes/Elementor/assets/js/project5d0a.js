(function (jQuery) {
    "use strict";
    jQuery(document).ready(function () {
        callProjectMasonry();
    });
})(jQuery);

function callProjectMasonry() {
    /*------------------------
    Masonry
    --------------------------*/
    if (jQuery('.iqonic-masonry-grid').length > 0) {
        jQuery('.iqonic-masonry-grid').each(function () {
            jQuery(".iqonic-masonry-block").imagesLoaded(function () {
                jQuery(".iqonic-masonry-grid").masonry({
                    columnWidth: ".grid-sizer",
                    itemSelector: ".iqonic-masonry-item",
                    horizontalOrder: false
                });
            });
        });
    }

    jQuery('.project-masonry li a').click(function () {
        window.dispatchEvent(new Event('resize'));
    });
}
