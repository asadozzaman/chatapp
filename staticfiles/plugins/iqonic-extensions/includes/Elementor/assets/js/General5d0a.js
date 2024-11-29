/*------------------------------------------------
Index Of Script
----------------------------------------------*/
(function (jQuery) {
    "use strict";

    /*---------------------------------------------------------------------
            Dark - Light Mode
    -----------------------------------------------------------------------*/
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // set cookie value
    function setCookie(cname, cvalue, exdays = 1) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; Path=/;";
    }

    const mode = (document.querySelector('.switch-mode-icon')) ? document.querySelector('.switch-mode-icon') : null;

    if (mode != null) {
        var bgClass = getCookie('data-mode');
        if (bgClass != '') {
            document.getElementsByTagName("html")[0].setAttribute('data-mode', bgClass);
            document.querySelector('.css_prefix-switch-mode').setAttribute('data-mode', bgClass);
        } else {
            setCookie('data-mode', bgClass);
        }

        const modeSettingAll = document.querySelectorAll('.css_prefix-switch-mode');

        modeSettingAll.forEach(modeSetting => {
            if (modeSetting !== null) {
                modeSetting.addEventListener('click', (e) => {
                    e.preventDefault();
                    var bgClass = modeSetting.getAttribute('data-mode');
                    if (bgClass == "dark") {
                        bgClass = "light";
                    } else {
                        bgClass = "dark";
                    }
                    modeSetting.setAttribute('data-mode', bgClass);
                    document.getElementsByTagName("html")[0].setAttribute('data-mode', bgClass);
                    setCookie('data-mode', bgClass);
                })
            }
        })

    }


})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazySection = entry.target;
                    let img = lazySection.querySelectorAll("img.iqonic-lazy");
                    img.forEach(function (img) {
                        if (img.dataset.src)
                            img.src = img.dataset.src;
                        if (img.dataset.srcset)
                            img.srcset = img.dataset.srcset;
                        lazySection.classList.remove("iqonic-lazy-load-images");
                        lazyImageObserver.unobserve(lazySection);
                    });
                }
            });
        });

        var lazySection = document.querySelectorAll(".iqonic-lazy-load-images");

        lazySection.forEach(function (lazySection) {
            lazyImageObserver.observe(lazySection);
        });
    }
});

