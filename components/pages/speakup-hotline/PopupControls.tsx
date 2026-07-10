export default function PopupControls() {
  return (
    <>
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
    </>
  );
}
