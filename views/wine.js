// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.getElementById('cart-icon');
const cartOverlay = document.getElementById('cart-overlay');
const cart = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.querySelector('.products-grid');

// Cart array to store items
let cartItems = [];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cart Open/Close
cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('show');
    cart.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
    cart.classList.remove('show');
});

cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        cartOverlay.classList.remove('show');
        cart.classList.remove('show');
    }
});

// Quantity Buttons
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value);
        
        if (btn.classList.contains('decrease')) {
            value = value > 1 ? value - 1 : 1;
        } else {
            value = value < 99 ? value + 1 : 99;
        }
        
        input.value = value;
    });
});

// Add to Cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const image = btn.getAttribute('data-image');
        const quantity = parseInt(btn.parentElement.querySelector('.quantity-input').value);
        
        addToCart(id, name, price, image, quantity);
        updateCart();
        
        // Show cart after adding item
        cartOverlay.classList.add('show');
        cart.classList.add('show');
    });
});

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const products = document.querySelectorAll('.wine-card');
        
        products.forEach(product => {
            if (filter === 'all') {
                product.style.display = 'block';
            } else {
                const categories = product.getAttribute('data-category');
                if (categories && categories.includes(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    });
});

// Add to Cart Function
function addToCart(id, name, price, image, quantity) {
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            id,
            name,
            price,
            image,
            quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Update Cart UI
function updateCart() {
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    // Update cart count
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // If cart is empty
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-outline" onclick="closeCart()">Continue Shopping</a>
            </div>
        `;
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    
    // Add items to cart UI
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="cart-quantity-btn decrease-cart" data-id="${item.id}">-</button>
                    <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
                    <button class="cart-quantity-btn increase-cart" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Calculate total price
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart item buttons
    addCartItemEventListeners();
}

// Add event listeners to cart item buttons
function addCartItemEventListeners() {
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            removeFromCart(id);
        });
    });
    
    // Quantity buttons in cart
    const decreaseButtons = document.querySelectorAll('.decrease-cart');
    const increaseButtons = document.querySelectorAll('.increase-cart');
    const quantityInputs = document.querySelectorAll('.cart-quantity-input');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            changeCartQuantity(id, 'decrease');
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            changeCartQuantity(id, 'increase');
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const id = input.getAttribute('data-id');
            const value = parseInt(input.value);
            updateCartItemQuantity(id, value);
        });
    });
}

// Remove item from cart
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
}

// Change cart item quantity
function changeCartQuantity(id, action) {
    const item = cartItems.find(item => item.id === id);
    
    if (item) {
        if (action === 'decrease') {
            item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
        } else {
            item.quantity = item.quantity < 99 ? item.quantity + 1 : 99;
        }
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }
}

// Update cart item quantity directly
function updateCartItemQuantity(id, quantity) {
    const item = cartItems.find(item => item.id === id);
    
    if (item) {
        item.quantity = quantity < 1 ? 1 : quantity > 99 ? 99 : quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }
}

// Close cart function for continue shopping button
function closeCart() {
    cartOverlay.classList.remove('show');
    cart.classList.remove('show');
}

// Load cart from localStorage on page load
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        updateCart();
    }
}

// Initialize
loadCart();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Close cart if open
            cartOverlay.classList.remove('show');
            cart.classList.remove('show');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});