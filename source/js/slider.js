'use strict';

(() => {
  const TIMEOUT = 1000;
  const INTERVAL = 200;
  const sliderFirst = document.querySelectorAll('.slider__image--first');
  const sliderSecond = document.querySelectorAll('.slider__image--second');
  const sliderWebpFirst = document.querySelectorAll('.slider__image-webp-first');
  const sliderWebpSecond = document.querySelectorAll('.slider__image-webp-second');
  const sliderToggle = document.querySelectorAll('.slider__button');

  window.debounce = (cb, ...args) => {
    let lastTimeout = null;

    return () => {
      const parameters = args.sort(function (a, b) { return a - b; });
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb.apply(null, parameters);
      }, 0);
    };
  };

  const changeImagesplaces = () => {
    [sliderWebpFirst[0].srcset, sliderWebpSecond[0].srcset] = [sliderWebpSecond[0].srcset, sliderWebpFirst[0].srcset];
    [sliderFirst[0].srcset, sliderSecond[0].srcset] = [sliderSecond[0].srcset, sliderFirst[0].srcset];
    [sliderFirst[0].src, sliderSecond[0].src] = [sliderSecond[0].src, sliderFirst[0].src];
  };

  const resetScroll = () => {
    document.body.classList.toggle('js-scroll');
  };

  const changeAnimationSpeed = (isSlow) => {
    let postfix = isSlow ? "-slow" : "-fast";

    sliderFirst[0].classList.remove(`slider__image--first-animation${postfix}`);
    sliderFirst[0].classList.add(`slider__image--first-animation${postfix}`);

    sliderSecond[0].classList.remove(`slider__image--second-animation${postfix}`);
    sliderSecond[0].classList.add(`slider__image--second-animation${postfix}`);
    resetScroll();

    setTimeout(() => {
      sliderFirst[0].classList.remove(`slider__image--first-animation${postfix}`);
      sliderSecond[0].classList.remove(`slider__image--second-animation${postfix}`);
      resetScroll();
    }, TIMEOUT);
  };

  const changeImagesFastHandler = debounce(() => {
    changeAnimationSpeed(false);
    setTimeout(() => {
    changeImagesplaces();
    }, INTERVAL);
  });

  const changeImagesSlowHandler = debounce(() => {
    changeAnimationSpeed(true);
    changeImagesplaces();
  });


  sliderToggle[0].addEventListener('click', changeImagesFastHandler);
  sliderToggle[1].addEventListener('click', changeImagesSlowHandler);
})();
