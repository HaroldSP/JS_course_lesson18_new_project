/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

/*
1) Реализовать табы по видео.
2) В функции toggleMenu() много обработчиков событий. Используя делегирование событий, сделать обработчики для:

Крестика закрытия меню и пунктов меню.
На кнопку меню.
3) У вас должно быть максимум 2 обработчика события в функции toggleMenu()

дополнительное:
1) Написать 1 обработчик для всех событий внутри функции toggleMenu()
2) Реализовать следующий функционал: если клик произошел мимо меню, оно закрывается
*/

const menuDelegation = () => {
  const menuBtn = document.getElementsByClassName('menu')[0];
  // console.log(menuBtn)
  const menu = document.querySelector('menu');
  // console.log(menu)
  const closeBtn = menu.querySelector('.close-btn');
  const menuItems = menu.querySelectorAll('ul > li > a');

  const handleMenuItemToggle = () => menu.classList.toggle('active-menu');

  menuBtn.addEventListener('click', handleMenuItemToggle);

  closeBtn.addEventListener('click', handleMenuItemToggle);

  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (event) => {
      // handleMenuItemToggle(); // если нужно закрыть меню сразу после клика. ОСтавил, чтобы продемонстрировать относительное перемещение.
      event.preventDefault();
      console.log(event.target)
      let targetId = menuItem.getAttribute('href').slice(1);
      let target = document.getElementById(targetId);

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

export default menuDelegation;
