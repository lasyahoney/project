let cart = [];
let cartButton = document.getElementById('cart-button');
let cartModal = document.getElementById('cart-modal');
let closeCartButton = document.getElementById('close-cart-button');
let checkoutButton = document.getElementById('checkout-button');
let cartItemsList = document.getElementById('cart-items');
let totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        let productId = e.target.getAttribute('data-product');
        let productName = e.target.getAttribute('data-name');
        let productPrice = parseFloat(e.target.getAttribute('data-price'));

        addToCart(productId, productName, productPrice);
    });
});

cartButton.addEventListener('click', () => {
    showCart();
});

closeCartButton.addEventListener('click', () => {
    closeCart();
});

checkoutButton.addEventListener('click', () => {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    closeCart();
});

function addToCart(id, name, price) {
    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartButton.textContent = `Cart (${cart.length})`;
    renderCartItems();
    calculateTotal();
}

function renderCartItems() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsList.appendChild(li);
    });
}

function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

function showCart() {
    cartModal.style.display = 'flex';
}

function closeCart() {
    cartModal.style.display = 'none';
}
