(function() {
  "use strict";

  var observer = new MutationObserver(function() {
    // As soon as body element is created, update its classes.
    if (document.body) {
      document.body.classList.remove('no-js');
      document.body.classList.add('has-js');

      // Stop observing document element.
      observer.disconnect();
    }
  });

  // Start observing document element.
  observer.observe(document.documentElement, {childList: true});
})();
