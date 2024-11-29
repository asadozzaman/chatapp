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
    jQuery('.timer').each(function () {

        jQuery('.timer').countTo();
       
    });
    window.dispatchEvent(new Event('resize'));
}