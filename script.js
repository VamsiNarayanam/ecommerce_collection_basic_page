const loadBtn = document.getElementById('loadBtn');
const sortSelect = document.getElementById('sortSelect');
const productsContainer = document.getElementById('productsContainer');
const emptyState = document.getElementById('emptyState');
const productCount = document.getElementById('productCount');

let productsData = [];

loadBtn.addEventListener('click', fetchProducts);
sortSelect.addEventListener('change', sortAndRender);

async function fetchProducts() {
  emptyState.style.display = 'none';
  productsContainer.innerHTML = '';
  try {
    const res = await fetch('https://interveiw-mock-api.vercel.app/api/getProducts');
    const data = await res.json();
    productsData = data.data;
    productCount.textContent = `${productsData.length} Products`;
    renderProducts(productsData);
  } catch (err) {
    emptyState.querySelector('h2').textContent = 'Failed to load products';
    emptyState.querySelector('p').textContent = err.message;
    emptyState.style.display = 'block';
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach((item, index) => {
    const product = item.product;
    const price = product.variants[0]?.price || 'N/A';
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image?.src || ''}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">Rs. ${price}</p>
      <button>ADD TO CART</button>
    `;
    productsContainer.appendChild(card);
    setTimeout(() => card.classList.add('show'), index * 100);
  });
}

function sortAndRender() {
  let sorted = [...productsData];
  if (sortSelect.value === 'asc') {
    sorted.sort((a, b) => parseFloat(a.product.variants[0].price) - parseFloat(b.product.variants[0].price));
  } else if (sortSelect.value === 'desc') {
    sorted.sort((a, b) => parseFloat(b.product.variants[0].price) - parseFloat(a.product.variants[0].price));
  }
  renderProducts(sorted);
}
