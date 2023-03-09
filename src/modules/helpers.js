/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

// https://learn.javascript.ru/js-animation

const animate = ({ timing, draw, duration }) => {
  let start = performance.now();

  requestAnimationFrame(function animate (time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

const getScrollbarWidth = () => {
  const div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  document.body.appendChild(div);

  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  document.body.removeChild(div);

  return scrollbarWidth;
}

const disableBodyScroll = () => {
  const scrollY = window.scrollY;
  const body = document.body;
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = `-${scrollY}px`;
  body.style.paddingRight = `${getScrollbarWidth()}px`;
}

const enableBodyScroll = () => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  body.style.paddingRight = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

export { animate, enableBodyScroll, disableBodyScroll, getScrollbarWidth };
