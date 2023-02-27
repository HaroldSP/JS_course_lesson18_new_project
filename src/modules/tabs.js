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

const tabs = () => {
  const tabPanel = document.querySelector('.service-header');
  const tabs = document.querySelectorAll('.service-header-tab');
  const tabContent = document.querySelectorAll('.service-tab');

  // console.log(tabPanel);
  tabPanel.addEventListener('click', (e) => {
    if (e.target.closest('.service-header-tab')) {
      const tabBtn = e.target.closest('.service-header-tab');
      console.log(tabBtn);

      tabs.forEach((tab, index) => {
        if (tab === tabBtn) {
          tab.classList.add('active');
          tabContent[index].classList.remove('d-none');
        } else {
          tab.classList.remove('active');
          tabContent[index].classList.add('d-none');
        }
      })
    }
    // console.log(e.target);
  });
};

export default tabs;
