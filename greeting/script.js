/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

// alert('hi')

// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время: 12:05:15 PM
// До нового года осталось 175 дней

const greeting = document.getElementById('greeting');
const weekday = document.getElementById('weekday');
const currentTime = document.getElementById('currentTime');
const newYearCountdown = document.getElementById('newYearCountdown');

const getGreeting = () => {
  let hours = new Date().getHours();

  if (hours < 6) return 'Доброй ночи';
  else if (hours < 12) return 'Доброе утро';
  else if (hours < 18) return 'Добрый день';
  else return 'Добрый вечер';
};

const getWeekday = () => {
  let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let dayNum = new Date().getDay();

  return weekDays[dayNum];
};

const getCurrentTime = () => {
  const date = new Date();

  return date.toLocaleTimeString('en-US', { hour12: true });
};

const getnewYearCountdown = () => {
  let dateStop = new Date('1 January 2024').getTime();
  let dateNow = new Date().getTime();
  let timeRemain = (dateStop - dateNow) / 1000;

  let days = Math.floor(timeRemain / 60 / 60 / 24);

  return days
}

greeting.innerHTML = getGreeting()
weekday.innerHTML = 'Сегодня: ' + getWeekday();
currentTime.innerHTML = 'Текущее время: ' + getCurrentTime();
newYearCountdown.innerHTML = `До нового года осталось ${getnewYearCountdown()} дней`;
