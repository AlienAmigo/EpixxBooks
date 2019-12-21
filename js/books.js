// ОТКРЫТИЕ-ЗАКРЫТИЕ МЕНЮ ФИЛЬТРОВ
let myFilters = document.querySelector('#filters');
let myFiltersTrigger = document.querySelector('#filters-trigger');
if (myFilters && myFiltersTrigger) {
  myFiltersTrigger.addEventListener('click', function() {
    myFilters.classList.toggle('filters--open');
  });
}


// ОТКРЫТИЕ-ЗАКРЫТИЕ МОДАЛКИ
let myModal = document.querySelector('#modal-book-view');
let myModalWindow = document.querySelector('.modal__dialog');
let myModalClose = document.querySelector('.modal__close');

function openModal(item) {
  myModal.classList.add('modal--open');
}

function closeModal() {
  myModal.classList.remove('modal--open');
}

if (myModalWindow) {
  myModalWindow.addEventListener('click', function(ev) {
    ev.stopPropagation();
  });
}

if (myModal && myModalClose) {
  myModal.addEventListener('click', closeModal );
  myModalClose.addEventListener('click', closeModal );
}

// РЕНДЕР КНИГ
let myCatalog = document.querySelector('.catalog__books-list');
let myBookTmp = document.querySelector('.tmp-book-card');


function renderBookItem(item, index) {
  let myTmpNode = myBookTmp.content.cloneNode(true);
  // let
  // myTmpNode.querySelector()
  myTmpNode.querySelector('.card__img').src = `/img/books/${item["uri"]}.jpg`;
  myTmpNode.querySelector('.card__img').alt = item.name;
  myTmpNode.querySelector('.card__title').textContent = item.name;
  myTmpNode.querySelector('.cart__item-price').textContent = convRUB(item.price);
  myTmpNode.addEventListener('click', showBookModal);
  // myTmpNode.querySelector('.field-num__input').value = item.qty;
  return myTmpNode;
}

function renderBooks() {
  books.forEach( (item, index, obj) => {
    myCatalog.appendChild(renderBookItem(item, index));
  });

}