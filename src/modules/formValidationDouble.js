/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

/*
Необходимо реализовать двойную проверку (первой и второе задание одновременно).

Первое задание:
1) В калькуляторе разрешить ввод только цифр:
После выполнения необходимо проверить работоспособность SELECT - при выборе любого значения текст option должен отображаться.

2) У нас на странице есть 3 формы (первый экран, последний экран и модальное окно).
Необходимо валидировать (проверять введенное значение на допустимые символы) поля ввода всех форм:

В поля ввода type=text и placeholder="Ваше сообщение" позволить ввод только кириллицы в любом регистре, дефиса и пробела.
В поля ввода type=email позволить ввод только латиницы в любом регистре, цифры и спецсимволы:  @  -  _  . ! ~ * '
(Собака , Дефис , Подчеркивание , Точка , Восклицательный знак , Тильда , Звездочка , Одинарная кавычка)
В поля ввода type=tel позволить ввод только цифр, круглых скобок и дефис

Второе задание:
Реализовать проверку введенных данных в поля ввода с помощью события blur (при потере полем ввода фокуса) и заменять их на корректные при необходимости по правилам:

Должны удаляться все символы, кроме допустимых
Несколько идущих подряд пробелов или дефисов должны заменяться на один.
Пробелы и дефисы в начале и конце значения должны удаляться.
Для поля type=text Первая буква каждого слова должна приводиться к верхнему регистру, а все остальные — к нижнему.
*/

const formValidationDouble = () => {
  const calcDiv = document.querySelector('.calc-block')
  const calcInputs = calcDiv.querySelectorAll('input[type="text"]');

  calcInputs.forEach(calcInput => {
    calcInput.addEventListener('blur', (e) => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/[\D]+/g, '');
      const trimmedValue = numericValue.trim();
      e.target.value = trimmedValue;
    })
  })

  // //////////////////////////////////////////////////                    forms                             //////////////////////////////////////////////////////////////

  // //////////////////////////////////////////////////                    new listners before submitting forms                             //////////////////////////////////////////////////////////////

  const forms = document.querySelectorAll('[name="user_form"]');

  const textInputs = document.querySelectorAll('input[name="user_name"]');
  const placeholderInputs = document.querySelectorAll('input[placeholder="Ваше сообщение"]');
  const telInputs = document.querySelectorAll('input[type="tel"]');
  const emailInputs = document.querySelectorAll('input[type="email"]');

  // console.log(emailInputs)

  // вообще есть случай, когда на конце есть пробел и дефис одновременно, а иногда появляется такая конструкция: " - ". Yо этого в задании не было, так что...
  // можно дальше обрабатывать, как н-р в случае с tel.

  textInputs.forEach(textInput => {
    textInput.addEventListener('blur', () => {
      let inputValue = textInput.value;
      inputValue = inputValue.replace(/(^\s+|\s+$)|(^-+|-+$)/g, '');
      inputValue = inputValue.replace(/[-]+/g, '-');
      inputValue = inputValue.replace(/[\s]+/g, ' ');
      inputValue = inputValue.replace(/[^а-яА-я\s-]/g, '');
      // inputValue = inputValue.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
      inputValue = inputValue.split(' ');
      inputValue = inputValue.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfLetters = word.slice(1).toLowerCase();

        return firstLetter + restOfLetters;
      });

      inputValue = inputValue.join(' ');
      textInput.value = inputValue;
    });
  });

  placeholderInputs.forEach(placeholderInput => {
    placeholderInput.addEventListener('blur', () => {
      let inputValue = placeholderInput.value;
      inputValue = inputValue.replace(/(^\s+|\s+$)|(^-+|-+$)/g, '');
      inputValue = inputValue.replace(/[-]+/g, '-');
      inputValue = inputValue.replace(/[\s]+/g, ' ');
      inputValue = inputValue.replace(/[^а-яА-я\s-]/g, '');

      placeholderInput.value = inputValue;
    });
  });

  telInputs.forEach(telInput => {
    telInput.addEventListener('blur', () => {
      let inputValue = telInput.value;
      inputValue = inputValue.replace(/(^\s+|\s+$)|(^-+|-+$)/g, '');
      inputValue = inputValue.replace(/[-]+/g, '-');
      inputValue = inputValue.replace(/[\s]+/g, '');
      inputValue = inputValue.replace(/[^\d()+-]/g, '');
      inputValue = inputValue.replace(/(^-+|-+$)/g, '');
      inputValue = inputValue.replace(/[-]+/g, '-');

      telInput.value = inputValue;
    });
  });

  emailInputs.forEach(emailInput => {
    emailInput.addEventListener('blur', () => {
      let regexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi;
      let inputValue = emailInput.value;
      // console.log(inputValue, '1 - original - emailInput.value'); // --  test---777  --

      inputValue = inputValue.replace(/(^\s+|\s+$)|(^-+|-+$)/g, '');
      // console.log(inputValue, '2 - cutoff- and spaces - emailInput.value');

      inputValue = inputValue.replace(/[-]+/g, '-');
      // console.log(inputValue, '3 - to single - emailInput.value');

      if (!regexp.test(inputValue)) {
        alert('Введите корректный email !');
        inputValue = '';
        emailInput.value = inputValue;
        // console.log(inputValue, '4 - after main check - emailInput.value');
      } else {
        inputValue = inputValue.replace(/(^-+|-+$)/g, '');
        // console.log(inputValue, '5 - delete hyphens leftovers - emailInput.value');

        inputValue = inputValue.replace(/[-]+/g, '-');
        // console.log(inputValue, '6 - change multihyphens to single - emailInput.value');

        emailInput.value = inputValue;
        // console.log(emailInput.value, '7 -result - emailInput.value');
      }
    });
  });

  // //////////////////////////////////////////////////                   submit prepared forms                             //////////////////////////////////////////////////////////////

  // повторная валидация необходима, так как первый клик вне инпута может быть сразу на кнопку отправить.
  // можно сделть что-нибудь вроде при клике на кнопку отправить жди секунду и попробуй отправить еще раз,
  // или сделать обязательные поля
  // но есть готовый код проверки, так что...

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isError = false;

      const textInputs = form.querySelectorAll('input[type="text"]');
      const telInputs = form.querySelectorAll('input[type="tel"]');
      const emailInputs = form.querySelectorAll('input[type="email"]');
      const placeholderInputs = form.querySelectorAll('input[placeholder="Ваше сообщение"]');

      textInputs.forEach(textInput => {
        // const regeExpShort = /[^а-яА-я]/gi;
        const regeExpLong = /^[а-яА-я]+([ -][а-яА-я]+)*$/gi;
        if ((regeExpLong.test(textInput.value)) && (textInput.value !== '')) console.log('В инпуте только кириллица');
        else {
          alert('В инпуте должна быть только кириллица'); // error message example;
          isError = true;
        }
      });

      placeholderInputs.forEach(placeholderInput => {
        const regeExpLong = /^[а-яА-я]+([ -][а-яА-я]+)*$/gi;
        if ((regeExpLong.test(placeholderInput.value)) && (placeholderInput.value !== '')) console.log('В инпуте только кириллица');
        else isError = true;
      });

      telInputs.forEach(telInput => {
        // const regeExpShort = /[^\d]/gi;
        const regeExpLong = /[^\d()+-]/g;
        if ((!regeExpLong.test(telInput.value)) && (telInput.value !== '')) console.log('В инпуте только цифры');
        else isError = true;
      });

      emailInputs.forEach(emailInput => {
        // const regeExpShort = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
        const regeExpLong = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi; // универсальная проверка корректности почтового адреса
        if ((regeExpLong.test(emailInput.value)) && (emailInput.value !== '')) console.log('В инпуте корректный email');
        else isError = true;
      });

      if (!isError) {
        form.reset();
        alert('Данные отправлены');
      }
    })
  })
};

export default formValidationDouble;
