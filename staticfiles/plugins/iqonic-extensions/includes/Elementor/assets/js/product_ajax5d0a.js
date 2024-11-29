(function (jQuery) {
    "use strict";
    jQuery(document).ready(function () {
        if (jQuery('.loader-wheel-container').parents('.iq-woocommerce')) {

            var canBeLoaded = true,
                bottomOffset = 2000;

            jQuery(window).scroll(function () {

                jQuery('.loader-wheel-container').parents('.iq-woocommerce').each(function () {

                    let widget = jQuery(this);

                    if (jQuery(document).scrollTop() > (jQuery(document).height() - bottomOffset) && canBeLoaded == true) {
                        let data = {
                            'action': 'loadmore_product_widget',
                            'query': widget.find('.product_ajax_query').val(),
                            'current_page': widget.find('.page_no').val(),
                        }

                        jQuery.ajax({
                            url: iqonic_loadmore_params.ajaxurl,
                            data: data,
                            type: 'POST',
                            beforeSend: function (xhr) {
                                canBeLoaded = false;
                            },
                            success: function (res) {
                                if (res) {
                                    res['data'] = jQuery(res['data']).each((item, val) => jQuery(val).addClass('wow css_prefix-image-effect'));
                                    widget.find(".loader-wheel-container").html('<div class="loader-wheel"><i><i><i><i><i><i><i><i><i><i><i><i></i></i></i></i></i></i></i></i></i></i></i></i></div>');
                                    widget.find('.products').append(res['data']); // where to insert posts
                                    canBeLoaded = true; // the ajax is completed, now we can run it again

                                    widget.find('.page_no').val(Number(widget.find('.page_no').val()) + 1);
                                    update_product_count(widget.find('.woocommerce-result-count'), widget.find('.per_per_paged').val());

                                    if (widget.find('.max_no_page').val() <= widget.find('.page_no').val()) {
                                        widget.find(".loader-wheel-container").html('');
                                        canBeLoaded = false;
                                    }
                                } else {
                                    widget.find(".loader-wheel-container").html('');
                                }

                            },
                            error: function (err) {
                                widget.find(".loader-wheel-container").html('');
                            }
                        });
                    }
                });

            });
        }
        loadmore_ajax();

    });

})(jQuery);

function loadmore_ajax() {
    jQuery('.php_prefix_loadmore_product').bind('click').on('click', function () {

        let btn = jQuery(this).parent();
        let data = {
            'action': 'loadmore_product_widget',
            'query': btn.siblings('.product_ajax_query').val(),
            'current_page': btn.siblings('.page_no').val(),
            'columntype': btn.siblings('.woo_column_type').val(),
        }

        jQuery.ajax({
            url: iqonic_loadmore_params.ajaxurl, // AJAX handler
            data: data,
            type: 'POST',
            beforeSend: function () {
                btn.find('.text-btn').html(btn.find('.php_prefix_loadmore_product').data('loading-text'));
            },
            success: function (res) {
                if (res) {
                    res['data'] = jQuery(res['data']).each((item, val) => jQuery(val).addClass('wow css_prefix-image-effect'));
                    btn.siblings('.products').append(res['data']);
                    btn.find('.text-btn').html(btn.find('.php_prefix_loadmore_product').data('text'));
                    btn.siblings('.page_no').val(Number(btn.siblings('.page_no').val()) + 1);
                    update_product_count(btn.siblings('.sorting-wrapper').find('.woocommerce-result-count'), btn.siblings('.per_per_paged').val());

                    if (btn.siblings('.max_no_page').val() <= btn.siblings('.page_no').val()) {
                        btn.remove();
                    }
                }
            },
            error: function (err) {
                btn.remove();
            }
        });
    });
}

function update_product_count(result_count_element = jQuery('.woocommerce-result-count'), per_paged = jQuery('.woocommerce-result-count').data('product-per-page')) {
    if (result_count_element.lenght == 0) return;

    let text = result_count_element.text();
    let content_text_arr = text.trim().split(' ');
    let count_arr = content_text_arr[1].split('–');

    count_arr[1] = Number(count_arr[1]) + Number(per_paged);
    if (count_arr[1] > content_text_arr[3]) {
        count_arr[1] = content_text_arr[3];
    }
    content_text_arr[1] = count_arr.join('–')
    result_count_element.html(content_text_arr.join(' '));
}