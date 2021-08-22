'use strict';

(() => {

  document.addEventListener('DOMContentLoaded', () => {

    const $body = document.querySelector('.body');
    const $fixBlocks = document.querySelectorAll('.fix-block');
    const $mobileMenu = document.querySelector('.mobile-menu');
    const $toTopBtn = document.querySelector('.page__to-top');
    const $header = document.querySelector('.header');
    const $burger = document.querySelector('.burger');
    const $navMenu = document.querySelector('.header__nav');
    const $heroSection = document.querySelector('.hero');
    const $aboutSection = document.querySelector('.about');
    const $advantagesSection = document.querySelector('.advantages');
    const $servicesSection = document.querySelector('.services');
    const $partnersSection = document.querySelector('.partners');
    const $overlay = document.querySelector('.overlay');

    const mobileDevices = window.matchMedia("(max-width: 1024px)");
    const desktopDevices = window.matchMedia("(min-width: 1367px)");

    // Прописываем текущий год в блок Copyright:

    document.querySelector('.copyright__year').innerText = new Date().getFullYear();

    // Слушатель событий на изменение ширины окна браузера:

    window.onresize = () => {

      mobileMenu();

    };

    // Функция для 'Fixed Header' и 'To-Top Link':

    let previousScroll = window.pageYOffset;

    const hideHeader = () => {
      // $header.classList.remove('header--fixed');
      $header.classList.add('header--hidden');
    };

    const showHeader = () => {
      $header.classList.remove('header--hidden');
      $header.classList.add('header--fixed');
    };

    const fixedHeader = () => {

      let currentScroll = window.pageYOffset;

      if (window.pageYOffset >= $header.offsetHeight && window.pageYOffset < $heroSection.offsetHeight) {
        $header.classList.add('header--hidden');
      } else if (window.pageYOffset >= $heroSection.offsetHeight) {
        $toTopBtn.classList.add('page__to-top--visible');
        if (!mobileDevices.matches) {
          showHeader();
        } else {
          if (previousScroll < currentScroll) {
            hideHeader();
          } else {
            showHeader();
          };
          previousScroll = currentScroll;
        };
      } else {
        $header.classList.remove('header--hidden');
        $header.classList.remove('header--fixed');
        $toTopBtn.classList.remove('page__to-top--visible');
      };

    };

    fixedHeader();

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
        menuClose();
      };
    });

    const menuOpen = () => {
      disableScroll();
      $body.classList.add('body--lock');
      $mobileMenu.style.paddingTop = $header.offsetHeight + 'px';
      openMenu.timeScale(1).play();
    };

    const menuClose = () => {
      openMenu.timeScale(1.5).reverse();
      setTimeout(() => {
        $body.classList.remove('body--lock');
        enableScroll();
      }, openMenu.duration() * 750);
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
          }, openMenu.duration() * 750);
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

    document.querySelectorAll('._hidden').forEach(el => el.classList.remove('_hidden'));

    // Анимация меню:

    const openMenu = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .set($mobileMenu, {
        top: 0,
      })
      .fromTo('.menu-list', {
        x: "-100vw",
        opacity: 0,
      }, {
        duration: .5,
        x: 0,
        width: "100%",
        opacity: 1,
      })
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

    // Анимация секции Services (Услуги):

    const servicesAnimations = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.services__title', {
        duration: 1,
        y: -50,
        opacity: 0,
      })
      .from('.services__text', {
        duration: .75,
        y: 35,
        opacity: 0,
        stagger: .25,
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
      if (document.documentElement.clientHeight / 2 >= $servicesSection.getBoundingClientRect().top) {
        servicesAnimations.play();
      };
      if (document.documentElement.clientHeight / 2 >= $partnersSection.getBoundingClientRect().top) {
        partnersAnimations.play();
      };
    };

    window.addEventListener('scroll', () => {
      pageAnimation();
      fixedHeader();
    }, {
      passive: true
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