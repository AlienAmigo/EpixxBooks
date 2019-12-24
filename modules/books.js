const  funcBooks = () => {

  // ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА
  const url = '/data/data.json';

  let myData = null;
  let myDataLength = 76;
  let myPageNum = 2; // номер страницы с карточками (пока так)
  let myCardsNum = 8 // кол-во карточек на одной странице

  // РЕНДЕР КНИГ
  let myCatalog = document.querySelector('.catalog__books-list');
  let myBookTmp = document.querySelector('.tmp-book-card');

  function renderBookItem(item) {
    let myTmpNode = myBookTmp.content.cloneNode(true);
    if (!item.hasOwnProperty('new') ||
        ( item.new != true)) {
      myTmpNode.querySelector('.card__new').parentElement.removeChild(myTmpNode.querySelector('.card__new'));
    }
    myTmpNode.querySelector('.card').dataset.id = `${item["uri"]}`;
    myTmpNode.querySelector('.card__inner').href = `index.html#${item["uri"]}`;
    myTmpNode.querySelector('.card__img').src = `/img/books/${item["uri"]}.jpg`;
    myTmpNode.querySelector('.card__img').alt = item.name;
    myTmpNode.querySelector('.card__title').textContent = item.name;
    myTmpNode.querySelector('.card__price').textContent = convRUB(item.price);
    // myTmpNode.addEventListener('click', showBookModal);
    return myTmpNode;
  }

  const catalog = document.querySelector('[data-catalog]');

  catalog.addEventListener('click', e => {
    const { target } = e;
    const card = target.closest('.card');
    const id = card.dataset.id
    const button = card.querySelector('.card__buy');
    const button_span = card.querySelector('.card__buy span');

    console.log(target);

    if ( (card) && target != button && target != button_span) {
      openModal(id);
    } else if (card) {
      addCart(id);
    }
  })

  function renderBooks() {
    for (let i = 0; i < myCardsNum; i++) {
      (async () => {
        await fetch(url)
         .then( response => {
             return response.json()
           })
           .then( json => {
            let item = (myCardsNum * (myPageNum - 1))  + i;
              if (item < json.length - 1) {
                myCatalog.appendChild( renderBookItem(json[item]));
              }
           })
           .catch (e => {
             console.log(e)
           });}) ()
    }
  }

  renderBooks();


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
    (async () => {
      await fetch(url)
        .then( response => {
          return response.json()
        })
        .then( json => {
          let card = json.find(elem => {
            return (elem.uri == item);
          });
        myModal.querySelector('.product__img-wrap img').src = `/img/books/${card["uri"]}.jpg`;
        myModal.querySelector('.product__img-wrap img').alt = card.name;
        myModal.querySelector('.product__title').textContent = card.name;
        // myModal.querySelector('#modal-author').textContent = card.author;
        myModal.querySelector('.product__descr').querySelector('p').textContent = card.desc;
        myModal.querySelector('.btn--price').innerHTML = convRUB(card.price) + `                      <span class="btn__sm-text">
                        <svg class="btn__icon" width="14" height="14">
                          <use xlink:href="#plus"></use>
                        </svg>
                        <span>В корзину</span>`;
        myModal.classList.add('modal--open');
      })
        .catch (e => {
           console.log(e)
        });
      })();
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

}
export default funcBooks;
