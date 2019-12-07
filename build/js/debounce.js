'use strict';

(function () {
  const INTERVAL = 500;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return () => {
      const parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb.apply(null, parameters);
      }, INTERVAL);
    };
  };
})();
