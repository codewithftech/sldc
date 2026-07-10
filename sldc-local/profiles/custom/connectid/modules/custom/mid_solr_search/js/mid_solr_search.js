(function ($, drupalSettings) {

  Drupal.behaviors.midsolrsearch = {
    /**
     * @param context
     * @param settings
     * @returns {boolean}
     */
    attach: function (context, settings) {


      var LANGUAGE = '';
      if (typeof drupalSettings.mid_solr_search !== 'undefined' && (drupalSettings.mid_solr_search.mid_solr_search.language) !== '') {

        var LANGUAGE = drupalSettings.mid_solr_search.mid_solr_search.language;
        var solrClientname = drupalSettings.mid_solr_search.mid_solr_search.solrClient;//"qsbw_dev";
        var keywordtracking = "0";//drupalSettings.mid_solr_search.mid_solr_search.popularsearch;//"0";
        var HITSPERPAGE = drupalSettings.mid_solr_search.mid_solr_search.rows_number;//"10";
        var AUTOCOMPLETEFIELD = "tnt_txt_" + LANGUAGE;

      }
//VARIABLES - START
      var country_arr = ["United States", "United Kingdom", "Netherlands"];
      var job_business_arr = ["UBM Americas", "UBM EMEA", "UBM Corporate", "Connect Group"];
      var job_category_arr = ["AdministrativeClerical", "HumanResources", "Sales", "Events", "Marketing", "AccountingFinance"];
      var job_sorting_arr = new Array("Posted Date");
      var TAB_METATAG = "meta_section";
      var HITTITLE = 'title';
      var HITBODY = 'text';
      var HITPUBLISHDATE = "header_date_publish-date";
      var HITMETAPUBLISHDATE = "meta_date_publishdate_" + solrClientname;
      var HITMETACONTENTTYPE = "meta_contenttype_" + solrClientname;
      var HITMETATHUMNAILIMAGE = "meta_thumbnailimage_" + solrClientname;
      var HITMETAFILE = "meta_file_" + solrClientname;
      var HITMETATITLE = "meta_title_" + solrClientname;
      var HITMETAVIDEOURL = "meta_videourl_" + solrClientname;
      var HITMETAVIDEOURL = "meta_field_text_field_" + solrClientname;
      var HITMETADESIGNATION = "meta_field_designation_" + solrClientname;
      var HITMETATEXTBOX = "meta_textbox_" + solrClientname;

      var HITMETAJOBCATEGORY = "meta_taxonomy_" + solrClientname;
      var HITMETAJOBBUSINESS = "meta_field_ubm_businesses_" + solrClientname;
      var HITMETAJOBCOUNTRY = "meta_field_job_country_" + solrClientname;

      var HITOTPTOOLNAME = "otptoolname";
      var HITID = 'id';
      var HITLINK = 'absoluteurl';
      var HL = true;
      var TAG = 'otptoolname';
      var OTPTOOLS = ['RNS', 'OMX'];
      var OTPCAT = [];
      var DTYPE = 'solrdocumenttype';
      var facetData = [];
      var base_url = window.location.origin;
      var pathArray = window.location.pathname.split('/');
      var pathname = pathArray[1];
//page size- hits per page
//var HITSPERPAGE =
// "10";//drupalSettings.mid_solr_search.mid_solr_search.rows_number;//"10";
      var PAGESIZE = 0;
      var CURRENTPAGE = 0;

      $(document).ajaxSend(function (event, request, settings) {
        $('#loading-indicator').show();
        // $('.loaderbtn').css('display','block');
        // $('body').addClass("loaderon");
      });

      $(document).ajaxComplete(function (event, request, settings) {
        $('#loading-indicator').hide();
        // $('.loaderbtn').css('display','none');
        // $('body').removeClass("loaderon");
      });

      /**
       * @param url
       * @returns {*}
       * @constructor
       */
      function YouTubeGetID(url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
          ID = url[2].split(/[^0-9a-z_\-]/i);
          ID = ID[0];
        }
        else {
          ID = url;
        }
        return ID;
      }

      var textenthere = '';
      var textenresult = '';
      var queryp = '';

      if (LANGUAGE !== undefined && LANGUAGE === 'en') {
        textenthere = 'There are';
        textenresult = 'result for ';
      }
      else {
        textenthere = 'Là sont';
        textenresult = 'résultat pour ';
      }

      /**
       * @param sParam
       * @param sDefault
       * @returns {*|boolean}
       */
      function getUrlParameter(sParam, sDefault) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : Drupal.checkPlain(sParameterName[1]);
          }
        }

        if (typeof sDefault !== 'undefined') {
          return sDefault;
        }
      }

      var sortparam = getUrlParameter('sort');
      var q = getUrlParameter('q');
      var nfq = getUrlParameter('fq');
      var ftype = getUrlParameter('ftype');
      var start = getUrlParameter('start', 0);
      var pagecount = getUrlParameter('page', 1);
      var sorttype = getUrlParameter('sort');
      var otpcatname = getUrlParameter('otpcatname');
      var querytype = getUrlParameter('querytype', 'Exact');
      var fqsdate = getUrlParameter("fqsdate");
      var fqedate = getUrlParameter("fqedate");
      var selectedotpcatname = getUrlParameter('otpcatname');
      var meta_facet = getUrlParameter('meta_facet');
      var meta_job_country_param = getUrlParameter('meta_job_country');
      var meta_job_business_param = getUrlParameter('meta_job_business');
      var meta_job_cat_param = getUrlParameter('meta_job_cat');
      var meta_job_sort_param = getUrlParameter('meta_job_sort');


      var currentpath = window.location.href;
      if (currentpath.indexOf("search-result") > -1) {
        $('.links li').filter(function () {
          return $(this).attr('hreflang') === LANGUAGE;
        }).addClass('is-active');
      }

      if (getUrlParameter("querytype") === "all") {
        $('input[name=querytype][value=all]').prop("checked", true);
      }
      if (getUrlParameter("querytype") === "Exact") {
        $('input[name=querytype][value=Exact]').prop("checked", true);
      }


      jQuery(document).ready(function ($) {

        jQuery("#mid-solr-search-form, #searchresultform").on("submit", function (event) {
          event.preventDefault();
          if (handleinput($(this).attr("id"))) {
            this.submit();
          }
        });

        $('#jobfilters').click(ExecuteJobFilterQuery);
        $('#solrstrap-hits').append('<div offset="0"></div>');
        $('#solrstrap-searchbox').focus();
        var queryp = getUrlParameter('q');

        if (queryp === undefined) {
          return false;
        }
        queryp = queryp.replace(/\+/g, " ");
        queryp = queryp.replace(/\+/g, " ");
        queryp = queryp.replace(/<script/gi, '&lt;script').replace(/\son[a-z]+=/gi, 'XXXX_BLOCKED=');
        queryp = decodeURIComponent((queryp + '').replace(/\+/g, '%20'));

        $('#solrstrap-searchbox').val(queryp);
        $("#sortlist").change(function (e, doNotRedirect) {
          if (doNotRedirect !== undefined && doNotRedirect) {
            return false;
          }

          var selectedtext = $("#sortlist option:selected").val();

          if (nfq !== undefined) {
            if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
              var url = base_url + '/' + LANGUAGE + '/search-result/?q=' + q + '&fq=' + nfq + '&querytype=' + querytype + '&sort=' + selectedtext;
            }
            else {
              var url = base_url + '/search-result/?q=' + q + '&fq=' + nfq + '&querytype=' + querytype + '&sort=' + selectedtext;
            }

            //var url =
            // base_url+'/search-result/?q='+q+'&fq='+nfq+'&querytype='+querytype+'&sort='+selectedtext;
            // // get selected value
          }
          else if (ftype !== undefined) {
            if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
              var url = base_url + '/' + LANGUAGE + '/search-result/?q=' + q + '&ftype=' + ftype + '&querytype=' + querytype + '&sort=' + selectedtext; // get selected value
            }
            else {
              var url = base_url + '/search-result/?q=' + q + '&ftype=' + ftype + '&querytype=' + querytype + '&sort=' + selectedtext; // get selected value
            }
            //var url =
            // base_url+'/search-result/?q='+q+'&ftype='+ftype+'&querytype='+querytype+'&sort='+selectedtext;
            // // get selected value
          }
          else {
            if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
              var url = base_url + '/' + LANGUAGE + '/search-result/?q=' + q + '&querytype=' + querytype + '&sort=' + selectedtext; // get selected value
            }
            else {
              var url = base_url + '/search-result/?q=' + q + '&querytype=' + querytype + '&sort=' + selectedtext; // get selected value
            }
            //var url =
            // base_url+'/search-result/?q='+q+'&querytype='+querytype+'&sort='+selectedtext;
            // // get selected value
          }
          if (url) { // require a URL
            window.location = url; // redirect
          }
          return false;
        });


        //when the searchbox is typed- do this
        $(window).bind('hashchange', hashchange);
        hashchange();
        $('#filterPublishDate').click(ExecuteRangeQuery);
      });

      /**
       * @param formId
       * @returns {boolean}
       */
      function handleinput(formId) {

        if (formId === "mid-solr-search-form" && jQuery("#solrstrap-searchbox-form").val() == "") {
          jQuery("#solrSearchBlockError").html("Please enter some keywords.");
          jQuery("#solrSearchBlockError").show();
          return false;
        }
        if (formId === "searchresultform" && jQuery("#solrstrap-searchbox").val() == "") {
          jQuery("#searchresultformError").html("Please enter some keywords.");
          jQuery("#searchresultformError").show();
          return false;
        }
        else {
          jQuery("#solrSearchBlockError").hide();
          jQuery("#searchresultformError").hide();
          return true;
        }
      }

      /*START Load more Function for Paginatoin*/
      loadMore();
      $("#btnLoadMore").on("click", loadMore);
      /*END Load more Function for Paginatoin*/

//jquery plugin for takling to solr
      /*Solr Query result Script START*/

      /**
       * @param q
       * @param fq
       * @param offset
       */
      $.fn.getSolrResults = function (q, fq, offset) {

        var searchapiurl = base_url + '/solrSearch';
        var inputs = {
          Handler: 'facet',
          keyword: q,
        };

        if (nfq !== undefined) {
          inputs.fq = nfq;
        }

        if (LANGUAGE !== undefined) {
          inputs.langcode = LANGUAGE;
        }

        if (start !== undefined) {
          inputs.start = start;
        }

        if (pagecount !== undefined) {
          inputs.page = pagecount;
        }

        if (sorttype !== undefined) {
          inputs.sort = sorttype;
        }

        if (otpcatname !== undefined) {
          inputs.otpcatname = otpcatname.replace(/,/g, "|");
        }

        if (keywordtracking !== undefined && keywordtracking === '1') {
          inputs.keywordtracking = true;
        }


        if (meta_facet !== undefined && meta_facet === 'jobs') {

          var meta_job_cat = getUrlParameter('meta_job_cat');
          var meta_job_country = getUrlParameter('meta_job_country');
          var meta_job_business = getUrlParameter('meta_job_business');
          var meta_job_sort = getUrlParameter('meta_job_sort');


          inputs.meta_facet = 'jobs';

          if (meta_job_cat !== undefined) {
            inputs.meta_job_cat = meta_job_cat;
          }

          if (meta_job_business !== undefined) {
            inputs.meta_job_business = meta_job_business;
          }

          if (meta_job_sort !== undefined) {
            inputs.meta_job_sort = meta_job_sort;
          }

          if (meta_job_country !== undefined) {
            inputs.meta_job_country = meta_job_country;
          }
        }

        if (fqsdate !== undefined && fqedate !== undefined) {
          inputs.fqsdate = fqsdate;
          inputs.fqedate = fqedate;
        }

        if (querytype !== undefined) {
          inputs.querytype = querytype;
        }

        var rs = this;
        $(rs).parent().css({
          opacity: 0.5
        });

        $.ajax({
          url: searchapiurl,
          data: JSON.stringify(inputs),
          dataType: 'json',
          type: "POST",
          success: function (result) {
            var optionValue;

            if (result === "Failure") {
              return false;
            }
            result = JSON.parse(result);

            if (sorttype === 'date') {
              optionValue = 'date';
              $("#sortlist").val(optionValue).find("option[value=" + optionValue + "]").attr('selected', true);
              $("#sortlist").trigger('change', ['doNotRedirect']);
            }
            if (sorttype === 'score') {
              optionValue = 'score';
              $("#sortlist").val(optionValue).find("option[value=" + optionValue + "]").attr('selected', true);
              $("#sortlist").trigger('change', ['doNotRedirect']);
            }

            if (result.length > 0) {
              $('#solrstrap-sortmenu').show();
            }

            /*Meta section Provide define OTP tools  configure  results available START.*/
            if (result.facet_counts.facet_fields.meta_section) {

              if (result.facet_counts.facet_fields.meta_section.length > 0) {

                var tooleven = [];
                var toolodd = [];

                $.each(result.facet_counts.facet_fields.meta_section, function (index, value) {
                  if ((index) % 2 === 0) {

                    tooleven.push(value);
                  }
                  else {
                    toolodd.push(value);
                  }

                });

                for (var section = 0; section < tooleven.length; section++) {
                  var elementsection = "<li>";
                  elementsection += "<a href=" + base_url + "/search-result?q=" + q + "&querytype=" + querytype + "&fq=meta_section|" + tooleven[section] + ">" +
                      tooleven[section].toUpperCase() + "(" + toolodd[section] + ")</a>";
                  elementsection += "</li>";

                  $("#solrstrap-otptoolfacet").append(elementsection);
                }
                var otptooltemplate = $("#solrstrap-otptoolfacet").html();
                if (otptooltemplate) {
                  Handlebars.compile(otptooltemplate);
                  $("#solrstrap-otptoolfacet").show();
                }

              }
            }
            /*Meta section Provide define OTP tools  configure  results available END.*/

            /*Meta domain only results f there are domain configure results available START.*/
            if (result.facet_counts.facet_fields.meta_domain) {
              if (result.facet_counts.facet_fields.meta_domain.length > 0) {
                var even = [];
                var odd = [];
                $.each(result.facet_counts.facet_fields.meta_domain, function (index, value) {

                  if ((index) % 2 === 0) {
                    even.push(value);
                  }
                  else {
                    odd.push(value);
                  }
                });

                for (var i = 0; i < even.length; i++) {

                  var elementdomain = "<li>";
                  elementdomain += "<a href=" + base_url + "/search-result?q=" + q + "&querytype=" + querytype + "&fq=meta_domain|" + even[i].toUpperCase() + ">" +
                      even[i] + "(" + odd[i] + ")</a>";
                  elementdomain += "</li>";
                  $("#solrstrap-domainfacet").append(elementdomain);
                }


                var domainfacettemplate = $("#solrstrap-domainfacet").html();
                if (domainfacettemplate) {
                  Handlebars.compile(domainfacettemplate);
                  $("#solrstrap-domainfacet").show();
                }

              }

            }
            /*Meta domain only results f there are domain configure results available END.*/


            /*Solr documenttpe results are Webpages & File type results available.*/

            if (result.facet_counts.facet_fields.solrdocumenttype) {
              if (result.facet_counts.facet_fields.solrdocumenttype.length > 0) {

                var evendocument = [];
                var odddocument = [];

                $.each(result.facet_counts.facet_fields.solrdocumenttype, function (index, value) {
                  if ((index) % 2 === 0) {
                    evendocument.push(value);
                  }
                  else {
                    odddocument.push(value);
                  }
                });
                for (var dtype = 0; dtype < evendocument.length; dtype++) {
                  var elementdtype = "<li>";
                  if (nfq != undefined) {
                    elementdtype += "<a>" + evendocument[dtype] + "(" + odddocument[dtype] + ")</a>";
                  }
                  else {
                    elementdtype += "<a href=" + base_url + "/search-result?q=" + q + "&querytype=" + querytype + "&ftype=" + evendocument[dtype] + ">" + evendocument[dtype] + "(" + odddocument[dtype] + ")</a>";
                  }
                  elementdtype += "</li>";
                  $("#solrstrap-documentfacet").append(elementdtype);
                }

                var solrstrap_documentfacet_template = $("#solrstrap-documentfacet").html();
                if (solrstrap_documentfacet_template) {
                  Handlebars.compile(solrstrap_documentfacet_template);
                  $("#solrstrap-documentfacet").hide();
                }
              }
            }


            if (result.response.docs.length > 0) {

              //$('#solrstrap-sortmenu').hide();
              if (ftype === undefined) {
                if (offset === 0) {
                  rs.empty();
                  var totalresults = result.response.numFound;
                  var query = q;
                  query = query.replace(/\+/g, " ");
                  if (query) {
                    query = query.replace(/\+/g, " ");
                    var timetaken = result.responseHeader.QTime;
                    //strapline that tells you how many hits you got
                    $("#result-summary-template").append(Drupal.theme('searchResultSummary', totalresults, query));
                    var result_summary_template = $("#result-summary-template").html();
                    $("#result-summary-template").show();
                    if (result_summary_template) {
                      Handlebars.compile(result_summary_template);
                      $("#result-summary-template").show();
                    }
                    rs.siblings().remove();
                  }

                }


                PAGESIZE = Math.ceil(result.response.numFound / HITSPERPAGE);
                /* * * * * * * * * * * * * * * * *
                                * Initialization of pagination
                                * * * * * * * * * * * * * * * * */
                if (CURRENTPAGE == 0 && PAGESIZE > 1) {
                  var init = Pagination.Init(document.getElementById('pagination'), {
                    size: Math.ceil(result.response.numFound / HITSPERPAGE), // pages
                                                                             // size
                    page: parseInt(pagecount),  // selected page
                    step: 3   // pages before and after current
                  });
                }

                if (PAGESIZE > 1) {
                  $('#pagination').show();
                }
                else {
                  $('#pagination').hide();
                }

              }

              for (var pivotfields in result.facet_counts.facet_pivot) {
                if (result.facet_counts.facet_pivot[pivotfields].length > 0) {
                  for (var tool in result.facet_counts.facet_pivot[pivotfields]) {
                    for (var pivotentity in result.facet_counts.facet_pivot[pivotfields][tool]['pivot']) {
                      var pivotvalue = result.facet_counts.facet_pivot[pivotfields][tool]['pivot'][pivotentity]['value'];
                      var count = result.facet_counts.facet_pivot[pivotfields][tool]['pivot'][pivotentity]['count'];

                      var catExists = false;
                      var catExistsAt = 0;
                      for (var idx = 0; idx < OTPCAT.length; idx++) {
                        if (OTPCAT[idx]['title'] === pivotvalue) {
                          catExists = true;
                          catExistsAt = idx;
                          break;
                        }
                      }

                      if (catExists) {
                        OTPCAT[catExistsAt] = {
                          'title': pivotvalue,
                          'count': count
                        };
                      }
                      else {
                        OTPCAT.push({
                          'title': pivotvalue,
                          'count': count
                        });
                      }

                    }

                    if (nfq === 'meta_section|sec') {
                      var selotptoolelements = '<div class="otp-cat-item"><select id="selchkotp" name="selOTPCat" name="selOTPCat"><option value="">Select All Option</option>';
                      for (var i = 0; i < OTPCAT.length; i++) {
                        if (OTPCAT[i].title === selectedotpcatname) {
                          var sec_seclected_value = 'selected="selected"';
                        }
                        else {
                          sec_seclected_value = '';
                        }
                        selotptoolelements += '<option value="' + OTPCAT[i].title + '"' + sec_seclected_value + '>' + OTPCAT[i].title + '(' + OTPCAT[i].count + ')</option>';

                      }
                      selotptoolelements += '</select></div>';
                      $('#solrstrap-otpcategories').append(selotptoolelements);
                    }
                    else {
                      for (var i = 0; i < OTPCAT.length; i++) {
                        var otptoolelements = '<div class="otp-cat-item"><input name="chkOTPCat" type="checkbox" name="chkOTPCat" value="' + OTPCAT[i].title + '"/>' + OTPCAT[i].title + '(' + OTPCAT[i].count + ')</div>';
                        $('#solrstrap-otpcategories').append(otptoolelements);
                      }
                    }
                  }
                }
              }


              if (fq === 'jobs') {

                var seljobcategoryelements = '<div class="otp-cat-item"><select multiple id="selchkjob" name="seljobCat" ><option value="">Select Job Category</option>';
                if (meta_job_cat_param !== undefined) {
                  meta_job_cat_param = meta_job_cat_param.replace(/[|,]/g, ",");
                }
                else {
                  meta_job_cat_param = '';
                }

                for (var x = 0; x < job_category_arr.length; x++) {

                  if (meta_job_cat_param !== undefined) {
                    if (meta_job_cat_param.indexOf(job_category_arr[x]) !== -1) {

                      var sec_seclected_value = 'selected="selected"';
                    }
                    else {
                      sec_seclected_value = '';
                    }
                  }
                  seljobcategoryelements += '<option value="' + job_category_arr[x] + '"' + sec_seclected_value + '>' + job_category_arr[x] + '</option>';
                }
                seljobcategoryelements += '</select></div>';
                $('#solrstrap-jobcategories').append(seljobcategoryelements);

                var seljobcountryelements = '<div class="otp-cat-item"><select multiple id="selchkjobcountry" name="seljobcountry" ><option value="">Select Job Country</option>';

                if (meta_job_country_param !== undefined) {
                  meta_job_country_param = meta_job_country_param.replace(/[|,]/g, ",");
                }
                else {
                  meta_job_country_param = '';
                }
                for (var x = 0; x < country_arr.length; x++) {
                  if (meta_job_country_param !== undefined) {
                    if (meta_job_country_param.indexOf(country_arr[x]) !== -1) {

                      var sec_seclected_value = 'selected="selected"';
                    }
                    else {
                      sec_seclected_value = '';
                    }
                  }
                  seljobcountryelements += '<option value="' + country_arr[x] + '"' + sec_seclected_value + '>' + country_arr[x] + '</option>';
                }
                seljobcountryelements += '</select></div>';
                $('#solrstrap-jobcountry').append(seljobcountryelements);

                var seljobsortingelements = '<div class="otp-cat-item"><select id="selchkjobsorting" name="seljobsorting" ><option value="">Select  Sort By</option>';

                if (meta_job_sort_param !== undefined) {
                  meta_job_sort_param = meta_job_sort_param.replace(/[|,]/g, ",");
                }
                else {
                  meta_job_sort_param = '';
                }
                for (var x = 0; x < job_sorting_arr.length; x++) {
                  if (meta_job_sort_param !== undefined) {
                    if (meta_job_sort_param.indexOf(job_sorting_arr[x]) !== -1) {

                      var sec_seclected_value = 'selected="selected"';
                    }
                    else {
                      sec_seclected_value = '';
                    }
                  }
                  seljobsortingelements += '<option value="' + job_sorting_arr[x] + '"' + sec_seclected_value + '>' + job_sorting_arr[x] + '</option>';
                }
                seljobsortingelements += '</select></div>';

                $('#solrstrap-jobsortby').append(seljobsortingelements);

                var seljobbusinesselements = '<div class="otp-cat-item"><select multiple id="selchkjobbusiness" name="seljobbusiness" ><option value="">Select  UBM Business</option>';
                if (meta_job_business_param !== undefined) {
                  meta_job_business_param = meta_job_business_param.replace(/[|,]/g, ",");
                }
                else {
                  meta_job_business_param = '';
                }
                for (var x = 0; x < job_business_arr.length; x++) {
                  if (meta_job_business_param !== undefined) {
                    if (meta_job_business_param.indexOf(job_business_arr[x]) !== -1) {

                      var sec_seclected_value = 'selected="selected"';
                    }
                    else {
                      sec_seclected_value = '';
                    }
                  }
                  seljobbusinesselements += '<option value="' + job_business_arr[x] + '"' + sec_seclected_value + '>' + job_business_arr[x] + '</option>';
                }
                seljobbusinesselements += '</select></div>';

                $('#solrstrap-jobbusiness').append(seljobbusinesselements);
                $('#solrstrap-otpcategories').hide();
                $('#solrstrap-sortmenu').hide();

                $('.jobfacet').show();

              }

              $('#selchkotp').change(function (e) {
                var drodpdownvalue = this.value;
                window.location = base_url + '/search-result?q=' + q + '&querytype=' + querytype + '&fq=' + fq + '&otpcatname=' + drodpdownvalue;
              });
              $('input[name=chkOTPCat]').change(function (e) {
                var assignedTo = $('input[name=chkOTPCat]:checked').map(function () {
                  return this.value;
                })
                    .get();
                window.location = base_url + '/search-result?q=' + q + "&querytype=" + querytype + '&fq=' + fq + '&otpcatname=' + assignedTo;
              });

              if (selectedotpcatname !== undefined) {
                var types = selectedotpcatname.split(',');
                $('input[name=chkOTPCat]').prop('checked', function () {
                  return $.inArray(this.value, types) !== -1;
                });
              }


              if (result.facet_counts.facet_pivot !== undefined && result.facet_counts.facet_pivot.length > 0) {
                var strRegExPattern = '^otpcatname:(.*)';
                for (var i = 0; i < result.facet_counts.facet_pivot; i++) {
                  var otpcatmatch = fq[i].match(new RegExp(strRegExPattern, 'i'));
                  if (otpcatmatch) {
                    var chkBox = decodeURIComponent(otpcatmatch[1].replace(/([\\\"])/g, ""));
                    $('input[type=checkbox][value="' + chkBox + '"]').prop('checked', true);
                  }
                }
              }

              //draw the individual hits
              for (var i = 0; i < result.response.docs.length; i++) {

                var metathumbimage = normalize_ws(get_maybe_highlit(result, i, HITMETATHUMNAILIMAGE));
                var metatitle = normalize_ws(get_maybe_highlit(result, i, HITMETATITLE));
                var metafile = normalize_ws(get_maybe_highlit(result, i, HITMETAFILE));
                var metatexbox = normalize_ws(get_maybe_highlit(result, i, HITMETATEXTBOX));
                var metavideourl = normalize_ws(get_maybe_highlit(result, i, HITMETAVIDEOURL));
                var title = normalize_ws(get_maybe_highlit(result, i, HITTITLE));
                var text = normalize_ws(get_maybe_highlit(result, i, HITBODY));
                var link = result.response.docs[i][HITLINK];
                var hit_data = {
                  title: title,
                  text: text
                };


                if (link) {
                  hit_data['link'] = link;
                }


                //var metathumbimage2 =
                // result.response.docs[i][HITMETATHUMNAILIMAGE];


                if (metathumbimage !== undefined && metathumbimage !== '') {
                  metathumbimage = '<a  target="_blank" href="' + link + '"><img height="100px" width="100px" src="' + metathumbimage + '" /></a>';

                }
                if (metatitle !== undefined && metatitle !== '') {
                  metatitle = metatitle;

                }

                if (metafile !== undefined && metafile !== '') {
                  metafile = '<a  target="_blank" href="' + metafile + '"><img src=' + base_url + '"/modules/custom/mid_solr_search/img/file.jpg"/></a>';
                }

                if (metatexbox !== undefined && metatexbox !== '') {
                  metatexbox = metatexbox;
                }

                if (metavideourl !== undefined && metavideourl !== '') {

                  var metavid = YouTubeGetID(metavideourl);
                  metavideourl = '<a class="video" target="_blank" href="' + metavideourl + '"><img height="100px" width="100px" src="http://img.youtube.com/vi/' + metavid + '/hqdefault.jpg" title="YouTube Video" alt="YouTube Video" /></a>';


                }


                var contenttypevalue = result.response.docs[i][HITMETACONTENTTYPE];


                if (typeof contenttypevalue !== undefined) {
                  hit_data[HITMETACONTENTTYPE] = contenttypevalue;

                }
                else {

                  var otptoolname = result.response.docs[i][HITOTPTOOLNAME];
                  if (typeof otptoolname !== undefined) {
                    hit_data[HITOTPTOOLNAME] = otptoolname;
                  }

                }
                var otptoolname = result.response.docs[i][HITOTPTOOLNAME];
                if (typeof otptoolname !== undefined) {
                  hit_data[HITOTPTOOLNAME] = otptoolname;
                }

                var publishdatevalue = result.response.docs[i][HITMETAPUBLISHDATE];
                if (publishdatevalue !== undefined) {
                  hit_data[HITMETAPUBLISHDATE] = publishdatevalue;
                }


                var date = new Date(hit_data[HITMETAPUBLISHDATE]);
                if (date !== "Invalid Date" || date !== undefined || date !== '') {
                  if (isNaN(date)) {
                    hit_data[HITMETAPUBLISHDATE] = '';
                  }
                  else {
                    hit_data[HITMETAPUBLISHDATE] = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                  }

                }

                var publishdatevalue = result.response.docs[i][HITPUBLISHDATE];
                if (publishdatevalue !== undefined) {
                  var date = new Date(publishdatevalue.replace("T", " ").replace("Z", ""));
                  if (date == "Invalid Date") {
                    hit_data[HITMETAPUBLISHDATE] = publishdatevalue.substring(0, publishdatevalue.indexOf("T"));
                  }
                  else {
                    hit_data[HITMETAPUBLISHDATE] = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                  }

                }

                var productType = result.response.docs[i][TAG];
                if (productType !== undefined) {
                  hit_data['tag'] = productType;
                }

                //if the result is a document then render the document icon
                /*if(metathumbimage.indexOf(".jpg") >-1){
            var metathumbimagepath = "<img src='"+metathumbimage+"'";}*/

                var absoluteurl = result.response.docs[i]["absoluteurl"].toLowerCase();
                if (link.indexOf(".pdf") > -1) {
                  var filedocument = "<img src='" + base_url + "/profiles/custom/connectid/modules/custom/mid_solr_search/img/pdf.jpg'/>";
                }
                if (link.indexOf(".xls") > -1) {
                  var filedocument = "<img src='" + base_url + "/profiles/custom/connectid/modules/custom/mid_solr_search/img/xls.jpg'/>";
                }
                if (link.indexOf(".doc") > -1) {
                  var filedocument = "<img src='" + base_url + "/profiles/custom/connectid/modules/custom/mid_solr_search/img/doc.jpg'/>";
                }
                if (link.indexOf(".ppt") > -1) {
                  var filedocument = "<img src='" + base_url + "/profiles/custom/connectid/modules/custom/mid_solr_search/img/ppt.jpg'/>";
                }

                $("#paginate").append(Drupal.theme('searchResultItem', hit_data));
              }

              if (ftype === undefined) {
                jQuery('#paginate').show();
                jQuery('#paginate li').show();
              }


              return false;

            }
            else {
              //When no results are found
              if (q != null) {
                var totalresults = result.response.numFound;
                var query = q;
                query = query.replace(/\+/g, " ");
                query = query.replace(/\+/g, " ");
                query = query.replace(/<script/gi, '&lt;script').replace(/\son[a-z]+=/gi, 'XXXX_BLOCKED=');
                query = decodeURIComponent((query + '').replace(/\+/g, '%20'));
                var timetaken = result.responseHeader.QTime;
                $("#solrstrap-searchbox").val(query).focus();
                //strapline that tells you how many hits you got
                $("#result-summary-template").append(Drupal.theme('searchResultSummary', totalresults, query));
                var result_summary_template = $("#result-summary-template").html();
                $("#result-summary-template").show();
                if (result_summary_template) {
                  Handlebars.compile(result_summary_template);
                  $("#result-summary-template").show();
                  $('#hit-template-noresult').show();
                }

              }


            }
            return false;
          }
        });
      };

      function loadMore() {
        $("#hit-template .hidden").slice(0, 10).removeClass("hidden");
      }

      /**
       * Handler for navigator selection.
       * @param event
       * @returns {boolean}
       */
      function add_nav(event) {
        var whence = event.target;
        var navname = $('input[name=chkOTPCat]:checked').val();
        var navvalue = $(whence).text();

        if (navvalue === '') {
          navvalue = event.target.value;
        }

        navvaluearr.push(navname);

        var newnav = navname + ':"' + encodeURIComponent(navvalue.replace(/([\\\"])/g, "\\$1")) + '"';


        var fq = getUrlParameter("fq");

        // check if it already exists...
        var existing = $.grep(fq, function (elt, idx) {
          return decodeURIComponent(elt) === newnav;
        });


        if (existing.length === 0) {
          window.history.pushState('&fq=test');
        }
        return false;
      }

      /**
       * Jquery plugin allows autoloading of next results when scrolling.
       * @param q
       * @param fq
       * @param offset
       */
      $.fn.loadSolrResultsWhenVisible = function (q, fq, offset) {
        elem = this;
        q = getUrlParameter('q');

        $(window).scroll(function (event) {
          if (isScrolledIntoView(elem) && !$(elem).attr('loaded')) {
            //dont instantsearch and autoload at the same time
            if ($('#solrstrap-searchbox').val() !== q) {
              handle_submit();
            }
            $(elem).attr('loaded', true);
            fq = getUrlParameter('fq');
            $(elem).getSolrResults(q, fq, offset);
            $(window).unbind('scroll');
          }
        });
      };

      /**
       * Utility function that checks to see if an element is onscreen.
       * @param elem
       * @returns {boolean}
       */
      function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      }

      /**
       * @param str
       * @param delimiter
       * @param removeEmptyItems
       * @returns {*[]}
       * @constructor
       */
      function CustomSplit(str, delimiter, removeEmptyItems) {
        if (!delimiter || delimiter.length === 0) {
          return [str];
        }
        if (!str || str.length === 0) {
          return [];
        }
        var result = [];
        var j = 0;
        var lastStart = 0;
        for (var i = 0; i <= str.length;) {
          if (i === str.length || str.substr(i, delimiter.length) === delimiter) {
            if (!removeEmptyItems || lastStart !== i) {
              result[j++] = str.substr(lastStart, i - lastStart);
            }
            lastStart = i + delimiter.length;
            i += delimiter.length;
          }
          else {
            i++;
          }
        }
        return result;
      }

      /**
       * @param sampleInput
       * @param delimiter
       * @returns {string[]}
       */
      function stringDelimiter(sampleInput, delimiter) {
        var stringArray = [''];
        var j = 0;

        for (var i = 0; i < sampleInput.length; i++) {
          if (sampleInput.charAt(i) === delimiter) {
            j++;
            stringArray.push('');
          }
          else {
            stringArray[j] += sampleInput.charAt(i);
          }
        }


        return stringArray;
      }

      // Solr Facet Query result Scrip Start.
      if ((q !== null) && q !== undefined && q !== '') {

        var inputs = {
          Handler: 'facet',
          keyword: q,
        }

        //var facetapiurl = base_url+'/searchfacettag';

        if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
          var facetapiurl = base_url + '/' + LANGUAGE + '/searchfacettag?q=' + q;
        }
        else {
          var facetapiurl = base_url + '/searchfacettag?q=' + q;
        }


        if (LANGUAGE !== undefined) {
          inputs.langcode = LANGUAGE;
        }

        if (nfq !== undefined) {
          var stringnfqlowerstring = nfq.toLowerCase();
          var nfqlowerstring = stringnfqlowerstring.replace('section', '');
          inputs.fq = nfq;
        }

        /*if(ftype!==undefined){
                inputs = inputs + ",'ftype':'"+ ftype + "'";
            }*/

        if (sorttype !== undefined) {
          inputs.sort = sorttype;
        }

        if (otpcatname !== undefined) {
          inputs.otpcatname = otpcatname.replace(/,/g, "|");
        }

        if (fqsdate !== undefined && fqedate !== undefined) {
          inputs.fqsdate = fqsdate;
          inputs.fqedate = fqedate;
        }


        if (querytype !== undefined) {
          inputs.querytype = querytype;
        }
        else {
          //querytype = 'Exact';
          inputs.querytype = querytype;
        }

        $.ajax({
          url: facetapiurl,
          type: "POST",
          data: JSON.stringify(inputs),
          dataType: 'json',
          success: function (data) {

            $.each(data, function (index, value) {

              var lowerstring = index.toLowerCase();
              if (nfq !== undefined && nfqlowerstring.indexOf(lowerstring) > -1) {
                var active = 'active';
              }
              else if (nfq === undefined && ftype === undefined && lowerstring === 'all' || lowerstring === 'tout') {
                active = 'active';
              }
              else if (nfq === undefined && ftype !== undefined && lowerstring === 'documents') {
                active = 'active';
              }
              else {
                active = '';
              }

              if (q != null) {
                if (value.indexOf('(0)') > -1) {
                  $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="javascript:;">' + value + '</a> ');
                }
                else if (lowerstring.indexOf('all') > -1) {
                  if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
                    var res = value.split(" ");
                    var resall = 'Tout';
                    var rescount = res[1];
                    value = resall + ' ' + rescount;
                    $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="' + base_url + '/' + LANGUAGE + '/search-result?q=' + q + '&querytype=' + querytype + '&start=0&page=1' + '">' + value + '</a> ');
                  }
                  else {
                    $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="' + base_url + '/search-result?q=' + q + '&querytype=' + querytype + '&start=0&page=1' + '">' + value + '</a> ');
                  }
                }
                else if (lowerstring.indexOf('documents') > -1) {

                  if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
                    $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="' + base_url + '/' + LANGUAGE + '/search-result?q=' + q + '&ftype=File' + '&querytype=' + querytype + '&start=0&page=1' + '">' + value + '</a> ');
                  }
                  else {
                    $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="' + base_url + '/search-result?q=' + q + '&ftype=File' + '&querytype=' + querytype + '&start=0&page=1' + '">' + value + '</a> ');
                  }

                }
                else {

                  //console.log(index);
                  /*if(index==='tout'){
						$("#solrstrap-tabs").append('<a class="'+active+'" href="'+base_url+'/search-result?q='+q+'&querytype='+querytype+'&start=0&page=1'+'">'+value+'</a> ');
                                        }else{
						$("#solrstrap-tabs").append('<a class="'+active+'" href="'+base_url+'/search-result?q='+q+'&fq='+index+'&querytype='+querytype+'&start=0&page=1'+'">'+value+'</a> ');
					}*/

                  $("#solrstrap-tabs").append('<a role="tab" aria-selected="' + (active ? 'true' : 'false') + '" class="tab link ' + active + '" href="' + base_url + '/search-result?q=' + q + '&fq=' + index + '&querytype=' + querytype + '&start=0&page=1' + '">' + value + '</a> ');

                }
              }

            });


            //$("#solrstrap-tabs").prepend('<span
            // style="margin-right:15px;">Filter results by:</span>');
            var solrstrap_tab_template = $("#solrstrap-tabs").html();
            if (solrstrap_tab_template) {
              Handlebars.compile(solrstrap_tab_template);
              $("#solrstrap-tabs").show();
            }


          },
          error: function (result) {
            console.log("Error loading the data ");
          }
        });
      }

      //MAIN FUNCTIONS - END

      /*Solr Facet Query result Scrip Start */
      if (ftype !== undefined) {
        var facetapiurl = base_url + '/solrdocumentSearch';
        var inputs = {
          Handler: 'facet',
          keyword: q,
        };

        if (nfq !== undefined) {
          inputs.fq = nfq ;
        }

        if (querytype !== undefined) {
          inputs.querytype = querytype;
        }

        if (ftype !== undefined) {
          inputs.ftype = ftype;
        }

        if (start !== undefined) {
          inputs.start = start;
        }

        if (pagecount !== undefined) {
          inputs.page = pagecount;
        }

        if (sorttype !== undefined) {
          inputs.sort = sorttype;
        }


        if (otpcatname !== undefined) {
          inputs.otpcatname = otpcatname.replace(/,/g, "|");
        }


        if (fqsdate !== undefined && fqedate !== undefined) {
          inputs.fqsdate = fqsdate;
          inputs.fqedate = fqedate;
        }

        $.ajax({
          url: facetapiurl,
          type: "POST",
          data: JSON.stringify(inputs),
          dataType: 'json',
          success: function (data) {

            var result = JSON.parse(data);
            $('#paginate').css({'display': 'none'});
            $('#pagination').css({'display': 'none'});
            $("#result-summary-template").hide();

            var totalresults = result.response.numFound;
            var query = q;
            query = query.replace(/\+/g, " ");
            var timetaken = result.responseHeader.QTime;

            //strapline that tells you how many hits you got
            $("#result-summary-template1").append(Drupal.theme('searchResultSummary', totalresults, query));
            var result_summary_template_sec = $("#result-summary-template1").html();
            $("#result-summary-template1").show();
            if (result_summary_template_sec) {
              Handlebars.compile(result_summary_template_sec);
              $("#result-summary-template1").show();
            }


            PAGESIZE = Math.ceil(result.response.numFound / HITSPERPAGE);
            // Initialization of pagination.
            if (CURRENTPAGE === 0 && PAGESIZE > 1) {
              var init = Pagination.Init(document.getElementById('pagination'), {
                size: Math.ceil(result.response.numFound / HITSPERPAGE), // pages
                                                                         // size
                page: 1,  // selected page
                step: 3   // pages before and after current
              });
            }

            if (PAGESIZE > 1) {
              $('#pagination').hide();
            }
            else {
              $('#pagination').hide();
            }

            if (result.response.docs.length > 0) {

              for (var i = 0; i < result.response.docs.length; i++) {

                var metathumbimage = normalize_ws(get_maybe_highlit(result, i, HITMETATHUMNAILIMAGE));
                var metatitle = normalize_ws(get_maybe_highlit(result, i, HITMETATITLE));
                var metafile = normalize_ws(get_maybe_highlit(result, i, HITMETAFILE));
                var metatexbox = normalize_ws(get_maybe_highlit(result, i, HITMETATEXTBOX));
                var metavideourl = normalize_ws(get_maybe_highlit(result, i, HITMETAVIDEOURL));
                var publishdatevalue = result.response.docs[i][HITMETAPUBLISHDATE];
                var title = normalize_ws(get_maybe_highlit(result, i, HITTITLE));
                var text = normalize_ws(get_maybe_highlit(result, i, HITBODY));
                var link = result.response.docs[i][HITLINK];
                var hit_data = {
                  title: title,
                  text: text
                };

                var contenttypevalue = result.response.docs[i][HITMETACONTENTTYPE];

                if (metathumbimage !== undefined && metathumbimage !== '') {
                  metathumbimage = '<a target="_blank" href="' + link + '"><img height="100px" width="100px" src="' + metathumbimage + '" /></a>';
                }
                if (metatitle !== undefined && metatitle !== '') {
                  metatitle = metatitle;
                }
                if (metafile !== undefined && metafile !== '') {
                  metafile = metafile;
                }
                if (metatexbox !== undefined && metatexbox !== '') {
                  metatexbox = metatexbox;
                }

                if (metavideourl !== undefined && metavideourl !== '') {
                  var metavid = YouTubeGetID(metavideourl);
                  metavideourl = '<a target="_blank" href="' + metavideourl + '"><img height="100px" width="100px" src="http://img.youtube.com/vi/' + metavid + '/hqdefault.jpg" title="YouTube Video" alt="YouTube Video" /></a>';
                }

                if (typeof contenttypevalue !== undefined) {
                  hit_data[HITMETACONTENTTYPE] = contenttypevalue;

                }
                else {

                  var otptoolname = result.response.docs[i][HITOTPTOOLNAME];
                  if (typeof otptoolname !== undefined) {
                    hit_data[HITOTPTOOLNAME] = otptoolname;
                  }

                }
                var otptoolname = result.response.docs[i][HITOTPTOOLNAME];
                if (typeof otptoolname !== undefined) {
                  hit_data[HITOTPTOOLNAME] = otptoolname;
                }

                var publishdatevalue = result.response.docs[i][HITMETAPUBLISHDATE];
                if (publishdatevalue !== undefined) {
                  hit_data[HITMETAPUBLISHDATE] = publishdatevalue;
                }


                var date = new Date(hit_data[HITMETAPUBLISHDATE]);
                if (date !== "Invalid Date" || date !== undefined || date !== '') {
                  if (isNaN(date)) {
                    hit_data[HITMETAPUBLISHDATE] = '';
                  }
                  else {
                    hit_data[HITMETAPUBLISHDATE] = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                  }
                }
                var publishdatevalue = result.response.docs[i][HITPUBLISHDATE];
                if (publishdatevalue !== undefined) {
                  var date = new Date(publishdatevalue.replace("T", " ").replace("Z", ""));
                  if (date == "Invalid Date") {
                    hit_data[HITMETAPUBLISHDATE] = publishdatevalue.substring(0, publishdatevalue.indexOf("T"));
                  }
                  else {
                    hit_data[HITMETAPUBLISHDATE] = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                  }

                }

                if (link) {
                  hit_data['link'] = link;
                }

                $("#solrstrap-documentfacetresult").append(Drupal.theme('searchResultItem', hit_data));
              }
            }


            jQuery('#pagination').show();
            jQuery('#solrstrap-documentfacetresult li').show();
            var solrstrap_document_template = $("#solrstrap-documentfacetresult").html();
            if (solrstrap_document_template) {
              Handlebars.compile(solrstrap_document_template);
            }
            jQuery("#solrstrap-documentfacetresult").show();
            jQuery("#paginate").hide();
            return false;
            /*var solrstrap_document_template = $("#solrstrap-documentfacetresult").html();
                    Handlebars.compile(solrstrap_document_template);
                    $("#solrstrap-documentfacetresult").show();*/

          },
          error: function (data) {
            console.log("Error loading the data ");
          }
        });
      }

      // Pagination  Code.
      var Pagination = {
        code: '',
        // converting initialize data
        Extend: function (data) {
          data = data || {};
          Pagination.size = data.size;
          Pagination.page = data.page;
          Pagination.step = data.step;
        },

        /**
         * add pages by number (from [s] to [f]).
         * @param s
         * @param f
         * @constructor
         */
        Add: function (s, f) {
          for (var i = s; i < f; i++) {
            var multiplier = (i === 1) ? 0 : HITSPERPAGE;
            Pagination.code += '<li class=\"pagination__item\"><a href="#" pagevalue=\"' + (multiplier * (i - 1)) + '\" title=\"' + Drupal.t('Go to page @key', {'@key': i}) + '\" class=\"link pr-5 pl-5\">' + i + '</a></li>';
          }
        },

        /**
         * change page.
         * @param e
         * @returns {boolean}
         * @constructor
         */
        Click: function (e) {
          e.preventDefault();

          Pagination.e.hidden = true;
          CURRENTPAGE = parseInt(this.getAttribute("pagevalue"));

          //var intialurl   = base_url+'/search-result?q='+q;

          var inputs = '';

          if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
            var intialurl = base_url + '/' + LANGUAGE + '/search-result?q=' + q;
          }
          else {
            var intialurl = base_url + '/search-result?q=' + q;
          }

          if (querytype !== undefined && querytype !== null) {
            inputs = '&querytype=' + querytype;
          }

          if (nfq !== undefined && nfq !== null) {
            inputs = '&fq=' + nfq;
          }

          if (ftype !== undefined && ftype !== null) {
            inputs = '&ftype=' + ftype;
            querytype = 'Exact';
          }

          if (CURRENTPAGE !== undefined && CURRENTPAGE !== null) {
            var pagenum = CURRENTPAGE / HITSPERPAGE + 1;
            inputs = inputs + '&start=' + CURRENTPAGE + '&page=' + pagenum + '&querytype=' + querytype;
          }

          var url = intialurl + inputs;
          if (url) { // require a URL
            window.location = url; // redirect
          }

          Pagination.page = pagenum;
          Pagination.Start();
          return false;

        },

        /**
         * previous page.
         * @returns {boolean}
         * @constructor
         */
        Prev: function () {

          pagecount--;
          if (pagecount < 1) {
            Pagination.page = 1;
          }
          else {

            CURRENTPAGE = parseInt(this.getAttribute("pagevalue"));

            $('#pagination').hide();

            if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
              var intialurl = base_url + '/' + LANGUAGE + '/search-result?q=' + q;
            }
            else {
              var intialurl = base_url + '/search-result?q=' + q;
            }


            if (querytype !== undefined && querytype !== null) {
              inputs = '&querytype=' + querytype;
            }


            if (ftype !== undefined && ftype !== null) {
              inputs = '&ftype=' + ftype;
              querytype = 'Exact';
            }

            if (nfq !== undefined && nfq !== null) {
              inputs = '&fq=' + nfq;
            }

            if (CURRENTPAGE !== undefined && CURRENTPAGE !== null) {
              var startcount = CURRENTPAGE * HITSPERPAGE;
              startcount = startcount - HITSPERPAGE;
              inputs = inputs + '&start=' + startcount + '&page=' + CURRENTPAGE + '&querytype=' + querytype;
            }

            var url = intialurl + inputs;
            if (url) { // require a URL
              window.location = url; // redirect
            }
          }
          Pagination.Start();
          return false;
        },

        /**
         * next page.
         * @returns {boolean}
         * @constructor
         */
        Next: function () {

          pagecount++;
          if (pagecount > Pagination.size) {
            pagecount = Pagination.size;
          }
          else {
            CURRENTPAGE = parseInt(this.getAttribute("pagevalue"));
            $('#pagination').hide();


            if ((LANGUAGE !== undefined && LANGUAGE !== null && LANGUAGE !== 'en')) {
              var intialurl = base_url + '/' + LANGUAGE + '/search-result?q=' + q;
            }
            else {
              var intialurl = base_url + '/search-result?q=' + q;
            }

            if (querytype !== undefined && querytype !== null) {
              var inputs = '&querytype=' + querytype;
            }
            else {
              querytype = 'Exact';
              var inputs = '&querytype=' + querytype;
            }

            if (ftype !== undefined && ftype !== null) {
              inputs = '&ftype=' + ftype;
              querytype = 'Exact';
            }

            if (nfq !== undefined && nfq !== null) {
              inputs = '&fq=' + nfq;
            }

            if (start !== undefined && start !== null) {
              //CURRENTPAGE = CURRENTPAGE+1;
              var startcount = parseInt(start) + parseInt(HITSPERPAGE);
              inputs = inputs + '&start=' + startcount + '&page=' + CURRENTPAGE + '&querytype=' + querytype;
            }

            var url = intialurl + inputs;
            if (url) { // require a URL
              window.location = url; // redirect
            }
          }
          Pagination.Start();
          return false;
        },

        /**
         * binding pages.
         * @constructor
         */
        Bind: function () {

          var a = Pagination.e.getElementsByTagName('a');

          for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === parseInt(pagecount)) {
              a[i].className += ' is-active active color-monochrome-5';
              a[i].parentNode.className += ' pagination__item--active';
            }
            a[i].addEventListener('click', Pagination.Click, false);
          }
        },

        /**
         * Write pagination..
         * @constructor
         */
        Finish: function () {
          var first = Pagination.e.querySelector('li:first-child');
          var last = Pagination.e.querySelector('li:last-child');
          Pagination.e.innerHTML = Pagination.code;
          Pagination.e.insertAdjacentElement('afterbegin', first);
          Pagination.e.insertAdjacentElement('beforeend', last);
          Pagination.code = '';
          Pagination.Bind();

        },

        /**
         * find pagination type.
         * @constructor
         */
        Start: function () {

          if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
          }
          else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
          }
          else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
          }
          else {
            Pagination.Add(Pagination.page - (Pagination.step + 1), Pagination.page + Pagination.step + 2);
          }
          Pagination.Finish();
        },

        // Binding buttons.
        Buttons: function (e) {
          var nav = e.getElementsByTagName('a');
          nav[0].addEventListener('click', Pagination.Prev, false);
          nav[1].addEventListener('click', Pagination.Next, false);
        },

        // Create skeleton.
        Create: function (e) {
          var start = getUrlParameter('start', 0);

          var prevele = parseInt(start) - parseInt(HITSPERPAGE);
          var nextele = parseInt(start) + parseInt(HITSPERPAGE);

          var html = [
            '<li class="pagination__item">' +
            '<a  href="" name="prevpager" pagevalue="' + prevele + '" title="' + Drupal.t('Go to prev page') + '" rel="prev" class="pager-prev first link-icon">\n' +
            '  <span class="sr-only">' + Drupal.t('Prev page') + '</span>\n' +
            '  <svg class="svg">\n' +
            '    <use href="#icon-angle-prev"></use>\n' +
            '  </svg>\n' +
            '</a>\n' +
            '</li>\n' +
            '<li class="pagination__item">' +
            '<a href="" name="nextpager" pagevalue="' + nextele + '" title="' + Drupal.t('Go to next page') + '" rel="next" class="pager-next last link-icon">\n' +
            '  <span class="sr-only">' + Drupal.t('Next page') + '</span>\n' +
            '  <svg class="svg">\n' +
            '    <use href="#icon-angle-next"></use>\n' +
            '  </svg>\n' +
            '</a>\n' +
            '</li>\n'
          ];


          e.innerHTML = html.join('');
          Pagination.e = e;
          // Pagination.Buttons(e);
          if (parseInt(pagecount) <= '1') {
            $('#pagination .pager-prev').hide();
          }
          if (parseInt(pagecount) === Pagination.size) {
            $('#pagination .pager-next').hide();
          }
        },

        // init
        Init: function (e, data) {

          Pagination.Extend(data);
          Pagination.Create(e);
          Pagination.Start();
          if (pagecount !== undefined) {
          }
          else {
            $('#pagination li:first-child').addClass("pagination__item pagination__item--active").find('a').addClass('is-active active color-monochrome-5');
          }
        }
      };

      return false;

      //MAIN FUNCTIONS - END

      /**
       * @param json
       * @returns {string}
       */
      function syntaxHighlight(json) {
        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            }
            else {
              cls = 'string';
            }
          }
          else if (/true|false/.test(match)) {
            cls = 'boolean';
          }
          else if (/null/.test(match)) {
            cls = 'null';
          }

          return false;
          // return '<span class="' + cls + '">' + match + '</span>';
        });
      }

      /**
       * normalize a string with respect to whitespace:.
       * 1) Remove all leadsing and trailing whitespace.
       * 2) Replace all runs of tab, space and &nbsp; with a single space.
       * @param string
       * @returns {*}
       */
      function normalize_ws(string) {
        return string.replace(/^\s+/, '')
            .replace(/\s+$/, '')
            .replace(/(?: |\t|&nbsp;|&#xa0;|\xa0)+/g, ' ');
      }

      /**
       * get field from result for document i, optionally replacing with
       * highlight version.
       * @param result
       * @param i
       * @param field
       * @returns {*}
       */
      function get_maybe_highlit(result, i, field) {
        var res = result.response.docs[i][field];
        if (HL) {
          var id = result.response.docs[i][HITID];
          var hl_map = result.highlighting[id];
          if (hl_map.hasOwnProperty(field)) {
            res = hl_map[field];
          }
        }
        return array_as_string(res);
      }

      /**
       * optionally convert a string array to a string, by concatenation.
       * @param array_or_string
       * @returns {string}
       */
      function array_as_string(array_or_string) {
        var ret = '';
        if (typeof (array_or_string) == 'string') {
          ret = array_or_string;
        }
        else if (typeof (array_or_string) == 'object' &&
            array_or_string.hasOwnProperty('length') &&
            array_or_string.length > 0) {
          ret = array_or_string.join(" ... ");
        }
        return ret;
      }

      /**
       * translates the ropey solr facet format to a more sensible map
       * structure.
       * @param navs
       * @returns {{}}
       */
      function makeNavsSensible(navs) {
        var newNav = {};
        for (var i = 0; i < navs.length; i += 2) {
          newNav[navs[i]] = navs[i + 1];
        }
        return newNav;
      }

      /**
       * translates the ropey solr facet format to a more sensible map
       * structure.
       * @param event
       * @returns {boolean}
       */
      function tab_click(event) {
        OTPCAT = [];

        $('input[name=chkOTPCat]').prop("checked", false);

        var whence = event.target;
        var navname = $(whence).closest("div.tab-links").children("span.nav-title").data("facetname");
        var navvalue = $(whence).data("metacontent");
        var fq = getURLParamArray("fq");
        //Remove meta_section and add the new one as at a time only one section
        // will be selected
        for (var i = fq.length - 1; i >= 0; i--) {
          if (fq[i].indexOf(TAB_METATAG + ":") > -1 || fq[i].indexOf("otpcatname:") > -1) {
            fq.splice(i, 1);
          }
        }
        var newnav;
        if (navvalue.indexOf("*") > -1) {
          newnav = '';
        }
        else {
          newnav = navname + ':"' + navvalue.replace(/([\\\"])/g, "\\$1") + '"';
        }
        // check if it already exists...
        var existing = $.grep(fq, function (elt, idx) {
          return decodeURIComponent(elt) === newnav;
        });
        if (existing.length === 0) {
          if (newnav != "") {
            fq.push(newnav);
          }
          $.bbq.pushState({
            'fq': fq
          });
        }
        return false;
      }

      /**
       * translates the ropey solr facet format to a more sensible map
       * structure.
       * @param navs
       * @returns {{}}
       */
      function makeTabsSensible(navs) {
        var newNav = {};
        for (var i = 0; i < TABS.length; i++) {
          for (var j = 0; j < navs.length; j += 2) {
            if (TABS[i] == navs[j]) {
              newNav[navs[j]] = navs[j + 1];
              break;
            }
            newNav[TABS[i]] = 0;
          }
        }

        return newNav;
      }

      /**
       * translates the ropey solr facet format to a more sensible map
       * structure.
       * @param q
       * @param fq
       * @param offset
       */
      function loadSolrResults(q, fq, offset) {

        $(this).getSolrResults(q, fq, offset);
      }

      /**
       * translates the ropey solr facet format to a more sensible map
       * structure.
       * @param event
       */
      function hashchange(event) {
        if ((q !== null) && q !== undefined && q !== '') {
          loadSolrResults(getUrlParameter('q'), getUrlParameter('fq'), 0);
        }
      }

      /**
       * @param catstr
       * @returns {string}
       */
      function cattrim(catstr) {
        return catstr.toString().replace(/,/g, "|");
      }

      /**
       * @param busistr
       * @returns {string}
       */
      function businesstrim(busistr) {
        return busistr.toString().replace(/,/g, "|");
      }

      /**
       * @param countrystr
       * @returns {string}
       */
      function countrytrim(countrystr) {
        return countrystr.toString().replace(/,/g, "|");
      }

      /**
       * @param sortstr
       * @returns {string}
       */
      function sorttrim(sortstr) {
        return sortstr.toString().replace(/,/g, "|");
      }

      /**
       * @returns {boolean}
       * @constructor
       */
      function ExecuteJobFilterQuery() {
        var seljob = $("#selchkjob").val();
        var seljobsorting = $("#selchkjobsorting").val();
        var seljobcountry = $("#selchkjobcountry").val();
        var seljobbusines = $("#selchkjobbusiness").val();

        if ((seljob === null) && (seljobcountry === null) && (seljobbusines === null) && seljobsorting === null) {
          alert('Please Select any filter options.');
          return false;
        }

        if (seljob !== null || seljobcountry !== null || seljobbusines !== null || seljobsorting !== null) {
          var intialurl = base_url + '/search-result?';

          if (nfq !== undefined && nfq !== null) {
            var inputs = 'q=' + q + '&querytype=' + querytype + '&fq=' + nfq;
            if (sorttype !== undefined) {
              inputs = inputs + "&sort=" + sorttype;
            }
          }

          if (seljob !== undefined && seljob !== null) {
            inputs = inputs + '&meta_facet=' + 'jobs' + '&meta_job_cat=' + cattrim(seljob); // get selected value
          }

          if (seljobsorting !== undefined && seljobsorting !== null) {
            inputs = inputs + '&meta_facet=' + 'jobs' + '&meta_job_sort=' + sorttrim(seljobsorting);// get selected value
          }

          if (seljobcountry !== undefined && seljobcountry !== null) {
            inputs = inputs + '&meta_facet=' + 'jobs' + '&meta_job_country=' + countrytrim(seljobcountry); // get selected value
          }

          if (seljobbusines !== undefined && seljobbusines !== null) {
            inputs = inputs + '&meta_facet=' + 'jobs' + '&meta_job_business=' + businesstrim(seljobbusines); // get selected value
          }

          var url = intialurl + inputs;

          //}

          if (url) { // require a URL
            window.location = url; // redirect
          }
          return false;
        }
        else {
          alert('Please Select any filter options.');
          return false;
        }
      }

      /**
       * Date Filtertation Date.
       * @returns {boolean}
       * @constructor
       */
      function ExecuteRangeQuery() {
        var from = $("#startDate").val();
        var to = $("#endDate").val();

        if (from !== '' && to !== '') {
          if (Date.parse(from) > Date.parse(to)) {
            alert("Invalid Date Range");
            $("#startDate").focus();
            return false;
          }
          else {
            var fromdate = $.datepicker.formatDate('mm-dd-yy', $("#startDate").datepicker('getDate'));
            var todate = $.datepicker.formatDate('mm-dd-yy', $("#endDate").datepicker('getDate'));
          }

        }
        else {
          alert('Please add from and to Valid Date range.');
          $("#startDate").focus();
          return false;
        }

        if (q !== undefined) {
          if (sorttype !== undefined) {
            var url = base_url + '/search-result/?q=' + q + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate + '&sort=' + sorttype; // get selected value
          }
          else {
            var url = base_url + '/search-result/?q=' + q + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate; // get selected value
          }
        }

        if (q !== undefined && ftype !== undefined) {
          if (sorttype !== undefined) {
            var url = base_url + '/search-result/?q=' + q + '&ftype=' + ftype + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate + '&sort=' + sorttype; // get selected value
          }
          else {
            var url = base_url + '/search-result/?q=' + q + '&ftype=' + ftype + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate; // get selected value
          }
        }

        if (q !== undefined && nfq !== undefined) {
          if (sorttype !== undefined) {
            var url = base_url + '/search-result/?q=' + q + '&fq=' + nfq + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate + '&sort=' + sorttype; // get selected value
          }
          else if (otpcatname !== undefined) {
            otpcatnameArr = otpcatname.replace(/,/g, "|");
            var url = base_url + '/search-result/?q=' + q + '&fq=' + nfq + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate + '&otpcatname=' + otpcatnameArr; // get selected value
          }
          else {
            var url = base_url + '/search-result/?q=' + q + '&fq=' + nfq + '&querytype=' + querytype + '&fqsdate=' + fromdate + '&fqedate=' + todate; // get selected value
          }
        }


        if (url) { // require a URL
          window.location = url; // redirect
        }
        return false;
      }

      /**
       * @param event
       * @returns {boolean}
       */
      function handle_submit(event) {
        var q = $.trim($('#solrstrap-searchbox').val());
        var queryType = $('input[name=querytype]:radio:checked').val();
        if (q !== '') {
          $.bbq.pushState({
            'queryType': queryType,
            'q': q
          });
        }
        return false;
      }

    },

  };

  /**
   * Format search result item.
   *
   * @param {object} hit_data
   *   The result item data: link, title, text.
   *
   * @return {string}
   *   The formatted text (html).
   */
  Drupal.theme.searchResultItem = function (hit_data) {
    var icon = ((/\.(pdf|xls|doc|ppt)$/i).test(hit_data['link'])) ? '' + '<span class="icon icon-size-25 pr-15"><svg class="svg"><use href="#icon-download"></use></svg></span>' : '';
    return '<div class="description background-color-monochrome-1 pt-20 pb-20 pr-0 pl-0 mb-10">\n' +
        '  <h3 class="mb-0">\n' +
        '    <a href="' + hit_data['link'] + '" class="link text-size-h3">' + icon + hit_data['title'] + '</a>\n' +
        '  </h3>\n' +
        '  <a href="' + hit_data['link'] + '" class="link link--icon-position-right icon-size-1em text-size-regular">\n' + hit_data['link'] + '</a>\n' +
        '  <div class="text text-size-medium color-black mt-15">\n' + hit_data['text'] + '</div>\n' +
        '</div>';
  };

  /**
   * Format search result summary.
   *
   * @param {number} total
   * @param {string} query
   *
   * @return {string}
   *   The formatted text (html).
   */
  Drupal.theme.searchResultSummary = function (total, query) {
    return '<p class="text font-primary-regular mb-0">' +
        Drupal.t('There are @total result for <strong><em>@query</em></strong>', {
          '@total': total,
          '@query': query
        }) +
        '</p>';
  };

}(jQuery, drupalSettings));
