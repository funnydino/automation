'use strict';

(() => {

  document.addEventListener('DOMContentLoaded', () => {

    const $body = document.querySelector('.body');
    const $heroSection = document.querySelector('.hero');
    const $aboutSection = document.querySelector('.about');
    const $productionSection = document.querySelector('.production');
    const $partnersSection = document.querySelector('.partners');
    const $overlay = document.querySelector('.overlay');
    const $burger = document.querySelector('.burger');
    const $fixBlocks = document.querySelectorAll('.fix-block');
    const $productsButtons = document.querySelectorAll('.production__item-btn');
    const $productsDescrContainer = document.querySelector('.production__description');
    const $productsDescrInner = document.querySelector('.production__description-inner');

    window.addEventListener('scroll', () => {
      pageAnimation();
    });

    // Disable & Enable Scroll (убираем прыжок при открытии меню или модального окна):

    let disableScroll = () => {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      $body.classList.add('disable--scroll');
      $fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    };

    let enableScroll = () => {
      $body.classList.remove('disable--scroll');
      $fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    };

    // GSAP Animations:

    const headerAnimation = gsap.timeline({
      paused: true,
      reversed: true,
    });

    headerAnimation.from('.header__logo-icon', {
        duration: 1,
        y: 15,
        scale: .75,
        opacity: 0,
      })
      .from('.header__logo-text', {
        duration: 1,
        y: 15,
        opacity: 0,
      }, "-=.5")
      .from('.nav__item', {
        duration: 1,
        y: 25,
        opacity: 0,
        stagger: .35,
      });

    const heroAnimation = gsap.timeline({
      paused: true,
      reversed: true,
    });

    heroAnimation.from('.hero__title', {
        duration: 1,
        scale: .75,
        opacity: 0,
      })
      .from('.hero__link', {
        duration: 1,
        scale: .75,
        opacity: 0,
      });

    const aboutAnimation = gsap.timeline({
      paused: true,
      reversed: true,
    });

    aboutAnimation.from('.about__title', {
        duration: .75,
        scale: .75,
        opacity: 0,
      })
      .from('.about__text', {
        duration: .75,
        y: 35,
        opacity: 0,
        stagger: .25,
      });

    const productionAnimations = gsap.timeline({
      paused: true,
      reversed: true,
    });

    productionAnimations.from('.production__title', {
      duration: 1,
      y: -50,
      opacity: 0,
    });

    const partnersAnimations = gsap.timeline({
      paused: true,
      reversed: true,
    });

    partnersAnimations.from('.partners__item', {
      duration: .75,
      y: "random(-35, 35)",
      opacity: 0,
      stagger: .25,
    });

    headerAnimation.play();
    heroAnimation.play();

    const pageAnimation = () => {
      if (document.documentElement.clientHeight / 2 >= $aboutSection.getBoundingClientRect().top) {
        aboutAnimation.play();
      };
      if (document.documentElement.clientHeight / 2 >= $productionSection.getBoundingClientRect().top) {
        productionAnimations.play();
      };
      if (document.documentElement.clientHeight / 2 >= $partnersSection.getBoundingClientRect().top) {
        partnersAnimations.play();
      };
    };

    pageAnimation();

    // GSAP Active Products Animations:

    const showProductsDescr = gsap.timeline({
      paused: true,
      reversed: true,
    });

    showProductsDescr.from($productsDescrInner, {
      duration: .75,
      y: 25,
      opacity: 0,
    });

    // Active Products:

    let autoListTimer;
    let autoListStart;

    const showDescription = (el) => {
      hideAllDescription();
      el.parentNode.classList.add('production__item--active');
      el.classList.add('production__item-btn--active');
      setTimeout(() => {
        $productsDescrInner.innerHTML = el.parentNode.querySelector('.production__content').innerHTML;
        showProductsDescr.play();
      }, showProductsDescr.duration() * 1000);
    };

    const hideAllDescription = () => {
      showProductsDescr.reverse();
      $productsButtons.forEach(el => el.parentNode.classList.remove('production__item--active'));
      $productsButtons.forEach(el => el.classList.remove('production__item-btn--active'));
    };

    const autoListProducts = () => {
      let delay = 5000;
      let i = 0;
      autoListStart = setTimeout(function autoList() {
        showDescription($productsButtons[i]);
        i += 1;
        if (i > $productsButtons.length - 1) {
          i = 0;
        };
        autoListStart = setTimeout(autoList, delay);
      }, 0);
      return autoListStart;
    };

    const startAutoListProducts = () => {
      if (window.innerWidth > 1024) {
        autoListTimer = true;
        autoListProducts();
      } else {
        if (autoListTimer) {
          autoListTimer = false;
          clearTimeout(autoListStart);
        };
      };
    };

    startAutoListProducts();

    $productsButtons.forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      if (autoListTimer) {
        autoListTimer = false;
        clearTimeout(autoListStart);
      };
      showDescription(el);
    }));

  });

})();