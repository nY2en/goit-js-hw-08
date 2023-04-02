import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');
const formData = {};

formRef.addEventListener('input', throttle(onInputChange, 500));
formRef.addEventListener('submit', onSubmitClick);

fillTextarea();

function onInputChange(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitClick(e) {
  e.preventDefault();

  console.log(localStorage.getItem('feedback-form-state'));

  localStorage.removeItem('feedback-form-state');

  e.currentTarget.reset();
}

function fillTextarea() {
  const savedData = localStorage.getItem('feedback-form-state');
  const parsedData = JSON.parse(savedData);

  if (parsedData) {
    const keys = Object.keys(parsedData);

    for (const key of keys) {
      inputRef.name === key
        ? (inputRef.value = parsedData[key])
        : (textareaRef.value = parsedData[key]);
    }
  }
}
