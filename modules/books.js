const  funcBooks = () => {

  // РАБОТА С КОРЗИНОЙ
  let cart = [];

  if (localStorage.getItem('my-cart')) {
    cart = JSON.parse(localStorage.getItem('my-cart'));
  }

  let cartFlag = document.querySelector('.page-header__cart-num');

  const showCartFlag = (cart) => {
    let cartFlag = document.querySelector('.page-header__cart-num');
    let sum = 0;
    if (cart.length) {
      cart.forEach(item => {
          sum += item.qty;
      });
    }
    cartFlag.textContent = sum;
  };

  showCartFlag(cart);
  const clearCart = (cart) => {
    cart = [];
    localStorage.clear('my-cart');
    showCartFlag(cart);
  };

  const getCart = (cart) => {
    cart = JSON.parse(localStorage.getItem('my-cart'))/* || []*/;
    showCartFlag(cart);
  };

  const setCart = (cart) => {
    localStorage.setItem('my-cart', JSON.stringify(cart))
    // localStorage.removeItem()
    // localStorage.clear()
    showCartFlag(cart);
  };

  const addBook = (id) => {
    (async () => {
      await fetch(url)
        .then( response => {
           return response.json()
         })
        .then( json => {
          const book = json.filter( (item) => {
            return (item.uri == id);
          });

          const index = cart.findIndex( (item) => {
            return (item.uri === id);
          });

          if (index === -1) {
            cart.push({...book[0], qty: 1});
          }
          else {
            cart[index].qty += 1;
          }
          setCart(cart);
          showCartFlag(cart);
        })
        .catch (e => {
          console.log(e)
        });
    })();
  }


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
    return myTmpNode;
  }

  const catalog = document.querySelector('[data-catalog]');
  if (catalog) {
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
        addBook(id);
      }
    })
  }

  const slider = document.querySelector('.popular__slider');
  if (slider) {
    slider.addEventListener('click', e => {
      const { target } = e;
      const card = target.closest('.card');
      const id = card.dataset.id
      const button = card.querySelector('.card__buy');
      const button_span = card.querySelector('.card__buy span');

      console.log(target);

      if ( (card) && target != button && target != button_span) {
        openModal(id);
      } else if (card) {
        addBook(id);
      }
    })
  }


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

  if (myCatalog) {
    renderBooks();
  }

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
        const btnBuy = myModal.querySelector('.btn--price');
        btnBuy.innerHTML = convRUB(card.price) + `                      <span class="btn__sm-text">
                        <svg class="btn__icon" width="14" height="14">
                          <use xlink:href="#plus"></use>
                        </svg>
                        <span>В корзину</span>`;
        btnBuy.addEventListener('click', function() {
          addBook(item);
        });
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
