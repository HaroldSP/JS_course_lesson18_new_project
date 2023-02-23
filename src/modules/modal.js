/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const modal = () => {
  const modal = document.querySelector('.popup');
  const closeBtn = modal.querySelector('.popup-close');
  const buttons = document.querySelectorAll('.popup-btn');
  const animationDuration = 500;
  let animationStart;

  function animateModal (timestamp) {
    if (!animationStart) animationStart = timestamp; // true только в первый разб чтобы записать начальное время
    // console.log(animationStart); // посмотреть время начала анимации
    const animationProgress = timestamp - animationStart;
    // console.log(timestamp, 'animationProgress:', animationProgress); // посмотреть прогресс
    const opacity = Math.min(1, animationProgress / animationDuration); // чтобы не перескочить единицу
    modal.style.opacity = opacity;
    if (animationProgress < animationDuration) {
      requestAnimationFrame(animateModal);
    }
  }

  function openModal () {
    animationStart = null;
    modal.style.display = 'block';
    requestAnimationFrame(animateModal); // вместе с этим методом автоматически передается арг timestamp вызываемой функции.
    // console.log(!animationStart, 'first time condition'); // true только в этот раз
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};

export default modal;
