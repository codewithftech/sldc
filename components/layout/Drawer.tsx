export default function Drawer() {
  return (
    <>
    <div className="drawer drawer--slide-in-right js-drawer">
      <div className="drawer__inner">
        <div className="drawer__header">
          <button className="link link--primary link--icon-left font-primary-medium drawer__back-button js-drawer-back-button">
            <span>Back</span>
            <svg  className="svg">
      <use xlinkHref="#icon-angle"></use>
    </svg>

          </button>

          <button className="button-icon drawer__close-button js-drawer-close-button">
            <span className="sr-only">Close menu</span>
            <svg  className="svg">
      <use xlinkHref="#icon-close"></use>
    </svg>

          </button>
        </div>
        <div className="drawer__main-content js-drawer-main-content"></div>
        <div className="drawer__footer js-drawer-footer"></div>
      </div>
    </div>
    </>
  );
}
