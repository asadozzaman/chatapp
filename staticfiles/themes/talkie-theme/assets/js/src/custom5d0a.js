/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

const bodyClass = document.getElementsByTagName("body");
const slider = document.querySelectorAll('.custom-nav-slider');
const headerClass = document.querySelector('header.has-sticky, header .has-sticky');
const navBarToggler = document.querySelector('.ham-toggle');
const customToggler = document.querySelector('.close-custom-toggler');

const backToTop = document.getElementById("back-to-top");

Element.prototype.slideUp = function (duration = 300) {
	this.style.transitionProperty = 'height, margin, padding';
	this.style.transitionDuration = duration + 'ms';
	this.style.boxSizing = 'border-box';
	this.style.height = this.offsetHeight + 'px';
	this.offsetHeight;
	this.style.overflow = 'hidden';
	this.style.height = 0;
	this.style.paddingTop = 0;
	this.style.paddingBottom = 0;
	this.style.marginTop = 0;
	this.style.marginBottom = 0;
	window.setTimeout(() => {
		this.style.display = 'none';
		this.style.removeProperty('height');
		this.style.removeProperty('padding-top');
		this.style.removeProperty('padding-bottom');
		this.style.removeProperty('margin-top');
		this.style.removeProperty('margin-bottom');
		this.style.removeProperty('overflow');
		this.style.removeProperty('transition-duration');
		this.style.removeProperty('transition-property');
	}, duration);
}
Element.prototype.slideDown = function (duration = 300) {
	this.style.removeProperty('display');
	let display = window.getComputedStyle(this).display;

	if (display === 'none')
		display = 'block';

	this.style.display = display;
	let height = this.offsetHeight;
	this.style.overflow = 'hidden';
	this.style.height = 0;
	this.style.paddingTop = 0;
	this.style.paddingBottom = 0;
	this.style.marginTop = 0;
	this.style.marginBottom = 0;
	this.offsetHeight;
	this.style.boxSizing = 'border-box';
	this.style.transitionProperty = "height, margin, padding";
	this.style.transitionDuration = duration + 'ms';
	this.style.height = height + 'px';
	this.style.removeProperty('padding-top');
	this.style.removeProperty('padding-bottom');
	this.style.removeProperty('margin-top');
	this.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		this.style.removeProperty('height');
		this.style.removeProperty('overflow');
		this.style.removeProperty('transition-duration');
		this.style.removeProperty('transition-property');
	}, duration);

}
Element.prototype.slideToggle = function (duration = 300) {
	if (window.getComputedStyle(this).display === 'none') {
		return this.slideDown(duration);
	} else {
		return this.slideUp(duration);
	}
}
Element.prototype.getAllSiblings = function () {
	const children = [...this.parentElement.children];
	return children.filter(child => child !== this);
}
/**
 * Toggle Class From Element 
 * @function elementClassToggler
 * @param  {Object.DOM} element Element To Toggle Class
 * @param  {Array.String} togglerClass Array Of Classes
 */

/**
 * elementClassToggler
 * @name Element#elementClassToggler
 * @function
 */
Element.prototype.elementClassToggler = function (togglerClass) {
	togglerClass.forEach(e_class => this.classList.toggle(e_class));
}

/**
 * Has Class From Element 
 * @function elementHasClass
 * @param  {Object.DOM} element DOM Element To Check has Class
 * @param  {String} hasClass Class
 */
Element.prototype.elementHasClass = function (hasClass, condition_true_fn = false, condition_false_fn = false) {
	this.classList.contains(hasClass) ? condition_true_fn && condition_true_fn(this) : condition_false_fn && condition_false_fn(this)
}

/**
 * Closest Class From Element 
 * @function elementHasClosest
 * @param  {Object.DOM} element DOM Element To Check has Closest Parent 
 * @param  {String} selectors Class
 * @param {function} fn_callback Call function with Closest Element as Argument  when Closest Element is found
 * @returns {void||false} Return False When Closest Element Not Found
 */
Element.prototype.elementHasClosest = function (selector, fn_callback = () => { }) {
	if (this === null) return false;
	let Closest = this.closest(selector);
	return Closest !== 'null' ? fn_callback(Closest) : false;
}

/**
 * Remove And Add Class From Body 
 * @function bodyClassToggler
 * @param  {Array.String} addClass Array Of Class To Append In Body
 * @param  {Array.String} RemoveClass Array Of Class To Prepand In Body
 */
const bodyClassToggler = (addClass = [], RemoveClass = []) => {
	elementClassAdd(bodyClass[0], addClass);
	elementClassRemove(bodyClass[0], RemoveClass);
}

/**
 * Add Class From Element 
 * @function elementClassAdd
 * @param  {Object.DOM} element Element To Append Class
 * @param  {Array.String} togglerClass Array Of Classes 
 */
const elementClassAdd = (element, addClass) => {
	addClass.forEach(e_class => element.classList.add(e_class));
}

/**
 * Remove Class From Element 
 * @function elementClassAdd
 * @param  {Object.DOM} element Element To Prepand Class
 * @param  {Array.String} togglerClass Array Of Classes  
 */
const elementClassRemove = (element, removeClass) => {
	removeClass.forEach(e_class => element?.classList?.remove(e_class));
}

Element.prototype.getSiblings = function () {
	// for collecting siblings
	let siblings = [];
	// if no parent, return no sibling
	if (!this.parentNode) {
		return siblings;
	}
	// first child of the parent node
	let sibling = this.parentNode.firstChild;
	// collecting siblings
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== this) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};


/*---------------------------------------------------------------------
	   Scroll
-----------------------------------------------------------------------*/

const sticky_header_js = (sticky_header) => {
	let current_pos = window.pageYOffset;
	window.addEventListener('scroll', e => {
		let pageIsOnTop = window.pageYOffset != 0;
		let [addClass, removeClass, is_header_up] = window.pageYOffset < current_pos ? [
			["header-up"],
			["header-down"], true
		] : [
			["header-down"],
			["header-up"], false
		];
		pageIsOnTop ? header_sticky_class_toggler({
			'sticky_header': sticky_header,
			'addClass': addClass,
			'removeClass': removeClass
		}) : header_sticky_class_toggler({
			'sticky_header': sticky_header,
			'addClass': [],
			'removeClass': ["header-up", "header-down"]
		});
		is_header_up && pageIsOnTop ? bodyClassToggler(["header--is-sticky"], []) : bodyClassToggler([], ["header--is-sticky"]);
		current_pos = window.pageYOffset;
	});
}
const header_sticky_class_toggler = (headerElement) => {
	elementClassAdd(headerElement['sticky_header'], headerElement['addClass']);
	elementClassRemove(headerElement['sticky_header'], headerElement['removeClass']);
}

headerClass ? sticky_header_js(headerClass) : null;



if (backToTop !== null && backToTop !== undefined) {
	window.addEventListener('scroll', (e) => {
		backToTop.style.opacity = document.documentElement.scrollTop > 150 ? "1" : "0";
	});
	// scroll body to 0px on click
	document.querySelector('#top').addEventListener('click', function (e) {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}


/*------------------------
			 Calculate Header Height 
--------------------------*/
const headerHeightCount = () => {
	let headerHeight = document.querySelector('header').getBoundingClientRect().height;
	document.querySelector(':root').style.setProperty('--header-height', headerHeight + 'px');
}

window.addEventListener('resize', function () {
	headerHeightCount();
	if (window.outerWidth > 1200) {
		bodyClass[0].elementHasClass("overflow-hidden", (e) => {
			elementClassRemove(e, ["overflow-hidden"]);
		});
	} else {
		navBarToggler !== null && navBarToggler.elementHasClass("moblie-menu-active", (e) => {
			elementClassAdd(bodyClass[0], ["overflow-hidden"]);
		});
	}

});

/*------------------------
 main menu toggle
--------------------------*/


const navBarTogglerEvent = (element) => {
	element.addEventListener('click', (event) => {
		if (window.outerWidth < 1200) {
			bodyClassToggler(["overflow-hidden"])
		}
		document.querySelector('.css_prefix-mobile-menu').elementClassToggler(["menu-open"]);
		navBarToggler?.elementClassToggler(["is-active"]);
	});
}

const customTogglerEvent = (e) => {
	e.addEventListener('click', (event) => {
		closeMenu();
	});
}
const closeMenu = () => {
	if (window.outerWidth < 1200) {
		elementClassRemove(bodyClass[0], ["overflow-hidden"])
	}
	elementClassRemove(document.querySelector('.css_prefix-mobile-menu'), ["menu-open"]);
	navBarToggler !== null && navBarToggler.elementClassToggler(["is-active"]);
}
navBarToggler !== null && navBarTogglerEvent(navBarToggler);
customToggler && customTogglerEvent(customToggler);

document.documentElement.addEventListener('click', (event) => {
	if (event.target.closest('.css_prefix-mobile-menu.menu-open') === null) {
		closeMenu();
	}
}, true);

function VerticalMenu() {
	const mobileMenu = document.querySelectorAll('nav.mobile-menu .top-menu , nav.mobile-menu .layout-vertical-style');

	mobileMenu.forEach(function (menus) {
		menus?.addEventListener('click', (e) => {
			let target = e.target;
			if (target.elementHasClosest('A')) return;
			let getLink = target.closest('a').getAttribute('href');
			let checkClass = ("#" == getLink || "javascript:void(0)" == getLink) ? ".toggledrop , a" : ".toggledrop";
			target.elementHasClosest(checkClass, (closestElement) => {
				closestElement?.elementHasClosest('li', (closestLI) => {
					e.preventDefault();
					closestLI.getSiblings().forEach(function (item) {
						if (item.classList.contains('active')) {
							item.querySelector('.toggledrop').click();
						}
					})
					closestLI.classList.toggle('active');
					closestLI.querySelector('.sub-menu').slideToggle();
				});
			});
		});

	})
}


(function (jQuery) {
	"use strict";

	jQuery(window).on('load', function (e) {

		/*------------------------
		Page Loader
		--------------------------*/
		jQuery("#load").fadeOut();
		jQuery("#loading").delay(0).fadeOut("slow");

		/*---------------------------
		Vertical Menu
		---------------------------*/
		VerticalMenu();

	});


	jQuery(document).ready(function () {

		headerHeightCount();
		/*------------------------
				superfish menu
		--------------------------*/
		jQuery('ul.sf-menu').superfish({
			delay: 500,
			onBeforeShow: function (ul) {
				var elem = jQuery(this);
				var elem_offset = 0,
					elem_width = 0,
					ul_width = 0;

				if (elem.length == 1) {
					var page_width = jQuery('#page.site').width(),
						elem_offset = elem.parents('li').eq(0).offset().left,
						elem_width = elem.parents('li').eq(0).outerWidth(),
						ul_width = elem.outerWidth();

					if (elem.hasClass('iqonic-megamenu-container')) {
						if (elem.hasClass('iqonic-full-width')) {
							jQuery('.iqonic-megamenu-container.iqonic-full-width').css({
								'left': -elem_offset,
							});
						}
						if (elem.hasClass('iqonic-container-width')) {
							let containerOffset = (elem.closest('.elementor-container').length > 0) ? elem.closest('.elementor-container').offset() : elem.parents('li').eq(0).closest('header .container-fluid nav,header .container nav').offset();
							containerOffset && jQuery('.iqonic-megamenu-container.iqonic-container-width').css({
								'left': -(elem_offset - containerOffset.left)
							});
						}
					}
					if (elem_offset + elem_width + ul_width > page_width - 20 && elem_offset - ul_width > 0) {
						elem.addClass('open-submenu-main');
						elem.css({
							'left': 'auto',
							'right': '0'
						});
					} else {
						elem.removeClass('open-submenu-main');
						elem.css({});
					}
				}
				if (elem.parents("ul").length > 1) {
					var page_width = jQuery('#page.site').width();
					elem_offset = elem.parents("ul").eq(0).offset().left;
					elem_width = elem.parents("ul").eq(0).outerWidth();
					ul_width = elem.outerWidth();

					if (elem_offset + elem_width + ul_width > page_width - 20 && elem_offset - ul_width > 0) {
						elem.addClass('open-submenu-left');
						elem.css({
							'left': 'auto',
							'right': '100%'
						});
					} else {
						elem.removeClass('open-submenu-left');
					}
				}
			},
		});

		/*------------------------
				Wow Animation
		--------------------------*/
		if (jQuery(".wow").length > 0) {
			var wow = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: true,
				live: true
			});
			wow.init();
		}

		/*------------------------
			Search Bar
		--------------------------*/
		if (jQuery(".btn-search").length > 0) {
			jQuery(document).on('click', '.btn-search', function () {
				jQuery(this).parent().find('.css_prefix-search').toggleClass('search--open');
			});
			jQuery(document).on('click', '.btn-search-close', function () {
				jQuery(this).closest('.css_prefix-search').toggleClass('search--open');
			});
		}

		// jQuery(".navbar-toggler").click(function () {
		// 	if (jQuery(window).width() < 1200) {
		// 		jQuery('body').toggleClass('overflow-hidden');
		// 	}
		// });

		/*-----------------------------------------------------------------------
								Select2 
		-------------------------------------------------------------------------*/
		if (jQuery('select').length > 0) {
			jQuery('select').each(function () {
				jQuery(this).select2({
					width: '100%',
					dropdownParent: jQuery(this).parent()
				});
			});
			jQuery('.select2-container').addClass('wide');
		}

		/*------------------------
		Add to cart with plus minus
		--------------------------*/
		jQuery(document).on('click', 'button.plus, button.minus', function () {

			jQuery('button[name="update_cart"]').removeAttr('disabled');

			var qty = jQuery(this).closest('.quantity').find('.qty');


			if (qty.val() == '') {
				qty.val(0);
			}
			var val = parseFloat(qty.val());

			var max = parseFloat(qty.attr('max'));
			var min = parseFloat(qty.attr('min'));
			var step = parseFloat(qty.attr('step'));

			// Change the value if plus or minus
			if (jQuery(this).is('.plus')) {
				if (max && (max <= val)) {
					qty.val(max);
				} else {
					qty.val(val + step);
				}
			} else {
				if (min && (min >= val)) {

					qty.val(min);
				} else if (val >= 1) {

					qty.val(val - step);
				}
			}
			set_quanity(jQuery(this));
		})

		/*------------------------
		Cart btn 
		--------------------------*/

		if (jQuery(document).find('.dropdown-hover').length > 0) {
			jQuery(document).on('click', ".dropdown-hover a.dropdown-cart", function () {
				jQuery(".dropdown-menu-mini-cart").addClass('cart-show');
			});
			jQuery(document).on('click', ".dropdown-close", function () {
				jQuery(".dropdown-menu-mini-cart").removeClass('cart-show');
			});
			jQuery('body').mouseup(function (e) {
				if (jQuery(e.target).parents('.dropdown-menu-mini-cart').length === 0) {
					jQuery(".dropdown-menu-mini-cart").removeClass('cart-show');
				}
			});

			jQuery(".css_prefix-users-settings .dropdown-hover").hover(function () {
				var isHovered = jQuery(this).is(":hover");
				if (isHovered) {
					jQuery(this).find(".dropdown-menu").stop().fadeIn(300);
				} else {
					jQuery(this).find(".dropdown-menu").stop().fadeOut(300);
				}
			});

			jQuery(document).on('click', ".css_prefix-users-settings a.dropdown-toggle", function (e) {
				jQuery(e.target).closest('a.dropdown-toggle').next('.css_prefix-user-dropdown').fadeIn(300)
				jQuery(e.target).closest('a.dropdown-toggle').next('.css_prefix-user-dropdown').toggleClass('show')
			});

			jQuery(document).on('click','body', function (e) {
				if (jQuery(e.target).parents('.css_prefix-users-settings a.dropdown-toggle').length === 0) {
					jQuery(".css_prefix-user-dropdown").fadeIn(300);
					jQuery(".css_prefix-user-dropdown").removeClass('show');
				}
			});

		}

		/*==================
		overlay-js
		======================*/
		jQuery("body").on("iq_layout_toggle", function ($e, $layout) {
			let overlay = $layout.prev();
			overlay.hasClass('iq-layout-overlay') && overlay.toggleClass('open')
		});

		/*------------------------
		   shop sidebar toggle button
	   --------------------------*/
		if (jQuery('.shop-filter-sidebar').length > 0) {
			jQuery(document).on('click', '.shop-filter-sidebar', function () {
				jQuery('body').find('.css_prefix-woo-sidebar').toggleClass('woo-sidebar-open');
				jQuery('body').addClass('woof-overlay');

			});
		}

	});

	jQuery(document).on('removed_from_cart added_to_cart', function (e) {
		set_quanity(jQuery('input.qty'));
		jQuery('.css_prefix-cart-count').text(jQuery('.mini-cart-count').first().text().trim());
	});


}(jQuery));

// Wocomerce Set Quantiy Input 
function set_quanity(this_) {
    if (!this_.hasClass('qty')) {
        this_ = this_.siblings('input.qty');
    }
    let current = this_.attr('name');

    let item_hash = current ? current.replace(/cart\[([\w]+)\]\[qty\]/g, "$1") : false;
    if (!item_hash)
        return

    let item_quantity = this_.val();
    let currentVal = parseFloat(item_quantity);

    jQuery.ajax({
        type: 'POST',
        url: iqonic_loadmore_params.ajaxurl,
        data: {
            action: 'qty_cart',
            hash: item_hash,
            quantity: currentVal
        },
        success: function (res) {
            jQuery(document.body).trigger('wc_fragment_refresh');
            jQuery('.css_prefix-cart-count').html(res['data']['quantity'])
        }
    });
}
