// App Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const closePrompt = document.getElementById('closePrompt');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installPrompt.style.display = 'block';
});

installButton.addEventListener('click', () => {
  installPrompt.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted install prompt');
    } else {
      console.log('User dismissed install prompt');
    }
    deferredPrompt = null;
  });
});

closePrompt.addEventListener('click', () => {
  installPrompt.style.display = 'none';
});

// Load Products
const productList = document.getElementById('productList');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 999, image: 'images/laptop.jpg' },
  { id: 2, name: 'T-Shirt', category: 'clothing', price: 20, image: 'images/t-shirt.jpg' },
  { id: 3, name: 'Watch', category: 'accessories', price: 50, image: 'images/watch.jpg' },
];

function renderProducts(filteredProducts) {
  productList.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const filteredProducts = products.filter(product =>
    (category === 'all' || product.category === category) &&
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

// Cart Functionality
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>$${item.price}</span>
    </div>
  `).join('');
}

// Checkout with PayPal
document.getElementById('checkout').addEventListener('click', () => {
  alert('Redirecting to PayPal...');
  // Implement PayPal integration here
});

// Initial Render
renderProducts(products);