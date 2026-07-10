(function ($) {
  Drupal.behaviors.newmidsolrsearch = {
    attach: function (context) {

      var LANGUAGE = 'en';
      var base_url = window.location.origin;

      /**
       * @param sourceSelector
       * @returns {string}
       */
      function buildAutocompleParams(sourceSelector) {
        var ret = {
          'language': LANGUAGE,
          'facet_prefix': $(sourceSelector).val().trim()
        };
        return JSON.stringify(ret);
      }

      /**
       * @param autocompleteSelector
       * @param searchapiurl
       */
      function initAutocomplete(autocompleteSelector, searchapiurl) {
        var xhr // Store the autocomplete ajax query object.

          $(autocompleteSelector).autocomplete({
          lookup: (query, done) => {
            if (xhr) {
              xhr.abort(); // Abort any existing ajax queries to avoid race conditions.
            }

            var inputs = {
              'Handler': 'autocomplete',
              'Query': buildAutocompleParams(autocompleteSelector)
            };
            xhr = $.ajax({
              noCache: true,
              url: searchapiurl,
              data: inputs,
              type: 'POST',
              dataType: 'json',
              success: function (data) {
                //Create a json that is understood by render item easily
                var json = JSON.parse(data);
                //faceted autocomplete field
                json = json.facet_counts.facet_fields.tnt_txt_en;
                var autocompleteResult = [];

                for (var i = 0; i < json.length; i += 2) {
                  autocompleteResult.push({
                    value: json[i],
                    data: json[i + 1]
                  });
                }

                done({suggestions: autocompleteResult});
              },
              error: function (data) {
                // Ignore abort requests.
                if (data.statusText !== 'abort') {
                  console.error(
                    'Error loading response data' + data.responseText);
                }
              }
            });
          },
          minChars: 1,
          onSelect: (suggestion) => {
            $(autocompleteSelector).val(suggestion.value);
            $(autocompleteSelector).closest('form').submit();
          },
        });


        $(autocompleteSelector).autocomplete('widget').addClass('solr-search-autocomplete');
      }

      /**
       * @param event
       * @returns {boolean}
       */
      function handle_submit(event) {
        var q = $('.search-form #solrstrap-searchbox-form').val().trim();
        var queryType = $('input[name=querytype]:radio:checked').val();
        if (q !== '') {
          $.bbq.pushState({
            'queryType': queryType,
            'q': q
          });
        }
        return false;
      }

      /**
       * jquery plugin allows autoloading of next results when scrolling.
       * @param q
       * @param fq
       * @param offset
       */
      $.fn.loadSolrResultsWhenVisible = function (q, fq, offset) {
        var elem = this;
        q = getUrlParameter('q');

        $(window).scroll(function (event) {
          if (isScrolledIntoView(elem) && !$(elem).attr('loaded')) {
            // Dont instantsearch and autoload at the same time.
            if ($('.search-form #solrstrap-searchbox-form').val() !== q) {
              handle_submit();
            }
            $(elem).attr('loaded', true);
            fq = getUrlParameter('fq');
            $(elem).getSolrResults(q, fq, offset);
            $(window).unbind('scroll');
          }
        });
      };

      $('.ui-autocomplete-input').css('width', '500px;');
      //AUTOCOMPLETE SECTION - START
      $(document).ready(function () {
        $('#submitSearchButtonHeader').click(function (e) {
          if (window.location.href.indexOf('/site-services/search-results') < 0) {
            document.location.href = '/site-services/search-results#queryType=All&q=' + $j('#solrstrap-searchbox').val();
          }
        });
      });

      /**
       * Entrypoint for initializing the autocompletes.
       */
      jQuery(document).ready(function () {
        var searchapiurl = base_url + '/searchautocomplete';

        // Initialize all the possible autocompletes on the page.
        initAutocomplete('.search-form #solrstrap-searchbox-form', searchapiurl);
        initAutocomplete('#solrstrap-searchbox', searchapiurl);

        // This may not be required. Added for completeness / backward compatibility.
        initAutocomplete('.mmenu #solrstrap-searchbox-form', searchapiurl);
      });

    },
  };
}(jQuery));
