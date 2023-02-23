/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const menu = () => {
  const menuBtn = document.getElementsByClassName('menu')[0];
  const menu = document.querySelector('menu');
  const closeBtn = menu.querySelector('.close-btn');
  const menuItems = menu.querySelectorAll('ul > li > a');

  const animationDuration = 500;

  let animationStart;
  let targetId;
  let target;
  let targetPosition;

  function animateScroll (timestamp) {
    if (!animationStart) animationStart = timestamp;

    const animationProgress = timestamp - animationStart;

    const animationPercent = Math.min(1, animationProgress / animationDuration);

    const scrollPosition = Math.floor(animationPercent * targetPosition);

    window.scrollTo(0, scrollPosition);

    if (animationPercent < 1) requestAnimationFrame(animateScroll);
  }

  const handleMenuItemToggle = () => menu.classList.toggle('active-menu');

  menuBtn.addEventListener('click', handleMenuItemToggle);

  closeBtn.addEventListener('click', handleMenuItemToggle);

  menuItems.forEach(menuItem => menuItem.addEventListener('click', handleMenuItemToggle));

  const handleMenuItemScroll = (menuItem, event) => {
    handleMenuItemToggle();
    event.preventDefault();

    animationStart = null;

    targetId = menuItem.getAttribute('href').slice(1);

    target = document.getElementById(targetId);

    targetPosition = target.offsetTop + 50;

    requestAnimationFrame(animateScroll);
  }

  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (event) => handleMenuItemScroll(menuItem, event))
  });
};

export default menu;
