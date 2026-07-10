/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
$ = jQuery.noConflict();
(function ($) {

    $.fn.topLink = function (settings) {
        settings = jQuery.extend({
            min: 1,
            fadeSpeed: 200,
            ieOffset: 50
        }, settings);
        return this.each(function () {
            //listen for scroll
            var el = $(this);
            el.css('display', 'none'); //in case the user forgot
            $(window).scroll(function () {
                if (!jQuery.support.hrefNormalized) {
                    el.css({
                        //'position': 'absolute',
                        //'top': $j(window).scrollTop() + $j(window).height() - settings.ieOffset
                    });
                }
                if ($(window).scrollTop() >= settings.min) {
                    el.fadeIn(settings.fadeSpeed);
                } else {
                    el.fadeOut(settings.fadeSpeed);
                }
            });
        });
    };

    $(document).ready(function () {
        var pathname = window.location.pathname;
        if (pathname == "/footer-only-layout" || pathname == "/header-only-layout") {
            $("#local-website-listing__value").click();
        }
        //console.log(pathname);
        var pieces = pathname.split("/");

        $('#auto-top-link').topLink({
            min: 1,
            fadeSpeed: 300
        });

        //smoothscroll
        $('#auto-top-link').click(function (e) {
            e.preventDefault();
            var offset = $("body").offset();
            $("html,body").animate({
                scrollTop: 0,
                //scrollLeft: offset.left
            });
        });

    });
})(jQuery);
