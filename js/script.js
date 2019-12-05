ready(function(){

  // В этом месте должен быть написан ваш код
  const myCard = [
    {
      descr: "",
      img: "img/tsennye-resheniya.jpg",
      imgAlt: '',
      name: "Название какие-то очень длинное, совершенно невменяемое для книгоиздателя",
      price: 512,
      qty: 2,
      totalItemPrice: 1024,
    },
    {
      descr: "",
      img: "img/tsennye-resheniya.jpg",
      imgAlt: '',
      name: "Название",
      price: 999024,
      qty: 1,
      totalItemPrice: 999024,
    }
  ];

  // список сообщений popup
  const myMessages = {
    wrongQty: 'Можно заказать только от 1 до 10 единиц одного товара',
    wrongQtyFiledVal: 'Нужно ввести число',
  };

  // Управляющие эл-ты
  let myProductCartTable = document.querySelector('.cart__table');
  let myPlusBtn = selectElements('.field-num__btn-plus'); //все кнопки +
  let myMinusBtn = selectElements('.field-num__btn-minus'); // все кнопки –
  let myDelBnt = selectElements('.cart__product-del-btn'); // все кнопки X (удаления товара из корзины)
  let myQtyFields = selectElements('.field-num__input'); // все поля кол-ва одного товара
  let myPriceFields = selectElements('.cart__item-price'); // все поля цены
  let myTotalPriceField = document.querySelector('.cart__products-price-num'); // поле суммарной цены заказа

  let PromoCode = 10%;
  let myTotalPrice = 0; // Цена за все товары в корзине с учетом скидки промо-кода 

  // ф-ция вызова popup'а (пока через alert)
  function showAlert(message) {
    alert(message);
  }

  // Функция-конвертер вида суммы валюты
  // расставляет нули между классами числа
  // по умолчанию добавляет знак рубля через пробел
  function convRUB(num, postfix = '₽') {
    let myRez = num.toString();
    if (myRez.match(/\d{4,}/g)) {
      while (myRez.replace(/(\d+)(\d{3}(\s\d{3})*$)/g, '$1 $2') != myRez) {
        myRez = myRez.replace(/(\d+)(\d{3}(\s\d{3})*$)/g, '$1 $2');
      }
    }
    if ((postfix != undefined) && (postfix.length) && (!postfix.match([/^[\s]+$/g]))) {
      myRez = `${myRez} ${postfix.trim()}`;
    }
    return myRez;
  }

  // подсчёт общего кол-ва единиц товаров в корзине
  function calcTotalQty(Arr) {
    let myTotalQty = 0;
    Arr.forEach((item) => { myTotalQty += item.qty });
    return myTotalQty;
  }

  // подсчёт общей суммы заказа
  function calcTotalPrice(Arr) {
    let myTotalPrice = 0;
    Arr.forEach((item) => { myTotalPrice += (item.price * item.qty); });
    return myTotalPrice;
  }

  function selectElements(item) {
    return document.querySelectorAll(item);
  }

  // рендер отдельной карточки товара
  function renderItem(item) {
    let myTmpNode = document.querySelector('.tmp__card-row').content.cloneNode(true);
    item.totalItemPrice = item.price * item.qty;
    myTmpNode.querySelector('.cart__item-name').textContent = item.name;
    myTmpNode.querySelector('.cart__item-img').src = item.img;
    myTmpNode.querySelector('.cart__item-img').alt = item.imgAlt;
    myTmpNode.querySelector('.cart__item-price').textContent = convRUB(item.totalItemPrice);
    myTmpNode.querySelector('.field-num__input').value = item.qty;
    return myTmpNode;
  }

  // рендер футера таблицы
  function renderFooter(sum) {
    let myTmpNode = document.querySelector('.tmp__table-footer').content.cloneNode(true);
    myTmpNode.querySelector('.cart__products-price-num').textContent = convRUB(sum);
    return myTmpNode;
  }

  // рендер всей корзины
  function renderCart(Arr) {
    myProductCartTable.innerHTML = ''; // удаляем предыдущие эл-ты из корзины
    let myHTMLFragment = document.createDocumentFragment();
    myHTMLFragment.append(document.querySelector('.tmp__table-header').content.cloneNode(true)); // добавляем шапку таблицы из шаблона
    Arr.forEach((item) => { myHTMLFragment.append(renderItem(item)); }); // добавляем все товары из объекта
    myHTMLFragment.append(renderFooter(calcTotalPrice(myCard))); //добавляем футер
    myProductCartTable.append(myHTMLFragment);
    showTotalQty();
    refreshElements();
  }

  renderCart(myCard);


  function refreshElements() { //обновляет управляющие эл-ты
    myPlusBtn = selectElements('.field-num__btn-plus'); //все кнопки +
    myMinusBtn = selectElements('.field-num__btn-minus'); // все кнопки –
    myDelBnt = selectElements('.cart__product-del-btn'); // все кнопки X (удаления товара из корзины)
    myQtyFields = selectElements('.field-num__input'); // все поля кол-ва одного товара
    myPriceFields = selectElements('.cart__item-price'); // все поля цены
    myTotalPriceField = document.querySelector('.cart__products-price-num'); // поле суммарной цены заказа

    myPlusBtn.forEach( (item, index) => { item.addEventListener('click', function() { changeQty(index, myCard[index].qty+1); }) } );
    myMinusBtn.forEach( (item, index) => { item.addEventListener('click', function() { changeQty(index, myCard[index].qty-1); }) } );
    myDelBnt.forEach( (item, index) => { item.addEventListener('click', function() { deleteItem(index) }) } );
    myQtyFields.forEach( (item, index) => { item.addEventListener('onchange', function() { changeQty(index, item.value) }) });
  }

  function showTotalQty(sum = calcTotalQty(myCard)) { //ф-ция перевывода заголовка с кол-вом товара
    let suff = 'ов'; // суффикс слова «товаров»
    switch (sum % 10) {
      case 1: {
        if (sum % 100 == 11) break;
        suff = '';
        break;
      }
      case 2: if (sum % 100 == 12) break;
      case 3: if (sum % 100 == 13) break;
      case 4:
        if (sum % 100 == 14) break;
        else {
          suff = 'а';
          break;
       }
    }
    if(sum == 0) { sum = 'нет'; };
    document.querySelector('.cart__title').textContent = `В корзине ${sum} товар${suff}`;
  }

  function deleteItem(ind) { //ф-ция удаления одного наименования
    myCard.splice(ind,1);
    renderCart(myCard);
  }

  function changeQty(ind, newQty) {//общая ф-ция для изменения кол-ва товара
    if ((newQty >= 1) && (newQty <= 10)) {
      myQtyFields[ind].value = newQty;
      myCard[ind].qty = newQty;
      myCard[ind].totalItemPrice = myCard[ind].qty * myCard[ind].price;
      myPriceFields[ind].textContent = convRUB(myCard[ind].totalItemPrice);
      showTotalQty();
      myTotalPriceField.textContent = convRUB(calcTotalPrice(myCard));
    }
    else {
      showAlert(myMessages.wrongQty);
    }
  }

  function changeQtyField(ind, newQty) { // ф-ция изменения текстового поля кол-ва товара
    if (newQty.trim().match(/[\d]+/g)) { changeQty(ind, newQty); }
    else { showAlert(myMessages.wrongQtyFiledVal); }
    myQtyFields[ind].value = myCard[ind].qty;
  }

  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
