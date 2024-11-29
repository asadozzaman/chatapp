(function (jQuery) {
    "use strict";
    jQuery(document).ready(function () {
        callCounter();
    });
})(jQuery);
function callCounter() {
    /*------------------------
     counter
    --------------------------*/
    jQuery('.counter-number').each(function () {

        jQuery('.counter-number').countTo();
       
    });
    window.dispatchEvent(new Event('resize'));
}