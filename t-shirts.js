const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: './images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: './images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: './images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: './images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: './images/blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: './images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: './images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: './images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: './images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
];

const $container = document.getElementById('tshirt-container');

const buildTshirts = (tshirts) => {
  const html = list(tshirts);
  $container.innerHTML = html;
};

const list = (tshirts) => {
  return tshirts.map((tshirt, index) => {
    return `<div class="tshirt-item">
      <img src="${tshirt.image}" alt="${tshirt.title}" />
      <h2>${tshirt.title}</h2>
      <p class="price">$ ${tshirt.price.toFixed(2)}</p>
      <p class="stock ${tshirt.stock === 0 ? 'out-of-stock' : ''}">
        ${tshirt.stock === 0 ? 'Out of stock' : `${tshirt.stock} left!`}
      </p>
      ${tshirt.stock > 0 ? `
        <div class="purchase-controls">
          <select id="quantity-${index}" onchange="updateQuantity(${index}, this.value)">
            ${createOptions(tshirt.stock)}
          </select>
          <button onclick="buyTshirt(${index})">Buy</button>
        </div>
      ` : ''}
    </div>`;
  }).join('');
};

const createOptions = (stock) => {
  let options = '';
  for (let i = 1; i <= stock; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
};

const updateQuantity = (index, quantity) => {
  tshirts[index].quantity = parseInt(quantity);
};

const buyTshirt = (index) => {
  const tshirt = tshirts[index];
  if (tshirt.stock >= tshirt.quantity) {
    tshirt.stock -= tshirt.quantity;
    tshirt.quantity = 1;
    buildTshirts(tshirts);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  buildTshirts(tshirts);
});