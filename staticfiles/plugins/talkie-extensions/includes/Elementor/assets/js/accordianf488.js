
(function (jQuery) {
    "use strict";

    jQuery(document).ready(function () {
        callaccordian();
    });
})(jQuery);

function callaccordian() {

    jQuery('.iq-faq').each(function () {
        jQuery('.iq-faq .iq-faq-block .iq-faq-details').hide();
        jQuery('.iq-faq .iq-faq-block:first').addClass('iq-active').children().slideDown('slow');
        jQuery('.iq-faq .iq-faq-block ').on("click", function () {
            if (jQuery(this).children('div.iq-faq-details').is(':hidden')) {
                jQuery('.iq-faq .iq-faq-block').removeClass('iq-active').children('div.iq-faq-details').slideUp('slow');
                jQuery(this).toggleClass('iq-active').children('div.iq-faq-details').slideDown('slow');
            }
        });

        jQuery('.collapse').on('shown.bs.collapse', function () {

            jQuery(this).parent().find(".fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-chevron-down");
        }).on('hidden.bs.collapse', function () {
            jQuery(this).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-right");
        });
    });

    window.dispatchEvent(new Event('resize'));
}