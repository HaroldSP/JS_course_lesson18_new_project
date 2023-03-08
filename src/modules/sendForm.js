/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

'strict';

const sendForm = ({ formId, someElem = [] }) => {
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
        alert('В инпуте должна быть только кириллица'); // error message example;
        success = false;
      }
    });

    placeholderInputs.forEach(placeholderInput => {
      const regeExpLong = /^[а-яА-ЯёЁ0-9\s.,!?()-]+$/gi;
      if ((regeExpLong.test(placeholderInput.value)) && (placeholderInput.value !== '')) console.log('В инпуте только кириллица');
      else success = false;
    });

    telInputs.forEach(telInput => {
      // const regeExpShort = /[^\d]/gi;
      const regeExpLong = /[^\d()+-]/g;
      if ((!regeExpLong.test(telInput.value)) && (telInput.value !== '')) console.log('В инпуте только цифры');
      else success = false;
    });

    emailInputs.forEach(emailInput => {
      // const regeExpShort = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
      const regeExpLong = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi; // универсальная проверка корректности почтового адреса
      if ((regeExpLong.test(emailInput.value)) && (emailInput.value !== '')) console.log('В инпуте корректный email');
      else success = false;
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

        setTimeout((timeout = 3) => {
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
      alert('Данные не валидны');
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
