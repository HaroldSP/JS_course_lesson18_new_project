/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const sendForm = ({ formId, someElem = [] }) => {
  const calcDiv = document.querySelector('.calc-block')
  const calcInputs = calcDiv.querySelectorAll('input[type="text"]');

  calcInputs.forEach(calcInput => {
    calcInput.addEventListener('blur', (e) => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/[\D]+/g, '');
      const trimmedValue = numericValue.trim();
      e.target.value = trimmedValue;
    })

    // double check
    calcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D+/g, '');
    })
  })

  // //////////////////////////////////////////////////                    forms                             //////////////////////////////////////////////////////////////

  // //////////////////////////////////////////////////                    new listners before submitting forms                             //////////////////////////////////////////////////////////////

  const forms = document.querySelectorAll('[name="user_form"]');

  const textInputs = document.querySelectorAll('input[name="user_name"]');
  const placeholderInputs = document.querySelectorAll('input[placeholder="Ваше сообщение"]');
  const telInputs = document.querySelectorAll('input[type="tel"]');
  const emailInputs = document.querySelectorAll('input[type="email"]');

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

    // double check
    textInput.addEventListener('input', (e) => {
      const regeExpNot = /[^а-яА-Я\s-]/gi;
      e.target.value = e.target.value.replace(regeExpNot, '');
    })
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

    // double check
    placeholderInput.addEventListener('input', (e) => {
      const regeExpNot = /[^а-яА-Я\s-]/gi;
      e.target.value = e.target.value.replace(regeExpNot, '');
    })
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

    // double check
    telInput.addEventListener('input', (e) => {
      const regeExpNot = /[^\d()-]+/g;
      e.target.value = e.target.value.replace(regeExpNot, '');
    })
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

    // double check  @  -  _  . ! ~ * '
    emailInput.addEventListener('input', (e) => {
      const regeExpNot = /[^\w\d@_\-.!~*']+/gi;
      e.target.value = e.target.value.replace(regeExpNot, '');
    })
  });

  // //////////////////////////////////////////////////                   submit prepared forms                             //////////////////////////////////////////////////////////////

  const form = document.getElementById(formId);
  const statusBlock = document.createElement('div');
  const errorText = 'Ошибка...';
  const succesText = 'Спасибо, наш менеджер с вами свяжется!';

  const validate = (list) => {
    let success = true;
    // list.forEach(input => {
    //   if (!input.classList.contains('success')) success = false;
    // });

    const textInputs = form.querySelectorAll('input[type="text"]');
    const telInputs = form.querySelectorAll('input[type="tel"]');
    const emailInputs = form.querySelectorAll('input[type="email"]');
    const placeholderInputs = form.querySelectorAll('input[placeholder="Ваше сообщение"]');
    console.log(placeholderInputs)

    textInputs.forEach(textInput => {
      // const regeExpShort = /[^а-яА-я]/gi;
      const regeExpLong = /^[а-яА-я]+([ ][а-яА-я]+)*$/gi;
      if ((regeExpLong.test(textInput.value)) && (textInput.value !== '')) console.log('В инпуте только кириллица');
      else {
        // alert('В инпуте должна быть только кириллица'); // error message example;
        textInput.style.border = '2px solid red';
        setTimeout(() => { textInput.style.border = ''; }, 3000);
        success = false;
      }
    });

    placeholderInputs.forEach(placeholderInput => {
      const regeExpLong = /^[а-яА-ЯёЁ0-9\s.,!?()-]+$/gi;
      if ((regeExpLong.test(placeholderInput.value)) && (placeholderInput.value !== '')) console.log('В инпуте только кириллица');
      else {
        placeholderInput.style.border = '2px solid red';
        setTimeout(() => { placeholderInput.style.border = ''; }, 3000);
        success = false;
      }
    });

    telInputs.forEach(telInput => {
      // const regeExpShort = /[^\d]/gi;
      // const regeExpLong = /[^\d()+-]/g; // if use this reg exp -> add ! sign below
      const regeExpLongSixD = /^[()\d+-]{6,}$/g;
      if ((regeExpLongSixD.test(telInput.value)) && (telInput.value !== '')) console.log('В инпуте только цифры');
      else {
        telInput.style.border = '2px solid red';
        setTimeout(() => { telInput.style.border = ''; }, 3000);
        success = false;
      }
    });

    emailInputs.forEach(emailInput => {
      // const regeExpShort = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
      const regeExpLong = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi; // универсальная проверка корректности почтового адреса
      if ((regeExpLong.test(emailInput.value)) && (emailInput.value !== '')) console.log('В инпуте корректный email');
      else {
        emailInput.style.border = '2px solid red';
        setTimeout(() => { emailInput.style.border = ''; }, 3000);
        success = false;
      }
    });
    return success;
  };

  const sendData = (data) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  };

  const submitForm = () => {
    const formElements = form.querySelectorAll('input');
    const formData = new FormData(form);
    const formBody = {};

    statusBlock.classList.add('spinner');
    form.append(statusBlock);

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    someElem.forEach(elem => {
      const element = document.getElementById(elem.id);

      if (elem.type === 'block') formBody[elem.id] = element.textContent;
      else if (elem.type === 'input') formBody[elem.id] = element.value;
    });

    // console.log('submit');
    // console.log(validate(formElements))

    if (validate(formElements)) {
      sendData(formBody).then(data => {
        statusBlock.classList.remove('spinner');
        statusBlock.textContent = succesText;

        setTimeout(() => {
          statusBlock.textContent = '';
        }, 3000);

        formElements.forEach(input => {
          input.value = ''
        });
      })
        .catch(error => {
          statusBlock.classList.remove('spinner');
          statusBlock.textContent = errorText;
          console.error(error);
        })
    } else {
      // alert('Данные не валидны');
      statusBlock.classList.remove('spinner');
    //   form.reset(); // uncomment to clear form
    };
  };

  try {
    if (!form) {
      throw new Error('Верните форму на место');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitForm();
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default sendForm;
