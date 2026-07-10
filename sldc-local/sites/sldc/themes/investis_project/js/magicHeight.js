/**
 * magicHeight 1.0.0
 *
 */

; (function ($) {
    'use strict';

    var pluginName = 'magicHeight',
        defaults = {
            itemClass: '.item',
            line: 'auto',
            resize: true,
            load: true
        };

    var Plugin = function (element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    Plugin.prototype = {
        init: function () {
            this.elements = this.element.find(this.options.itemClass);

            this._setHeight();

            if (this.options.resize)
                $(window).on('resize', $.proxy(this._setHeight, this));

            if (this.options.onload)
                $(window).on('load', $.proxy(this._setHeight, this));
        },

        update: function () {
            this.elements = this.element.find(this.options.itemClass);
            this._setHeight();
        },

        _getElementsInLine: function () {
            var elements_in_line;

            if (this.options.line === 'all') {
                elements_in_line = this.elements.length;
            } else if (this.options.line === 'number' && this.options.line % 1 === 0 && this.options.line > 0) {
                elements_in_line = this.options.line;
            } else {
                var last_top_offset = this.elements.first().offset().top,
                    i = 0;

                this.elements.each(function () {
                    var el_offset_top = $(this).offset().top;

                    if (last_top_offset === el_offset_top) {
                        i++;
                        last_top_offset = el_offset_top;
                    } else {
                        return false;
                    }
                });

                elements_in_line = i;
            }

            return elements_in_line
        },

        _setHeight: function () {
            var self = this,
                set_height = 0,
                elements_in_line = this._getElementsInLine();

            this.elements.css('height', '').each(function (i) {
                var item = $(this),
                    item_h = item.height();

                if (item_h > set_height)
                    set_height = item_h;

                //last element in row
                if (i > 0 && i % elements_in_line === elements_in_line - 1) {
                    //update elements in current row
                    self.elements.slice(i - elements_in_line + 1, i + 1).height(set_height);
                    //reset set height
                    set_height = 0;

                    //last element
                } else if (i === self.elements.length - 1) {
                    var index = i % elements_in_line + 1;
                    //last elements in last row
                    self.elements.slice(-index).height(set_height);
                    set_height = 0;
                }
            });
        }
    };


    $.fn[pluginName] = function (options) {
        if (options === undefined || typeof options === 'object') {
            this.each(function () {
                $(this).data('plugin_' + pluginName, new Plugin($(this), options));
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;

            this.each(function () {
                var instance = $(this).data('plugin_' + pluginName);

                if (instance instanceof Plugin && typeof instance[options] === 'function')
                    returns = instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
            });

            return returns !== undefined ? returns : this;
        }

        return this;
    };
})(jQuery);