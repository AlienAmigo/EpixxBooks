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

    console.log(card);

    if ( (card) && target !=) {
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
                console.log(json[item].name);
                myCatalog.appendChild( renderBookItem(json[item]) );
              }
           })
           .catch (e => {
             console.log(e)
           });}) ()
    }
  }

  renderBooks();

//   async function getData(url) {
//     return await fetch(url)
//       .then( response => {
//         return response.json()
//       })
//       .then( json => {
//         // rez = json
//         console.log(json[4].name);
//         console.log(json[4].name);
//         return json;
//       })
//       .catch (e => {
//         console.log(e)
//       });
//       return json
//    }
// getData(url)

// async function getUserAsync(name) {
//   const url = `https://api.github.com/users/${name}`;

//   return await fetch(url)
//     .then(async (response) => {
//       return await response.json()
//     })
// }
//   const fn = async () => {
//     const data = await getUserAsync('sgkuksov');
//     console.log(data);
//     return data;
//   };

// console.log(fn());

  // let a = getUserAsync('sgkuksov');
  //     console.log(a)


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

}
export default funcBooks;
