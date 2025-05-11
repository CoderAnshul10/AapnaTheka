// Product Data
const products = [
    {
        id: 1,
        name: "Budweiser Select",
        price: 10,
        image: "Select.jpg",
        category: "premium",
        description: "A smooth, light-bodied lager with a clean taste and crisp finish. Brewed with the finest barley malt and a blend of premium hop varieties.",
        alcohol: "4.3%",
        origin: "United States",
        type: "Lager"
    },
    {
        id: 2,
        name: "Heineken Silver",
        price: 12,
        image: "Silver.jpg",
        category: "premium",
        description: "A refreshing, easy-to-drink beer with a well-balanced taste and subtle fruity notes. Brewed with pure ingredients and Heineken's signature A-yeast.",
        alcohol: "4.0%",
        origin: "Netherlands",
        type: "Lager"
    },
    {
        id: 3,
        name: "Budweiser Zero",
        price: 10,
        image: "Zero.jpg",
        category: "light",
        description: "A non-alcoholic brew with the same refreshing, full-flavored taste expected of Budweiser with zero alcohol and only 50 calories.",
        alcohol: "0.0%",
        origin: "United States",
        type: "Non-Alcoholic"
    },
    {
        id: 4,
        name: "Tuborg Strong",
        price: 10,
        image: "Strong1.jpg",
        category: "strong",
        description: "A strong, full-bodied beer with a distinctive taste and higher alcohol content. Perfect for those who prefer a more robust beer experience.",
        alcohol: "8.0%",
        origin: "Denmark",
        type: "Strong Lager"
    },
    {
        id: 5,
        name: "Kingfisher Premium",
        price: 10,
        image: "Premium.jpg",
        category: "premium",
        description: "India's most popular beer, known for its smooth taste and crisp flavor. Perfectly balanced with a clean finish.",
        alcohol: "4.8%",
        origin: "India",
        type: "Lager"
    },
    {
        id: 6,
        name: "Budweiser Supreme",
        price: 10,
        image: "Supreme.jpg",
        category: "premium",
        description: "A premium beer crafted with the finest ingredients for a rich, full-bodied taste experience. Aged on Beechwood for exceptional smoothness.",
        alcohol: "5.0%",
        origin: "United States",
        type: "Premium Lager"
    },
    {
        id: 7,
        name: "Kingfisher Ultra",
        price: 10,
        image: "Ultra.jpg",
        category: "premium",
        description: "A super premium mild beer with a distinctive taste and smooth finish. Brewed with the finest malted barley and hops.",
        alcohol: "5.0%",
        origin: "India",
        type: "Premium Lager"
    },
    {
        id: 8,
        name: "Ultra Max",
        price: 10,
        image: "UltraMax.jpg",
        category: "strong",
        description: "A strong beer with a bold character and rich flavor profile. Delivers a powerful taste experience for those who enjoy stronger beers.",
        alcohol: "7.5%",
        origin: "India",
        type: "Strong Lager"
    },
    {
        id: 9,
        name: "Kingfisher Strong",
        price: 10,
        image: "Strong.jpg",
        category: "strong",
        description: "A strong, full-bodied beer with a distinctive taste and higher alcohol content. India's favorite strong beer.",
        alcohol: "8.0%",
        origin: "India",
        type: "Strong Lager"
    },
    {
        id: 10,
        name: "Carlsberg",
        price: 10,
        image: "Carlsberg.jpg",
        category: "premium",
        description: "A premium quality lager with a refreshing, clean taste and a hint of bitterness. Brewed with quality ingredients for a balanced flavor.",
        alcohol: "5.0%",
        origin: "Denmark",
        type: "Pilsner"
    },
    {
        id: 11,
        name: "Canon 1000",
        price: 10,
        image: "Canon1000.jpg",
        category: "strong",
        description: "A strong beer with a robust flavor and high alcohol content. Delivers a powerful taste experience for those seeking intensity.",
        alcohol: "8.0%",
        origin: "India",
        type: "Strong Lager"
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const backToTop = document.getElementById('backToTop');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const darkModeToggle = document.getElementById('darkModeToggle');

// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all');
    updateCart();
    checkDarkMode();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
});

// Display Products
function displayProducts(category) {
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="quick-view" data-id="${product.id}">Quick View</div>
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <div class="quantity">
                        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="99" data-id="${product.id}">
                        <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to the newly created elements
    addProductEventListeners();
}

// Add event listeners to product elements
function addProductEventListeners() {
    // Quick View buttons
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            openQuickView(productId);
        });
    });
    
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
        });
    });
    
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value);
            if (quantity < 99) {
                quantity++;
                quantityInput.value = quantity;
            }
        });
    });
    
    // Quantity input validation
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            let quantity = parseInt(input.value);
            if (isNaN(quantity) || quantity < 1) {
                input.value = 1;
            } else if (quantity > 99) {
                input.value = 99;
            }
        });
    });
}

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        displayProducts(category);
    });
});

// Add to Cart
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Show success message
    showToast(`${quantity} ${product.name} added to cart!`);
    
    // Update cart
    updateCart();
    saveCart();
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        // Empty cart message
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <button class="continue-shopping" id="continueShopping">Continue Shopping</button>
            </div>
        `;
        cartTotal.innerHTML = '';
        
        // Add event listener to continue shopping button
        const continueShopping = document.getElementById('continueShopping');
        if (continueShopping) {
            continueShopping.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
            });
        }
    } else {
        // Display cart items
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="cart-quantity-btn decrease-cart" data-id="${item.id}">-</button>
                        <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
                        <button class="cart-quantity-btn increase-cart" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
        const total = subtotal + tax + shipping;
        
        // Display cart total
        cartTotal.innerHTML = `
            <div class="cart-total-row">
                <span class="cart-total-label">Subtotal:</span>
                <span class="cart-total-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-total-row">
                <span class="cart-total-label">Tax (10%):</span>
                <span class="cart-total-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="cart-total-row">
                <span class="cart-total-label">Shipping:</span>
                <span class="cart-total-value">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="cart-total-row">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-value cart-total-final">$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
        `;
        
        // Add event listeners to cart items
        addCartEventListeners();
    }
}

// Add event listeners to cart elements
function addCartEventListeners() {
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            updateCartItemQuantity(productId, -1);
        });
    });
    
    // Increase quantity buttons
    document.querySelectorAll('.increase-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // Quantity input changes
    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            const productId = parseInt(input.getAttribute('data-id'));
            const quantity = parseInt(input.value);
            
            if (isNaN(quantity) || quantity < 1) {
                input.value = 1;
                updateCartItemQuantity(productId, 0, 1);
            } else if (quantity > 99) {
                input.value = 99;
                updateCartItemQuantity(productId, 0, 99);
            } else {
                updateCartItemQuantity(productId, 0, quantity);
            }
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            removeCartItem(productId);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Thank you for your order! This is a demo, so no actual checkout will occur.');
            cart = [];
            updateCart();
            saveCart();
            cartSidebar.classList.remove('active');
        });
    }
}

// Update cart item quantity
function updateCartItemQuantity(productId, change, newQuantity = null) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (newQuantity !== null) {
            // Set to specific quantity
            cart[itemIndex].quantity = newQuantity;
        } else {
            // Increment/decrement quantity
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity is 0
            if (cart[itemIndex].quantity < 1) {
                removeCartItem(productId);
                return;
            }
            
            // Cap at 99
            if (cart[itemIndex].quantity > 99) {
                cart[itemIndex].quantity = 99;
            }
        }
        
        updateCart();
        saveCart();
    }
}

// Remove item from cart
function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Open Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-content">
            <h2 class="modal-product-title">${product.name}</h2>
            <div class="modal-product-price">$${product.price}</div>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-meta">
                <div class="meta-item">
                    <span class="meta-label">Alcohol Content:</span>
                    <span>${product.alcohol}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Origin:</span>
                    <span>${product.origin}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Type:</span>
                    <span>${product.type}</span>
                </div>
            </div>
            <div class="modal-product-actions">
                <div class="modal-quantity">
                    <button class="quantity-btn decrease" id="modalDecrease">-</button>
                    <input type="number" class="quantity-input" id="modalQuantity" value="1" min="1" max="99">
                    <button class="quantity-btn increase" id="modalIncrease">+</button>
                </div>
                <button class="modal-add-to-cart" id="modalAddToCart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    
    // Add event listeners to modal elements
    const modalDecrease = document.getElementById('modalDecrease');
    const modalIncrease = document.getElementById('modalIncrease');
    const modalQuantity = document.getElementById('modalQuantity');
    const modalAddToCart = document.getElementById('modalAddToCart');
    
    modalDecrease.addEventListener('click', () => {
        let quantity = parseInt(modalQuantity.value);
        if (quantity > 1) {
            quantity--;
            modalQuantity.value = quantity;
        }
    });
    
    modalIncrease.addEventListener('click', () => {
        let quantity = parseInt(modalQuantity.value);
        if (quantity < 99) {
            quantity++;
            modalQuantity.value = quantity;
        }
    });
    
    modalQuantity.addEventListener('change', () => {
        let quantity = parseInt(modalQuantity.value);
        if (isNaN(quantity) || quantity < 1) {
            modalQuantity.value = 1;
        } else if (quantity > 99) {
            modalQuantity.value = 99;
        }
    });
    
    modalAddToCart.addEventListener('click', () => {
        const productId = parseInt(modalAddToCart.getAttribute('data-id'));
        const quantity = parseInt(modalQuantity.value);
        addToCart(productId, quantity);
        modalOverlay.classList.remove('active');
    });
}

// Show Toast Message
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.zIndex = '1000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Toggle Cart Sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Close Modal
closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check Dark Mode Preference
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').className = 'fas fa-sun';
    }
}