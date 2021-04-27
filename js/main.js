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
    const $fixBlocks = document.querySelectorAll('.fix-block');
    const $productsButtons = document.querySelectorAll('.production__item-btn');
    const $productsDescrContainer = document.querySelector('.production__description');
    const $productsDescrInner = document.querySelector('.production__description-inner');

    // Прописываем текущий год в блок Copyright:

    document.querySelector('.copyright__year').innerText = new Date().getFullYear();

    // Плавная прокрутка страницы:

    function smoothScroll(element) {
      window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth'
      });
    };

    const scrollTo = document.querySelectorAll('[data-scroll]');

    [...scrollTo].forEach(function (elemScroll) {
      elemScroll.addEventListener('click', (e) => {
        e.preventDefault();
        const id = elemScroll.getAttribute('data-scroll').replace('#', '');
        smoothScroll(document.getElementById(id));
      });
    });

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

    const heroAnimation = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.hero__title', {
        duration: 1,
        scale: .75,
        opacity: 0,
      })
      .from('.hero__link', {
        duration: 1,
        scale: .75,
        opacity: 0,
      });

    heroAnimation.play();

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

    const productionAnimations = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.production__title', {
        duration: 1,
        y: -50,
        opacity: 0,
      });

    const partnersAnimations = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .from('.partners__item', {
        duration: .75,
        y: "random(-35, 35)",
        opacity: 0,
        stagger: .25,
      });

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

    const showProductsDescr = gsap.timeline({
        paused: true,
        reversed: true,
      })
      .fromTo($productsDescrContainer, {
        padding: "0 35px",
        borderRadius: 25,
        background: "linear-gradient(rgba(255, 255, 255, 1) 3px, rgba(243, 243, 243, 0.35) 15px, rgba(255, 255, 255, 0) 20px)",
      }, {
        duration: .75,
        padding: 35,
        borderRadius: 55,
        background: "linear-gradient(rgba(255, 255, 255, 1) 5px, rgba(243, 243, 243, 0.35) 25px, rgba(255, 255, 255, 0) 40px)",
      }, "-=.75")
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
      hideAllDescription();
      el.parentNode.classList.add('production__item--active');
      el.classList.add('production__item-btn--active');
      setTimeout(() => {
        $productsDescrInner.innerHTML = el.parentNode.querySelector('.production__content').innerHTML;
        showProductsDescr.play();
      }, showProductsDescr.duration() * 1000);
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
      if (window.innerWidth > 1024) {
        autoListTimer = true;
        autoListProducts();
      } else {
        if (autoListTimer) {
          stopAutoListProducts();
        };
      };
    };

    const stopAutoListProducts = () => {
      autoListTimer = false;
      clearTimeout(autoListStart);
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
      if (e.keyCode === 27) {
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