// Product Data
const products = [
    {
        id: 1,
        name: "Absolute Vodka",
        price: 29.99,
        image: "absolutevodka.jpg",
        rating: 4.5,
        reviews: 128,
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Beluga",
        price: 49.99,
        image: "BELUGA.jpg",
        rating: 4.8,
        reviews: 96,
        badge: "Premium"
    },
    {
        id: 3,
        name: "Belvedere",
        price: 39.99,
        image: "belvedere.jpg",
        rating: 4.6,
        reviews: 112,
        badge: null
    },
    {
        id: 4,
        name: "Belvedere Lake Bartezek",
        price: 59.99,
        image: "belvedere-lake-bartezek.jpg",
        rating: 4.9,
        reviews: 74,
        badge: "Limited"
    },
    {
        id: 5,
        name: "Ciroc",
        price: 34.99,
        image: "CIROC.jpg",
        rating: 4.4,
        reviews: 103,
        badge: null
    },
    {
        id: 6,
        name: "Grey Goose",
        price: 44.99,
        image: "GREYGOOSE.jpg",
        rating: 4.7,
        reviews: 156,
        badge: "Popular"
    },
    {
        id: 7,
        name: "Ketel One",
        price: 32.99,
        image: "KETELONE.jpg",
        rating: 4.3,
        reviews: 89,
        badge: null
    },
    {
        id: 8,
        name: "Skyy Vodka",
        price: 24.99,
        image: "SKYYVODKA.jpg",
        rating: 4.2,
        reviews: 118,
        badge: "Value"
    },
    {
        id: 9,
        name: "Smirnoff",
        price: 19.99,
        image: "SMIRNOFF.jpg",
        rating: 4.0,
        reviews: 201,
        badge: "Classic"
    },
    {
        id: 10,
        name: "Stolichnaya",
        price: 27.99,
        image: "STOLICHNANYA.jpg",
        rating: 4.3,
        reviews: 95,
        badge: null
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTax = document.getElementById('cartTax');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Cart State
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    checkTheme();
    
    // Check for saved cart in localStorage
    const savedCart = localStorage.getItem('vodkaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
});

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        
        // Generate star rating HTML
        let starsHtml = '';
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='/placeholder.svg?height=220&width=280'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-details">
                <h5 class="product-title">${product.name}</h5>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    ${starsHtml}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="99" data-id="${product.id}">
                        <button class="quantity-btn increase" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // If no products match the search
    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-search">
                <i class="fas fa-search"></i>
                <p>No products found matching your search.</p>
                <button class="continue-shopping" id="clearSearch">Clear Search</button>
            </div>
        `;
        
        document.getElementById('clearSearch').addEventListener('click', () => {
            searchInput.value = '';
            renderProducts(products);
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.parentElement;
            const productId = parseInt(button.dataset.id);
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const quantity = parseInt(quantityInput.value);
            
            addToCart(productId, quantity);
        }
        
        // Quantity buttons
        if (e.target.classList.contains('decrease')) {
            const productId = parseInt(e.target.dataset.id);
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        }
        
        if (e.target.classList.contains('increase')) {
            const productId = parseInt(e.target.dataset.id);
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const currentValue = parseInt(input.value);
            if (currentValue < 99) {
                input.value = currentValue + 1;
            }
        }
        
        // Cart item quantity buttons
        if (e.target.classList.contains('cart-quantity-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            const isIncrease = e.target.classList.contains('cart-increase');
            
            updateCartItemQuantity(itemId, isIncrease);
        }
        
        // Remove from cart
        if (e.target.classList.contains('cart-item-remove')) {
            const itemId = parseInt(e.target.dataset.id);
            removeFromCart(itemId);
        }
    });
    
    // Cart toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Sort functionality
    sortSelect.addEventListener('change', handleSort);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Back to top
    window.addEventListener('scroll', handleScroll);
    backToTop.addEventListener('click', scrollToTop);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add to Cart
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Update quantity if already in cart
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
    
    // Save cart to localStorage
    localStorage.setItem('vodkaCart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

// Update Cart Item Quantity
function updateCartItemQuantity(itemId, isIncrease) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    if (isIncrease) {
        cart[itemIndex].quantity += 1;
    } else {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        }
    }
    
    // Save cart to localStorage
    localStorage.setItem('vodkaCart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
}

// Remove from Cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    // Save cart to localStorage
    localStorage.setItem('vodkaCart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    showToast(`${removedItem.name} removed from cart!`);
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="continue-shopping" id="continueShopping">Continue Shopping</button>
            </div>
        `;
        
        document.getElementById('continueShopping')?.addEventListener('click', toggleCart);
        
        // Hide summary
        document.getElementById('cartSummary').style.display = 'none';
    } else {
        let cartHTML = '';
        
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='/placeholder.svg?height=60&width=60'">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="cart-quantity-btn cart-decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-quantity-btn cart-increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        
        // Show and update summary
        document.getElementById('cartSummary').style.display = 'block';
        
        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTax.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Toggle Cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
}

// Show Toast
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle Search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
}

// Handle Sort
function handleSort() {
    const sortValue = sortSelect.value;
    let sortedProducts = [...products];
    
    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (featured)
            break;
    }
    
    renderProducts(sortedProducts);
}

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Check Theme
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Handle Scroll
function handleScroll() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').className = navLinks.classList.contains('active') 
        ? 'fas fa-times' 
        : 'fas fa-bars';
    
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}