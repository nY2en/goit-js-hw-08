import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');
const formData = {};
const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onInputChange, 500));
formRef.addEventListener('submit', onSubmitClick);

fillTextarea();

function onInputChange(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitClick(e) {
  e.preventDefault();

  const emailValue = inputRef.value;
  const pswValue = textareaRef.value;

  if (emailValue === '' || pswValue === '') {
    console.log(alert('All fileds must be filled'));
    return;
  }

  console.log(localStorage.getItem(STORAGE_KEY));

  localStorage.removeItem(STORAGE_KEY);

  e.currentTarget.reset();
}

function fillTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
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
