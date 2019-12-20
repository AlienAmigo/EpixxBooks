

let myCatalog = document.querySelector('.catalog__books-list');
let myBookTmp = document.querySelector('.tmp-book-card');

function showBookModal(item) {

}

function renderBookItem(item, index) {
  let myTmpNode = myBookTmp.content.cloneNode(true);
  let
  myTmpNode.querySelector()
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