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
  const body = document.querySelector('body');
  const menu = document.querySelector('menu');

  const handleMenuItemToggle = () => menu.classList.toggle('active-menu');

  body.addEventListener('click', (e) => {
    // console.log(e.target, 'куда кликнуто')
    if (e.target.closest('.menu')) {
      handleMenuItemToggle();
    } else if ((menu.classList.contains('active-menu')) && e.target.matches('menu > ul > li > a')) {
      handleMenuItemToggle(); // если нужно закрыть меню сразу после клика. Закомментировать, чтобы продемонстрировать относительное перемещение.
      e.preventDefault();
      let targetId = e.target.getAttribute('href').slice(1);
      let target = document.getElementById(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if ((menu.classList.contains('active-menu')) && !e.target.classList.contains('active-menu') && !e.target.matches('menu > ul > li')) {
      handleMenuItemToggle();
    }
  });
};

export default menuDelegation;
