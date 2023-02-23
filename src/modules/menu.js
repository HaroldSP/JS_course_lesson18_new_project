/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const menu = () => {
  const menuBtn = document.getElementsByClassName('menu')[0];
  const menu = document.querySelector('menu');
  const closeBtn = menu.querySelector('.close-btn');
  const menuItems = menu.querySelectorAll('ul > li > a');

  const handleMenu = () => {
    menu.classList.toggle('active-menu');
  }

  menuBtn.addEventListener('click', handleMenu);

  closeBtn.addEventListener('click', handleMenu);

  menuItems.forEach(menuItem => menuItem.addEventListener('click', handleMenu));
};

export default menu;
