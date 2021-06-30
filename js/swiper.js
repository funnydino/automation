'use strict';

(() => {

  document.addEventListener('DOMContentLoaded', () => {

    const partnersSlider = document.querySelector('.partners__swiper-container');

    const desktopRes = window.matchMedia("(min-width: 1367px)");

    // Swiper initialization:

    let partnersSwiper;

    function SliderPartners() {

      if (partnersSlider.dataset.loaded == 'false') {
        partnersSwiper = new Swiper('.partners__swiper-container', {
          slidesPerView: 1,
          slidesPerGroup: 1,
          direction: 'horizontal',
          speed: 1000,
          loop: true,
          spaceBetween: 50,
          simulateTouch: false,
          touchRatio: 2,
          breakpoints: {
            577: {
              slidesPerView: 2,
            },
            769: {
              slidesPerView: 3,
            },
            1025: {
              slidesPerView: 4,
            },
            1367: {
              slidesPerView: 6,
            }
          },
          navigation: {
            nextEl: '.partners__swiper-button-next',
            prevEl: '.partners__swiper-button-prev',
          },
          autoplay: {
            delay: 5000,
          },
        });
        partnersSlider.dataset.loaded = 'true';
      };

      if (desktopRes.matches) {
        partnersSlider.dataset.loaded = 'false';
        if (partnersSlider.classList.contains('swiper-container-initialized')) {
          partnersSwiper.destroy();
        };
      };

    };

    SliderPartners();

    /* Partners Slider Reload */

    function partnersSliderReload(desktopRes) {
      if (desktopRes.matches) {
        partnersSwiper.destroy();
        partnersSlider.dataset.loaded = 'false';
        SliderPartners();
        document.querySelector('.partners__swiper-container').style.overflow = 'visible';
        document.querySelectorAll('.partners__item').forEach((el) => el.style.flex = '0 1 13%');
        // document.querySelectorAll('.partners__link').forEach((el) => el.setAttribute('tabindex', '0'));
        document.querySelector('.partners__swiper-button-prev').style.display = 'none';
        document.querySelector('.partners__swiper-button-next').style.display = 'none';
        console.log('Publications slider disabled!');
      } else {
        partnersSwiper.destroy();
        partnersSlider.dataset.loaded = 'false';
        SliderPartners();
        document.querySelector('.partners__swiper-container').style.overflow = 'hidden';
        document.querySelectorAll('.partners__item').forEach((el) => el.style.flex = 'none');
        // document.querySelectorAll('.partners__link').forEach((el) => el.setAttribute('tabindex', '-1'));
        document.querySelector('.partners__swiper-button-prev').style.display = 'block';
        document.querySelector('.partners__swiper-button-next').style.display = 'block';
        console.log('Publications slider enabled!');
      };
    };

    partnersSliderReload(desktopRes);
    desktopRes.addListener(partnersSliderReload);

  });

})();