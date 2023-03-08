/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

import { animate } from './helpers';

// Реализовать калькулятор на сайте
// Uncomment to use animation without animate func from helpers and comment out animate func

const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcCount = document.querySelector('.calc-count');
  const calcDay = document.querySelector('.calc-day');
  const total = document.getElementById('total');

  // let intervalId;
  let previousTotalValue = 0;
  let totalValue = 0;
  // let totalValueAnim = 0;

  const countCalc = () => {
    const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
    const calcSquareValue = calcSquare.value;

    // let totalValue = 0;
    let calcCountValue = 1;
    let calcDayValue = 1;

    if (calcCount.value > 1) {
      calcCountValue += +calcCount.value / 10
    };

    if (calcDay.value && calcDay.value < 5) {
      calcDayValue = 2;
    } else if (calcDay.value && calcDay.value < 10) {
      calcDayValue = 1.5;
    } else {
      calcDayValue = 1;
    };

    if (calcType.value && calcSquare.value) {
      totalValue = price * calcTypeValue * calcSquareValue * calcCountValue * calcDayValue;
    } else {
      totalValue = 0;
    };

    return totalValue;
  };

  // const animationFucn = () => {
  //   if (totalValueAnim < totalValue) {
  //     totalValueAnim++;
  //     total.textContent = totalValueAnim;
  //   } else {
  //     clearInterval(intervalId);
  //     totalValueAnim = 0;
  //     // console.log('restart');
  //   }
  // };

  calcBlock.addEventListener('input', (e) => {
    if (e.target === calcType || e.target === calcSquare ||
        e.target === calcCount || e.target === calcDay) {
      // clearInterval(intervalId);
      // totalValueAnim = 0;
      // total.textContent = totalValueAnim;

      totalValue = countCalc();

      console.log(previousTotalValue, 'previousTotalValue')
      console.log(totalValue, 'totalValue')

      // intervalId = setInterval(animationFucn, 1);
      animate({
        duration: 5000,
        timing (timeFraction) {
          return timeFraction;
        },
        draw (progress) {
          // console.log('draw section')
          // console.log(previousTotalValue)
          // console.log(totalValue)
          total.textContent = previousTotalValue + Math.round(progress * (totalValue - previousTotalValue));
        }
      });

      setTimeout(() => {
        previousTotalValue = totalValue;
      }, 5000);
    }
  });
};

export default calc;
