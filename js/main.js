'use strict';

(() => {

  document.addEventListener('DOMContentLoaded', () => {

    const $body = document.querySelector('.body');
    const $heroSection = document.querySelector('.hero');
    const $aboutSection = document.querySelector('.about');
    const $advantagesSection = document.querySelector('.advantages');
    const $productionSection = document.querySelector('.production');
    const $partnersSection = document.querySelector('.partners');
    const $overlay = document.querySelector('.overlay');
    const $burger = document.querySelector('.burger');
    const $navMenu = document.querySelector('.header__nav');
    const $mobileMenu = document.querySelector('.mobile-menu');
    const $fixBlocks = document.querySelectorAll('.fix-block');
    const $productionItems = document.querySelectorAll('.production__item');
    const $productsButtons = document.querySelectorAll('.production__item-btn');
    const $productsDescrContainer = document.querySelector('.production__description');
    const $productsDescrInner = document.querySelector('.production__description-inner');

    const mobileDevices = window.matchMedia("(max-width: 1024px)");
    const desktopDevices = window.matchMedia("(min-width: 1367px)");

    // Прописываем текущий год в блок Copyright:

    document.querySelector('.copyright__year').innerText = new Date().getFullYear();

    // Слушатель событий на изменение ширины окна браузера:

    window.onresize = () => {

      mobileMenu();

    };

    const mobileMenu = () => {
      if (mobileDevices.matches) {
        $navMenu.classList.add('header__nav--hidden');
        $mobileMenu.classList.add('mobile-menu--visible');
      } else {
        $navMenu.classList.remove('header__nav--hidden');
        $mobileMenu.classList.remove('mobile-menu--visible');
      };
    };

    mobileMenu();

    // Nav-Menu on mobile devices:

    $burger.addEventListener('click', () => {
      $burger.classList.toggle('header__burger--close');
      if ($burger.classList.contains('header__burger--close')) {
        menuOpen();
      } else {
        burgerRotate.restart();
        menuClose();
      };
    });

    const menuOpen = () => {
      disableScroll();
      $body.classList.add('body--lock');
      openMenu.play();
    };

    const menuClose = () => {
      openMenu.reverse();
      setTimeout(() => {
        $body.classList.remove('body--lock');
        enableScroll();
      }, openMenu.duration() * 1000);
    };

    // Плавная прокрутка страницы:

    function smoothScroll(element) {
      window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth',
      });
    };

    const scrollTo = document.querySelectorAll('[data-scroll]');

    [...scrollTo].forEach(function (elemScroll) {
      elemScroll.addEventListener('click', (e) => {
        e.preventDefault();
        const id = elemScroll.getAttribute('data-scroll').replace('#', '');
        if (elemScroll.classList.contains('menu__link')) {
          $burger.classList.remove('header__burger--close');
          menuClose();
          setTimeout(() => {
            smoothScroll(document.getElementById(id));
          }, openMenu.duration() * 1000);
        } else {
          smoothScroll(document.getElementById(id));
        };
      });
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

    // Анимация меню:

    let burgerRotate = gsap.timeline({
      paused: true,
      reversed: true,
    }).to($burger, .5, {
      rotation: 360,
    });

    const burgerRule1 = CSSRulePlugin.getRule(".header__burger:before"),
      burgerRule2 = CSSRulePlugin.getRule(".header__burger:after");

    const openMenu = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .set($mobileMenu, {
        top: 0,
      })
      .fromTo('.header__burger-center-line', {
        opacity: 1,
      }, {
        duration: .25,
        opacity: 0,
      })
      .to(burgerRule1, {
        duration: .25,
        top: "50%",
      })
      .to(burgerRule2, {
        duration: .25,
        bottom: "50%",
      }, "-=.25")
      .to(burgerRule1, {
        duration: .35,
        transform: 'rotate(45deg) translateY(-50%)',
      })
      .to(burgerRule2, {
        duration: .35,
        bottom: "50%",
        transform: 'rotate(-45deg) translateY(50%)',
      }, "-=.35")
      .fromTo('.menu__list', {
        x: "-100vw",
        opacity: 0,
      }, {
        duration: .5,
        x: 0,
        width: "100%",
        opacity: 1,
      }, "-=.7")
      .from('.menu__link span', {
        duration: 1,
        y: 25,
        opacity: 0,
        stagger: .25,
      });

    // Анимация шапки (только на десктопах):

    if (!mobileDevices.matches) {

      const headerAnimation = gsap.timeline({
          paused: true,
          reversed: true,
        })
        .from('.header__logo-icon', {
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

      headerAnimation.play();

    };

    // Анимация секции Hero:

    const heroAnimation = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.hero__title', {
        duration: 1,
        y: 75,
        opacity: 0,
      })
      .from('.hero__descr', {
        duration: 1,
        y: 75,
        opacity: 0,
      }, "-=.75")
      .from('.hero__link', {
        duration: 1,
        scale: .75,
        opacity: 0,
      }, "-=.75");

    heroAnimation.play();

    // Анимация секции About:

    const aboutAnimation = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.about__title', {
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

    // Анимация секции Advantages (Преимущества):

    const advantagesAnimation = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.advantages__item', {
        duration: 1,
        y: -35,
        opacity: 0,
        stagger: .25,
      });

    // Анимация секции Production (Продукция):

    const productionAnimations = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.production__title', {
        duration: 1,
        y: -50,
        opacity: 0,
      });

    // Анимация секции Partners (Партнёры):

    const partnersAnimations = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.partners__item', {
        duration: .75,
        y: "random(-35, 35)",
        opacity: 0,
        stagger: .25,
      })
      .from('.partners__buttons', {
        duration: .75,
        opacity: 0,
      }, "-=.5");

    const pageAnimation = () => {
      if (document.documentElement.clientHeight / 2 >= $aboutSection.getBoundingClientRect().top) {
        aboutAnimation.play();
      };
      if (document.documentElement.clientHeight / 2 >= $advantagesSection.getBoundingClientRect().top) {
        advantagesAnimation.play();
      };
      if (document.documentElement.clientHeight / 2 >= $productionSection.getBoundingClientRect().top) {
        productionAnimations.play();
      };
      if (document.documentElement.clientHeight / 2 >= $partnersSection.getBoundingClientRect().top) {
        partnersAnimations.play();
        stopAutoListProducts();
      };
    };

    window.addEventListener('scroll', () => {
      pageAnimation();
    });

    // Анимация Pop-Up'ов:

    const openPopup = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.popup', {
        duration: 1.2,
        opacity: 0,
        ease: "expo.out",
        y: -150,
      })
      .from('.popup', {
        duration: 0.5,
        scale: 0.85,
      }, "-=1");

    // GSAP Active Products Animations:

    // На десктопах:

    const showProductsDescr = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .fromTo($productsDescrContainer, {
        padding: "0 35px",
      }, {
        duration: .75,
        padding: 35,
      })
      .fromTo($productsDescrInner, {
        y: 0,
        opacity: 0,
      }, {
        duration: .75,
        ease: "power1",
        y: 25,
        opacity: 1,
      }, "-=.75");

    // Active Products:

    let autoListTimer;
    let autoListStart;

    const showDescription = (el) => {
      if (!mobileDevices.matches) {
        hideAllDescription();
        el.parentNode.classList.add('production__item--active');
        el.classList.add('production__item-btn--active');
        setTimeout(() => {
          $productsDescrInner.innerHTML = el.parentNode.querySelector('.production__content').innerHTML;
          showProductsDescr.play();
        }, showProductsDescr.duration() * 1000);
      };
    };

    const hideAllDescription = () => {
      $productsButtons.forEach(el => el.parentNode.classList.remove('production__item--active'));
      $productsButtons.forEach(el => el.classList.remove('production__item-btn--active'));
      showProductsDescr.reverse();
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
      if (!mobileDevices.matches) {
        autoListTimer = true;
        autoListProducts();
      } else if (mobileDevices.matches || autoListTimer) {
        stopAutoListProducts();
      };
    };

    const stopAutoListProducts = () => {
      autoListTimer = false;
      clearTimeout(autoListStart);
      if (!document.querySelector('.production__item-btn--active')) {
        showDescription($productsButtons[0]);
      };
    };

    startAutoListProducts();

    $productsButtons.forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      if (!mobileDevices.matches) {
        if (autoListTimer) {
          autoListTimer = false;
          clearTimeout(autoListStart);
        };
        if (!el.classList.contains('production__item-btn--active')) {
          showDescription(el);
        };
      };
      if (mobileDevices.matches) {
        const content = el.parentNode.querySelector('.production__content');
        const contentHeight = content.scrollHeight + 'px';
        if (!el.classList.contains('production__item-btn--active')) {
          el.parentNode.classList.add('production__item--active');
          el.classList.add('production__item-btn--active');
          content.style.maxHeight = contentHeight;
        } else {
          el.parentNode.classList.remove('production__item--active');
          el.classList.remove('production__item-btn--active');
          content.style.maxHeight = 0;
        };
      };
    }));

    pageAnimation();

    // Открытие и закрытие Popup'а, сообщающего результат отправки сообщения:

    const $modals = document.querySelectorAll('.popups');
    const $modalOverlay = document.querySelector('.popups__overlay');
    const $popupEmail = document.querySelector('.popup-email');
    const $popupCloseBtn = document.querySelectorAll('.popup__close');

    const popupOpen = (popup, icon, message) => {
      disableScroll();
      closeAllPopups();
      $body.classList.add('body--lock');
      popup.parentNode.classList.add('popups__overlay--visible');
      popup.classList.add('popup--active');
      openPopup.play();
      if (popup.classList.contains('popup-email')) {
        popup.querySelector('.popup-email__img').setAttribute('src', icon);
        popup.querySelector('.popup-email__message').innerText = message;
      };
    };

    const closeAllPopups = () => {
      $modals.forEach((el) => {
        el.querySelector('.popup').classList.remove('popup--active');
      });
    };

    $modalOverlay.addEventListener('click', (e) => {
      if (e.target == $modalOverlay) {
        popupClose($modalOverlay);
      };
    });

    const popupClose = (popup) => {
      enableScroll();
      $body.classList.remove('body--lock');
      openPopup.reverse();
      popup.classList.remove('popups__overlay--visible');
      closeAllPopups();
    };

    $popupCloseBtn.forEach((el) => {
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popups__overlay'));
        e.preventDefault();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 27 && document.querySelector('.popup--active')) {
        const $popupActive = document.querySelector('.popups__overlay--visible');
        popupClose($popupActive);
      };
    });

    // Обработка формы:

    const $formBody = document.querySelector('.form')
    const $form = document.getElementById('feedback');
    $form.addEventListener('submit', formSend);

    async function formSend(e) {
      e.preventDefault();
      let error = formValidate($form);

      let formData = new FormData($form);

      if (error === 0) {
        $formBody.classList.add('form--sending');
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          let result = await response.json();
          // alert(result.message);
          popupOpen($popupEmail, './img/svg/email-ok.svg', result.message);
          $form.reset();
          $formBody.classList.remove('form--sending');
        } else {
          popupOpen($popupEmail, './img/svg/email-error.svg', 'Возникла ошибка при отправке формы');
          $formBody.classList.remove('form--sending');
        }
      } else {
        popupOpen($popupEmail, './img/svg/email-error.svg', 'Заполните обязательные поля');
      };

    };

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('.required');

      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains('feedback__input--email')) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          };
        } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
          formAddError(input);
          error++;
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          };
        };
      };
      return error;
    };

    function formAddError(input) {
      input.classList.add('error');
    };

    function formRemoveError(input) {
      input.classList.remove('error');
    };

    // Функция проверки E-mail:
    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };

  });

})();