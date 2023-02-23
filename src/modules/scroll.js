/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const scroll = () => {
  const button = document.querySelector('a[href="#service-block"]');
  const target = document.querySelector('#service-block');

  const targetPosition = target.offsetTop + 50; // еще 50 px от padding
  const animationDuration = 500;

  let animationStart;

  function animateScroll (timestamp) {
    if (!animationStart) animationStart = timestamp;

    const animationProgress = timestamp - animationStart;

    const animationPercent = Math.min(1, animationProgress / animationDuration);

    const scrollPosition = Math.floor(animationPercent * targetPosition);

    window.scrollTo(0, scrollPosition);

    if (animationPercent < 1) requestAnimationFrame(animateScroll);
  }

  function handleClick (event) {
    event.preventDefault();

    animationStart = null;

    requestAnimationFrame(animateScroll);
  }

  button.addEventListener('click', handleClick);
};

export default scroll;
