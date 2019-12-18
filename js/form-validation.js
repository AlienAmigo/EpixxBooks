<<<<<<< HEAD
  function showAlert(message) {
    alert(message);
  }

// эл-ты формы, собранные в массив

=======
// эл-ты формы, собранные в массив
>>>>>>> origin/checkForm
const myFormElem = [
  {
    name: 'firstName',
    obj: document.querySelector('input[name="firstname"]'),
    regExp: new RegExp(/^\W[а-яА-я0-9\-]+\W$/gim),
    msg: 'Нужно ввести корректное имя',
  },
  {
    name: 'lastName',
    obj: document.querySelector('input[name="lastname"]'), // поле фамилии,
    regExp: new RegExp(/^\W[а-яА-я0-9\-]+\W$/gim),
    msg: 'Нужно ввести корректную фамилию',
  },
  {
    name: 'phone',
    obj: document.querySelector('input[name="phone"]'), // поле телефона
    regExp: new RegExp(/(?:(?<=\s)|(?<=^)|(?<=\b))(\+?\s?(\d)\s?\(?(\d{3})\)?\s?(\d{3})\s?\-?\s?(\d{2})\s?\-?\s?(\d{2}))/gim),
    msg: 'Нужно ввести корректное имя',
  },
  {
    name: 'email',
    obj: document.querySelector('input[type="email"]'), // поле email
    regExp: new RegExp(/\b[\w\-\.$]+@[\w\-\.]+\.[a-z]{1,3}\b/gim),
    msg: 'Нужно ввести корректное имя',
  },
];

let myFieldCheckedStyle = 'field-text--input-checked';

// список regExp выражений для проверки форм
// const myRegExp = {
//   firstName: /^\W[а-яА-я0-9\-]+\W$/gim,
//   lastName: /^\W[а-яА-я0-9\-]+\W$/gim,
//   phone: /(?:(?<=\s)|(?<=^)|(?<=\b))(\+?\s?(\d)\s?\(?(\d{3})\)?\s?(\d{3})\s?\-?\s?(\d{2})\s?\-?\s?(\d{2}))/gim,
//   email: /\b[\w\-\.$]+@[\w\-\.]+\.[a-z]{1,3}\b/gim,
// };

// вешаем обработчики событий на эл-ты формы
<<<<<<< HEAD
// myFormElem.forEach((item, index) => {
//     addEventListener('blur', function() {
//       checkFormField(item.obj, item.regExp, myFieldCheckedStyle, item.msg);
//     });
//     addEventListener('change', function() {
//       checkFormField(item.obj, item.regExp, myFieldCheckedStyle, item.msg);
//     });
//   });
=======
myFormElem.forEach((item, index) => {
    addEventListener('blur', function() { 
      checkFormField(item.obj, item.regExp, myFieldCheckedStyle, item.msg); 
    });
    addEventListener('change', function() { 
      checkFormField(item.obj, item.regExp, myFieldCheckedStyle, item.msg); 
    });
  });
>>>>>>> origin/checkForm


function checkFormField(obj, regExp, okStyle, msg) { // ф-ция проверки поля ввода формы
  let myText = obj.value.trim();
  let myParent = obj.parentElement;

  if (myText.match(regExp)) {
    myParent.classList.add(okStyle);
  }
  else {
    myParent.classList.remove(okStyle);
    showAlert(msg)
  };
};