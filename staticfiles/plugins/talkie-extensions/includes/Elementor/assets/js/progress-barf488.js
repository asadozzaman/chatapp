(function (jQuery) {
    "use strict";
    
    jQuery(window).on('load', function (e) {
        callprogress();
    });

})(jQuery);

function callprogress() {
    jQuery('.iq-progress-bar').each(function () {
    jQuery('.iq-progress-bar > span').each(function () {
        var jQuerythis = jQuery(this);
        var width = jQuery(this).data('percent');
        jQuerythis.css({
            'transition': 'width 2s'
        });
        setTimeout(function () {
            jQuerythis.appear(function () {
                jQuerythis.css('width', width + '%');
            });
        }, 500);
    });
});
}