export default function SearchResultPageContent() {
  return (
    <>
      <a id="main-content" tabIndex={-1}></a>  <div className="layout-content-top">
    
        </div>

  
        <div className="layout-content">
            <div>
          <div data-drupal-messages-fallback className="hidden"></div><div id="block-investis-project-mainpagecontent">
  
      <div className="block-main__wrapper">

    
      

      <section className="page-banner position-relative section-dark animate animate--fade-in" data-component-animation="" data-animate="" data-animation="fade-in" data-animation-duration="600" data-animation-delay="100">
          <div className="pt-lg-1 pb-lg-1 bg-primary-1">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="page-banner__content-wrapper position-relative z-0 ">
            
                  <div className="page-banner__content">
              
        <div className="config-text ">
     
            <h1 className="display-lg color-display animate animate--fade-in-top" data-animate="" data-animation="fade-in-top" data-animation-duration="600" data-animation-delay="100">
            Search results
          </h1>
        </div>
                
                  </div>
                </div>
              </div>  
            </div>
          </div>
          </div>
        </section>

      <div className="container solr-search pt-lg-1 pb-lg-1 ">
              <div className="row">

                  <div className="col-md-3 left-nav-container">
                
        
                       
        

        
                      <div id="solrstrap-tree">
                          All Categories                    <div id="tree"></div>
                      </div>
        
                      <div id="solrstrap-facets" className="span4"></div>

        
      			<span className="dtypehide"> Document Type</span>
                      <ul id="solrstrap-documentfacet">
                      </ul>
        
      	<span className="domainhide"> Related Domain</span>
        
                      <ul id="solrstrap-domainfacet"></ul>
        

        
      		<span className="toolhide"> Tools</span>
                      <ul id="solrstrap-otptoolfacet" >
                      </ul>
        

                  </div>





      <div className="col-md-12 col-sm-12 col-xs-12">


                       <form className="navbar-search" id="searchresultform">
                          <div className="search-box">
                            <div className="form-item textfield">
                              <label htmlFor="solrstrap-searchbox" className="sr-only">Search on a site</label>
                              <input type="text" id="solrstrap-searchbox" className="search-query form-control" placeholder="Looking for…" name="q" maxLength={256} autoComplete="off"  />
                              <div className="search-button">
                                <input className="button button--primary button--small js-form-submit" type="submit" value="Search" id="submitButton"  />
                              </div>
                              <div className="form-item__error-message" id="searchresultformError"></div>
                            </div>
                          </div>
                         <fieldset className="d-xs-flex xs-column">
                           <legend className="fieldset-title body-md">Filter By:</legend>
                           <div className="fieldset-wrapper row">
                             <div className="col-xs-12 d-xs-flex">
                               <div className="form-item">
                                 <div className="form-item__control radio xs-row xs-middle">
                                   <input type="radio" name="querytype" id="querytype-all" className="form-control" value="all" aria-label="querytype"  />
                                   <label className="form-item__label" htmlFor="querytype-all" title="qurytype" aria-labelledby="querytype-all">
                                     <span className="icon icon-size-20 radius-circle"><i className="svg"></i></span>
                                     <span className="form-item__label-text">All</span>
                                   </label>
                                 </div>
                               </div>
                               <div className="form-item ml-30">
                                 <div className="form-item__control radio xs-row xs-middle">
                                   <input type="radio" name="querytype" id="querytype-exact" className="form-control" aria-label="querytype" value="Exact" checked  />
                                   <label className="form-item__label" htmlFor="querytype-exact" aria-labelledby="querytype-exact">
                                     <span className="icon icon-size-20 radius-circle"><i className="svg"></i></span>
                                     <span className="form-item__label-text">Exact</span>
                                   </label>
                                 </div>
                               </div>

                               <input type="hidden" name="start" value="0"  />
                               <input type="hidden" name="page" value="1"  />
                             </div>
                           </div>
                         </fieldset>
                      </form>


        <img src="profiles/custom/connectid/modules/custom/mid_solr_search/img/ajax-loader.gif" id="loading-indicator" alt="searchprocess" style={{display: "none"}}  />







                     <div id="solrstrap-tabs" className="tab-list tab-list--underlined border-color-primary-1"></div>




                       <div id="solrstrap-sortmenu" className="form-item__control select js-select mt-15">
                          <select id="sortlist" className="form-control js-select-field" data-modifiers="{}">
                              <option value="">
                               - Select -                        </option>
                              <option value="score">
                               Sort by relevancy                        </option>
                              <option value="date">
                                 Sort by publish date                        </option>
                          </select>
                      </div>



                      <div id="solrstrap-otpcategories" className="span5"></div>
                  <div className="jobfacet" style={{display: "none"}}>
                      <div id="solrstrap-jobsortby" className="span5"></div>
                      <div id="solrstrap-jobcategories" className="span5"></div>
                      <div id="solrstrap-jobcountry" className="span5"></div>
                      <div id="solrstrap-jobbusiness" className="span5"></div>
                      <input type="button" id="jobfilters" value="Apply Filter" />

                  </div>


      		<div  id="result-summary-template" style={{display: "block"}}></div>
                      <div id="result-summary-template1" style={{display: "block"}}></div>

                      <div id="solrstrap-hits" className="span8"></div>

        <div className="row search-result">
          <div className="col-xs-12">
            <div id="hit-template-noresult" className="text background-color-monochrome-9 font-primary-bold mt-20 mb-20 pt-20 pr-20 pb-20 pl-20">
              No Search result Found.      </div>
            <div id="paginate">
              <script data-cfasync="false" src="cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script type="text/x-handlebars-template" style={{display: "block"}}></script>
            </div>
          </div>
        </div>




      		   <script id="solrstrap-documentfacetresult" type="text/x-handlebars-template" style={{display: "block"}}></script>



                    <div className="row">
                      <div className="col-xs-12">
                        <ul id="pagination" className="pagination d-xs-flex xs-center" style={{display: "inline-block"}}></ul>
                      </div>
                    </div>
                

                  </div>
              </div>
      	 </div>



   
          <script type="text/x-handlebars-template" id="nav-template"></script>
    
          <script type="text/x-handlebars-template" id="chosen-nav-template" style={{display: "block"}}></script>
    
          <script type="text/x-handlebars-template" id="new-template"></script>

          </div>
      </div>
      <div className="mfp-controls d-xs-none">
        <div className="popup-close">
          <button className="button-icon icon-size-40 t-10 color-monochrome-1">
            <span className="sr-only">Close popup</span>
            <svg  className="svg">
        <use xlinkHref="#icon-close-button"></use>
      </svg>

          </button>
        </div>

        <div className="slider-navigation xs-end width-full">
          <button
            className="button--secondary button-icon icon-size-40 slider-navigation__prev-icon js-slider-navigation-prev-button">
            <span className="sr-only">Left</span>
            <svg  className="svg">
        <use xlinkHref="#icon-angle"></use>
      </svg>

          </button>

          <button
            className="button--secondary button-icon icon-size-40 r-0 slider-navigation__next-icon js-slider-navigation-next-button">
            <span className="sr-only">Right</span>
            <svg  className="svg">
        <use xlinkHref="#icon-angle"></use>
      </svg>

          </button>
        </div>
      </div>

        </div>

        </div>
    </>
  );
}
