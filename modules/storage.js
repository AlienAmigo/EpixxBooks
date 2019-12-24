// КОРЗИНА
let cart = [];

const getCart = (cart) => {
  cart = JSON.parse(localStorage.getItem('my-cart')) || [];
  console.log(cart);
};

const setCart = (cart) => {
  localStorage.setItem('my-cart', JSON.stringify(cart))
  // localStorage.removeItem()
  // localStorage.clear()
  console.log(cart);
};


const printData = (data) => {
  const display = document.querySelector('#display');

  let prettyData ='';
  data.forEach( (item) => {
    prettyData += `
  <article data-id = ${item['uri']}>
    <h3>${item['name']}</h3>
    <p>${item['price']}</p>
    <button>Добавить в корзину</button>
  </article>
`;
});

  display.innerHTML = `<div>${prettyData}</div>`;

  // навешиваем слушателей на display
  display.addEventListener('click', e => {
    const { target } = e;

    const card = target.closest('[data-id]');
    const id = card.dataset.id;
    const book = getBook(data, id);
    // showModal(book);

    cart.push(book);
    setCart(cart);
  });
}

const getBody = () => {
  const data = {
      id: 747474,
      body: 'bar',
      userId: 1
    };
    return JSON.stringify(data);
}

const showModal = (book) => {
  const modal = document.querySelector('#modal');
  modal.innerHTML = `
  <h2>${book['name']}</h2>
  <p>${book['price']}</p>
  `;
  modal.classList.add('open');
};

const getBook = (data, id) => {
  const book = data.find( item => {
    return item.uri == id;
  });
  // console.log(book);
  // showModal(book);
};

const getData = () => {
  const url = '/data/data.json';
  // const url = 'https://jsonplaceholder.typicode.com/posts';

  fetch(url)
  .then(response => {
    return response.json();
  })
  .then(json => {
    loader.style.display = 'none';
    console.log(json);
    printData(json);
  })
  .catch(e => {
    console.log(e);
  })


  loader.style.display = 'block';

  const body = getBody();
  // xhr.send(body);
}


const app = document.querySelector('#app');
const btn = document.querySelector('.button');
const loader = document.querySelector('.loader');
btn.addEventListener('click', getData);

getCart();


