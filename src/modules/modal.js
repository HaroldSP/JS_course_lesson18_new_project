/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

import { animate, enableBodyScroll, disableBodyScroll, getScrollbarWidth } from './helpers';

const modal = () => {
  const modal = document.querySelector('.popup');
  const buttons = document.querySelectorAll('.popup-btn');
  // const animationDuration = 500; //  // своя старая функция
  // let animationStart; // своя старая функция
  let isSmallScreen;

  window.addEventListener('resize', () => {
    const width = document.documentElement.clientWidth;
    if (width < 768) isSmallScreen = true;
    else isSmallScreen = false;
  });

  // своя старая функция:
  // function animateModal (timestamp) {
  //   if (!animationStart) animationStart = timestamp; // true только в первый раз, чтобы записать начальное время
  //   // console.log(animationStart); // посмотреть время начала анимации
  //   const animationProgress = timestamp - animationStart;
  //   // console.log(timestamp, 'animationProgress:', animationProgress); // посмотреть прогресс
  //   const opacity = Math.min(1, animationProgress / animationDuration); // чтобы не перескочить единицу
  //   modal.style.opacity = opacity;
  //   if (animationProgress < animationDuration) {
  //     requestAnimationFrame(animateModal);
  //   }
  // }

  function openModal () {
    // animationStart = null; // своя старая функция
    // console.log(getScrollbarWidth());
    modal.style.display = 'block';
    disableBodyScroll();
    // своя старая функция:
    // if (!isSmallScreen) requestAnimationFrame(animateModal); // вместе с этим методом автоматически передается арг timestamp вызываемой функции.
    if (!isSmallScreen) {
      animate({
        duration: 1000,
        timing (timeFraction) {
          return timeFraction;
        },
        draw (progress) {
          modal.style.opacity = progress;
        }
      });
    }
    // console.log(!animationStart, 'first time condition'); // true только в этот раз
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.popup-content') || e.target.classList.contains('popup-close')) {
      modal.style.display = 'none';
      enableBodyScroll();
    }
  });
};

export default modal;
