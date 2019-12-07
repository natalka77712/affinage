'use strict';

(() => {
  const TIMEOUT = 2000;
  const Key = {
    ENTER: 'Enter'
  };

  const elFirstImage = document.querySelector('.slider__image--first');
  const elFirstWebpImage = document.querySelector('.slider__webp-first');
  const elSecondImage = document.querySelector('.slider__image--second');
  const elSecondWebpImage = document.querySelector('slider-webp-second');
  const elsControlButtons = document.querySelectorAll('.slider__toggle-buttons');

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

  const replaceImageAddresses = () => {
    [elFirstWebpImage.srcset, elSecondWebpImage.srcset] = [elSecondWebpImage.srcset, elFirstWebpImage.srcset];
    [elFirstImage.srcset, elSecondImage.srcset] = [elSecondImage.srcset, elFirstImage.srcset];
    [elFirstImage.src, elSecondImage.src] = [elSecondImage.src, elFirstImage.src];
  };

  const preventHorizontalScroll = () => {
    document.body.classList.toggle('js-scroll');
  };

  const changeClassesForAnimation = (isSlow) => {
    let postfix = isSlow ? "-slow" : "-fast";

    elFirstImage.classList.remove(`slider__image--first-animation${postfix}`);
    elFirstImage.classList.add(`slider__image--first-animation${postfix}`);

    elSecondImage.classList.remove(`slider__image--second-animation${postfix}`);
    elSecondImage.classList.add(`slider__image--second-animation${postfix}`);
    preventHorizontalScroll();

    setTimeout(() => {
      elFirstImage.classList.remove(`slider__image--first-animation${postfix}`);
      elSecondImage.classList.remove(`slider__image--second-animation${postfix}`);
      preventHorizontalScroll();
    }, TIMEOUT);
  };

  const changeImagesFastHandler = debounce(() => {
    changeClassesForAnimation(false);
    replaceImageAddresses();
  });

  const changeImagesFastKeyHandler = debounce((evt) => {
    if (evt.key === Key.ENTER) {
      changeClassesForAnimation(false);
      replaceImageAddresses();
    }
  });

  elsControlButtons[0].addEventListener('click', changeImagesFastHandler);
  elsControlButtons[0].addEventListener('keydown', changeImagesFastKeyHandler);
})();
