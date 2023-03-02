/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

// Реализовать калькулятор на сайте

const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcCount = document.querySelector('.calc-count');
  const calcDay = document.querySelector('.calc-day');
  const total = document.getElementById('total');

  let intervalId;
  let totalValue = 0;
  let totalValueAnim = 0;

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

  const animationFucn = () => {
    if (totalValueAnim < totalValue) {
      totalValueAnim++;
      total.textContent = totalValueAnim;
    } else {
      clearInterval(intervalId);
      totalValueAnim = 0;
      // console.log('restart');
    }
  };

  calcBlock.addEventListener('input', (e) => {
    if (e.target === calcType || e.target === calcSquare ||
        e.target === calcCount || e.target === calcDay) {
      clearInterval(intervalId);
      totalValueAnim = 0;
      total.textContent = totalValueAnim;
      totalValue = countCalc();
      console.log(totalValue)
      intervalId = setInterval(animationFucn, 1);
    }
  });
};

export default calc;
