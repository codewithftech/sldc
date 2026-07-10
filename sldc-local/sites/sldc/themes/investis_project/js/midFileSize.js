(function ($, Drupal) {
    Drupal.behaviors.exampleModule = {
        attach: function (context, settings) {
            var file_path_loc;
            var sizeIn;

            jQuery(function () {
                jQuery("a", context).each(function () {
                    var $this = jQuery(this);

                    if ($this.hasClass("ext-file")) {
                        return;
                    }

                    var file_loc = $this.attr("href");
                    if (!file_loc) return;

                    var file_type = file_loc.split('.').pop();
                    var arr = ["pdf", "doc", "docx", "xlsx", "xls", "ppt", "pptx", "PDF"];
                    var sizeinfo;

                    if (jQuery.inArray(file_type, arr) !== -1) {
                        var size = $this.prop('type');

                        if (size) {
                            var file_size = size.split('=');
                            if (file_size[1] > 900000) {
                                sizeIn = fileSize(file_size[1], 'mb');
                            } else {
                                sizeIn = fileSize(file_size[1], 'kb');
                            }
                            applyAttributes($this, file_type, sizeIn);
                        } else {
                            if (file_path_loc !== file_loc) {
                                file_path_loc = file_loc;
                                var req = new XMLHttpRequest();
                                req.open('HEAD', file_loc, false);
                                req.send(null);
                                var headers_size = req.getResponseHeader("Content-Length");
                                sizeinfo = headers_size;

                                if (sizeinfo > 900000) {
                                    sizeIn = fileSize(sizeinfo, 'mb');
                                } else {
                                    sizeIn = fileSize(sizeinfo, 'kb');
                                }
                            }
                            applyAttributes($this, file_type, sizeIn);
                        }
                    }
                });
            });

            function applyAttributes($link, file_type, sizeIn) {
                var msg, pdfSizeAttr = sizeIn;

                if ($link.hasClass('fa-download')) {
                    msg = file_type.toUpperCase() + ', ' + sizeIn + ', Download';
                    $link.attr('download', 'download');
                } else {
                    msg = file_type.toUpperCase() + ', ' + sizeIn + ', opens in a new window';
                    $link.attr('target', '_blank');
                }

                $link.attr('title', msg);
                $link.next('.file-size--label').text(pdfSizeAttr);
            }

            function fileSize(bytes, unit) {
                if ((!unit && bytes >= 1 << 30) || unit == "GB")
                    return number_format(bytes / (1 << 30), 2) + "GB";
                if ((!unit && bytes >= 1 << 20) || unit == "mb")
                    return number_format(bytes / (1 << 20), 1) + "MB";
                if ((!unit && bytes >= 1 << 10) || unit == "kb")
                    return number_format(bytes / (1 << 10), 0) + "KB";
                return number_format(bytes) + " bytes";
            }

            function number_format(number, decimals, dec_point, thousands_sep) {
                number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                var n = !isFinite(+number) ? 0 : +number,
                    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                    s = '',
                    toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + (Math.round(n * k) / k).toFixed(prec);
                    };

                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                if (s[0].length > 3) {
                    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                return s.join(dec);
            }
        }
    };
})(jQuery, Drupal);
