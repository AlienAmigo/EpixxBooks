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
    wrongName: 'Нужно ввести корректное имя',
    wrongPhone: '',
    wrongEmail: '',
  };


  // Управляющие эл-ты
  let myProductCartTable = document.querySelector('.cart__table');
  let myPlusBtn = selectElements('.field-num__btn-plus'); //все кнопки +
  let myMinusBtn = selectElements('.field-num__btn-minus'); // все кнопки –
  let myDelBnt = selectElements('.cart__product-del-btn'); // все кнопки X (удаления товара из корзины)
  let myQtyFields = selectElements('.field-num__input'); // все поля кол-ва одного товара
  let myPriceFields = selectElements('.cart__item-price'); // все поля цены
  let myTotalPriceField = document.querySelector('.cart__products-price-num'); // поле суммарной цены заказа
  let myClearBtn = document.querySelector('.cart__clear-btn'); // кнопка очистки корзины
  if (myClearBtn) { myClearBtn.addEventListener('click', clearCard); };

  let myFormFirstName = document.querySelector('input[name="firstname"]'); // поле имени
  let myFormLastName = document.querySelector('input[name="lastname"]'); // поле фамилии
  let myFormPhone = document.querySelector('input[name="phone"]'); // поле телефона
  let myFormMail = document.querySelector('input[type="email"]'); // поле email

  // myFormPhone.addEventListener('change', function() { checkFormField(myFormPhone, myRegEx.phone, myFieldCheckedStyle, myMessages.wrongPhone); });


  // let PromoCode = 10%;
  let myTotalPrice = 0; // Цена за все товары в корзине с учетом скидки промо-кода 

  // ф-ция вызова popup'а (пока через alert)
  function showAlert(message) {
    alert(message);
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
    myQtyFields.forEach( (item, index) => { item.addEventListener('change', function() { changeQty(index, item.value) }) });
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
    if ((newQty >= 1) && (newQty <= 10) && (newQty != '-0')) {
      myQtyFields[ind].value = +newQty;
      myCard[ind].qty = +newQty;
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

  function clearCard() {
    for (i = myCard.length-1; i >= 0; i--) { myCard.splice(i, 1);}
    // myCard.forEach( (item, index, arr) => { arr.splice(index, 1); });
    renderCart(myCard);
  }
});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
