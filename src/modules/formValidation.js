/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

// 1) В калькуляторе разрешить ввод только цифр:
// После выполнения необходимо проверить работоспособность SELECT - при выборе любого значения текст option должен отображаться.

// 2) У нас на странице есть 3 формы (первый экран, последний экран и модальное окно).
// Необходимо валидировать (проверять введенное значение на допустимые символы) поля ввода всех форм:

// В поля ввода type=text и placeholder="Ваше сообщение" позволить ввод только кириллицы в любом регистре, дефиса и пробела.
// В поля ввода type=email позволить ввод только латиницы в любом регистре, цифры и спецсимволы:  @  -  _  . ! ~ * '
// (Собака , Дефис , Подчеркивание , Точка , Восклицательный знак , Тильда , Звездочка , Одинарная кавычка)
// В поля ввода type=tel позволить ввод только цифр, круглых скобок и дефис

const formValidation = () => {
  const calcDiv = document.querySelector('.calc-block')
  const calcInputs = calcDiv.querySelectorAll('input[type="text"]');

  calcInputs.forEach(calcInput => {
    calcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D+/g, '');
    })
  })

  const forms = document.querySelectorAll('[name="user_form"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isError = false;

      const textInputs = form.querySelectorAll('input[type="text"]');
      const telInputs = form.querySelectorAll('input[type="tel"]');
      const emailInputs = form.querySelectorAll('input[type="email"]');
      const placeholderInputs = form.querySelectorAll('input[placeholder="Ваше сообщение"]');

      // console.log(placeholderInputs)

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

  console.log(forms[1])
};

export default formValidation;
