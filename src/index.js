/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

/*
Правки по всему данному проекту:
1. Если ввести некорректные данные в форму и отправить выскакивает алерт с сообщением о том, что данные не корректны. И дальше начинается бесконечный лоадер, которого не должно быть, так как отправка формы и не произошла.
2. Запустить таймер
3. Сделать, чтобы калькулятор считал от старого числа, например, ввёл 12, получил 1200, добавил к 12 цифру 3, то есть 123 и пересчёт должен происходить от 1200, а не от 0
4. Заблокировать ввод недопустимых символов:
https://skr.sh/sIkUZqSSR9l
5. Сделать отправку формы с длиной номера от 6 символов
6. Убирать сообщение об успешной отправке через 3-5 секунду после отправки
7. Блокировать прокрутку страницы при открытой модалке. Блокировать нужно правильно, а не просто overflow: hidden.
То есть, когда полоса прокрутка исчезает страница делает рывок на ширину исчезнувшего скролла. Нельзя, чтобы так было.
Поэтому логика такая, что нужно высчитать ширину полосы прокрутки и двигать body на ширину исчезнувшего скролла, а когда модалку закрываешь возвращать её обратно
8. Опциональная правка: Алерты это вообще не серьезно. Сделай красные бордеры инпутам, в которых данные невалидны, если справишься
*/

import timer from './modules/timer.js';
import menu from './modules/menu.js';
import modal from './modules/modal';
import scroll from './modules/scroll';
import formValidation from './modules/formValidation';
import formValidationPlus from './modules/formValidationPlus';
import formValidationDouble from './modules/formValidationDouble';
import tabs from './modules/tabs';
import menuDelegation from './modules/menuDelegation';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

timer('24 February 2023');
// menu();
modal();
scroll();
// formValidation();
// formValidationPlus();
// formValidationDouble();
tabs();
menuDelegation();
slider('.portfolio-content', '.portfolio-item', '.portfolio-dots');
calc();
// sendForm({
//   formId: 'form1',
//   someElem: [
//     {
//       type: 'block',
//       id: 'total'
//     }
//   ]
// });
sendForm({ formId: 'form1' });
sendForm({ formId: 'form2' });
sendForm({ formId: 'form3' });
