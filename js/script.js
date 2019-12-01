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

  // Функция-конвертер вида суммы валюты
  // расставляет нули между классами числа
  // по умолчанию добавляет знак рубля через пробел

  function convRUB(num, postfix = '₽') {
    let myRez = num.toString();
    if (myRez.match(/\d{4,}/g)) {
      let myTmpRez;
      do {
        myTmpRez = myRez;
        myRez = myRez.replace(/(\d+)(\d{3}(\s\d{3})*$)/g, '$1 $2');
      }
      while (myTmpRez != myRez);
    }
    if ((postfix != undefined) &&
        (postfix.length) &&
        (!postfix.match([/^[\s]+$/g]))
        ) {
      postfix = postfix.trim();
      myRez = `${myRez} ${postfix}`;
    }
    return myRez;
  }

  function calcTotalQty(Arr) { // подсчёт общего кол-ва единиц товара в корзине
    let myTotalQty = 0;
    Arr.forEach((item) => { myTotalQty += item.qty });
    return myTotalQty;
  }

  function selectElements(item) {
    return document.querySelectorAll(item);
  }

  const myHTMLFragment = document.createDocumentFragment();
  let myProductCartHeader = document.querySelector('.cart__table-headers');

  function renderItem(item) { // рендер отдельной карточки товара
    let myTmpNode = document.createElement('table');
    item.totalItemPrice = item.price * item.qty;
    let myCardRow = `<tr class=\"cart__product\">
      <td class=\"cart__col-1\">
        <img class=\"cart__item-img\" src=\"${item['img']}\" alt=\"${item['imgAlt']}\">
      </td>
      <td class=\"cart__col-2\">
        <div class=\"cart__item-name\">${item['name']}</div>
      </td>
      <td class=\"cart__col-3\">
        <div class=\"field-num  field-num--bg-tran\">
          <span class=\"field-num__input-wrap\">
            <button class=\"field-num__btn-minus\" type=\"button\">-</button>
            <input class=\"field-num__input\" type=\"number\" value=\"${item['qty']}\" step=\"1\" min=\"1\"/>
            <button class=\"field-num__btn-plus\" type=\"button\">+</button>
          </span>
        </div>
      </td>
      <td class=\"cart__col-4\">
        <span class=\"cart__item-price\">${convRUB(item.totalItemPrice)}</span>
      </td>
      <td class=\"cart__col-5\">
        <button class=\"close cart__product-del-btn\" type=\"button\">
          <svg width=\"16\" height=\"16\">
            <use xlink:href=\"#close\"></use>
          </svg>
        </button>
      </td>
    </tr>`;
    myTmpNode.insertAdjacentHTML('beforeend', myCardRow);
    let myNode = myTmpNode.querySelector('.cart__product');
    return myNode;
  }

  function renderFooter(sum) { // рендер футера таблицы
    let myTmpNode = document.createElement('table');
    let myCardRow = `<tr>
    <td class="cart__products-price" colspan="5">
      Итого к оплате: <strong class="cart__products-price-num" id="cart-products-price-num">${convRUB(sum)}</strong>
    </td>
  </tr>`;
    myTmpNode.insertAdjacentHTML('beforeend', myCardRow);
    let myNode = myTmpNode.querySelector('tr');
    return myNode;
  }

  function renderCart(Arr) { // рендер всей корзины
    let totalPrice = 0;
    Arr.forEach((item) => {
      totalPrice += item.totalItemPrice;
      myHTMLFragment.append(renderItem(item));
      });
    myHTMLFragment.append(renderFooter(totalPrice));
    myProductCartHeader.parentElement.append(myHTMLFragment);
  }

  renderCart(myCard);

  const myPlusBtn = selectElements('.field-num__btn-plus'); //все кнопки +
  const myMinusBtn = selectElements('.field-num__btn-minus'); // все кнопки –
  const myQtyFields = selectElements('.field-num__input'); // все поля кол-ва одного товара
  const myPriceFields = selectElements('.cart__item-price'); // все поля цены
  let myHeaderString = document.querySelector('.cart__title'); //поле кол-ва товаров в корзине (заголовок)

  myHeaderString.textContent = `В корзине ${calcTotalQty(myCard)} товара`;

  function changePlusBtn(elem, ind) { // ф-ция нажатия на кнопку +
    myQtyFields[ind].value = ++myCard[ind].qty;
    myCard[ind].totalItemPrice = myCard[ind].qty * myCard[ind].price;
    myPriceFields[ind].textContent = convRUB(myCard[ind].totalItemPrice);
  }

  function changeMinusBtn(elem, ind) { // ф-ция нажатия на кнопку –
    if (myQtyFields[ind].value > 1) {
      myQtyFields[ind].value = --myCard[ind].qty;
      myCard[ind].totalItemPrice = myCard[ind].qty * myCard[ind].price;
      myPriceFields[ind].textContent = convRUB(myCard[ind].totalItemPrice);
    }
  }

  function changeQtyField() { // ф-ция изменения текстового поля кол-ва товара

  }

  myPlusBtn.forEach((item, index) => { item.addEventListener('click', function() {changePlusBtn(item, index)}) });
  myMinusBtn.forEach((item, index) => { item.addEventListener('click', function() {changeMinusBtn(item, index)}) });
  myQtyFields.forEach((item, index) => { item.addEventListener('onchange', function() {}) });


  // function selectElem(item, ) {
  //   return item.querySelector(item);
  // }

  // function readCardItem(item) {
  //   const myItem = {
  //     name:'',
  //     descr:'',
  //     totalItemPrice: '',
  //     price: '',
  //     qty:'',
  //     img:'',
  //   }
  //   myItem.name = item.querySelector('.cart__item-name').textContent;
  //   myItem.totalItemPrice = parseInt((item.querySelector('.cart__item-price').textContent).replace(/\D+/g,""));
  //   myItem.qty = parseInt(item.querySelector('.field-num__input').value);
  //   myItem.price = +myItem.totalItemPrice / +myItem.qty;
  //   // myItem.img = item.querySelector('.cart__item-name').textContent;
  //   return myItem;
  // }
  // selectElements('.cart__product').forEach((item) => {
  //   myCard.push(readCardItem(item));
  // });


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
