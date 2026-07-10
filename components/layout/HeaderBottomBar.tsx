export default function HeaderBottomBar() {
  return (
    <>
    <div className="header-bottom-bar header-bottom-bar--default js-header-bottom-bar">
      <div className="container height-full header-bottom-bar__container">
        <div className="row height-full xs-end">
          <div className="col-xs-12 d-xs-flex xs-middle xs-between">
            <form action="/search-result" className="search-form" data-bar="search">
              <div className="input input--search-desktop-v1 input--small width-full">
                <label className="form-item__label sr-only" htmlFor="solrstrap-searchbox-form">
                  Search on a site
                </label>
                <input
                  aria-required="true"
                  type="search"
                  className="input__field"
                  aria-label="Search on a site"
                  placeholder="Looking for..."
                  name="q"
                  maxLength={256}
                  autoComplete="off"
                  id="solrstrap-searchbox-form"
                 />
                <div role="alert" aria-atomic="true">
                  <div className="error-message shadow-2 js-error-message">
                    Please fill out this field
                  </div>
                </div>
              </div>
            </form>
              <div className="socials socials--default" data-bar="share">
              <a href="https://www.facebook.com/sharer.php?u=https%3A//sldc.sid2-e1.investis.com/&amp;title=Home" target="_blank" title="Share via facebook" aria-label="facebook" data-url="http://www.facebook.com/sharer.php?u=URL_PLACEHOLDER&amp;title=Home" className="facebook link-icon color-monochrome-1 socials__item mr-15">
            <svg  className="svg">
      <use xlinkHref="#icon-facebook"></use>
    </svg>

          </a>
              <a href="http://www.linkedin.com/shareArticle?url=https%3A//sldc.sid2-e1.investis.com/&amp;source=https%3A//sldc.sid2-e1.investis.com/&amp;mini=true&amp;title=Home"  target="_blank" title="Share via linkedin" aria-label="linkedin" data-url="http://www.linkedin.com/shareArticle?url=URL_PLACEHOLDER&amp;source=URL_PLACEHOLDER&amp;mini=true&amp;title=Home" className="linkedin link-icon color-monochrome-1 socials__item mr-15">
            <svg  className="svg">
      <use xlinkHref="#icon-linkedin"></use>
    </svg>

          </a>
              <a href="http://x.com/share?url=https%3A//sldc.sid2-e1.investis.com/&amp;text=Home"  target="_blank" title="Share via x" aria-label="twitter" data-url="http://x.com/share?url=URL_PLACEHOLDER&amp;text=Home" className="twitter link-icon color-monochrome-1 socials__item mr-15">
            <svg  className="svg">
      <use xlinkHref="#icon-twitter"></use>
    </svg>

          </a>
              <a href="cdn-cgi/l/email-protection/index.html#38074b4d5a525d5b4c05504c4c484b1d0b7917174b545c5b164b515c0a155d091651564e5d4b4c514b165b5755171e595548035a575c41057057555d" target="_blank" title="Share via email" aria-label="email" data-url="mailto:?subject=URL_PLACEHOLDER&amp;body=Home" className="email link-icon color-monochrome-1 socials__item mr-15">
            <svg  className="svg">
      <use xlinkHref="#icon-email"></use>
    </svg>

          </a>
          </div>
            <button className="button-icon color-monochrome-1 icon-size-25 ml-20 js-header-bottom-bar-close-button">
              <span className="sr-only">Close</span>
              <svg  className="svg">
      <use xlinkHref="#icon-close"></use>
    </svg>

            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
