/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const timer = (deadline) => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  const getTimeRemaining = () => {
    let dateStop = new Date(deadline).getTime();
    let dateNow = new Date().getTime();
    let timeRemain = (dateStop - dateNow) / 1000;

    // let days = Math.floor(timeRemain / 60 / 60 / 24);
    // let hours = Math.floor((timeRemain / 60 / 60) % 24);
    let hours = Math.floor(timeRemain / 60 / 60);
    let minutes = Math.floor((timeRemain / 60) % 60);
    let seconds = Math.floor(timeRemain % 60);

    return { timeRemain, hours, minutes, seconds };
  }

  const updateClock = () => {
    let getTime = getTimeRemaining();
    timerHours.textContent = getTime.hours;
    timerMinutes.textContent = getTime.minutes;
    timerSeconds.textContent = getTime.seconds;

    if (getTime.timeRemain > 0) setTimeout(updateClock, 1000);
  }
  updateClock();
  // countTimer('24 February 2023');
  // setInterval(countTimer, 1000, '24 February 2023');
}

export default timer;
