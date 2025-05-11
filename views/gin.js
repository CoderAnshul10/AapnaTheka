// Product Data
const products = [
    {
        id: 0,
        name: "Tanqueray No. Ten",
        category: "London Dry",
        price: 39.99,
        oldPrice: 45.99,
        image: "tanquerayno10citrusheartgrapefruitandrosemary.jpg",
        rating: 4.5,
        reviews: 42,
        description: "Tanqueray No. Ten is a premium small-batch gin named after the still number of its origin, Tiny Ten. Crafted with fresh citrus fruits and chamomile flowers, it offers a smooth, full-bodied flavor that's perfect for martinis and sophisticated cocktails.",
        features: ["Citrus-forward profile", "Smooth finish", "Perfect for martinis", "Award-winning taste"]
    },
    {
        id: 1,
        name: "Bombay Bramble",
        category: "Flavored",
        price: 34.99,
        image: "bombaybramble.jpg",
        rating: 4.0,
        reviews: 28,
        description: "Bombay Bramble is a bold and vibrant gin infused with natural flavors of blackberries and raspberries. This gin offers a perfect balance between the classic juniper notes and the rich fruitiness of fresh berries.",
        features: ["Natural berry infusion", "No added sugar", "Vibrant color", "Versatile for cocktails"]
    },
    {
        id: 2,
        name: "Bertha's Revenge",
        category: "Craft",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1609951651973-03b4c838b0d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 5.0,
        reviews: 19,
        description: "Bertha's Revenge is a unique Irish milk gin crafted using whey alcohol from local dairy farms. Named after Bertha, a famous Irish cow, this gin features a blend of locally foraged botanicals for a truly distinctive taste experience.",
        features: ["Milk-based spirit", "Locally foraged botanicals", "Small-batch production", "Sustainable practices"]
    },
    {
        id: 3,
        name: "Hendrick's Amazonia",
        category: "Limited Edition",
        price: 59.99,
        oldPrice: 65.99,
        image: "https://images.unsplash.com/photo-1613063070179-9b82fb797036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 4.5,
        reviews: 36,
        description: "Hendrick's Amazonia is a limited edition gin inspired by Master Distiller Lesley Gracie's adventures in the Amazon rainforest. This special release enhances the classic Hendrick's recipe with exotic botanicals for a lush, floral character.",
        features: ["Amazon-inspired botanicals", "Limited production", "Collectible bottle", "Floral and exotic notes"]
    },
    {
        id: 4,
        name: "Method and Madness",
        category: "Craft",
        price: 42.99,
        image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 4.0,
        reviews: 22,
        description: "Method and Madness Irish Micro Distilled Gin combines traditional Irish botanicals with exotic elements like black lemon and lavender. Created at Ireland's Micro Distillery, it represents the perfect balance between methodical craft and creative madness.",
        features: ["Irish botanicals", "Micro-distilled", "Unique flavor profile", "Artisanal production"]
    },
    {
        id: 5,
        name: "Tanqueray Citrus Heart",
        category: "Flavored",
        price: 37.99,
        image: "https://images.unsplash.com/photo-1620219365994-f451bdb5f689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 3.5,
        reviews: 17,
        description: "Tanqueray Citrus Heart combines the classic Tanqueray London Dry recipe with vibrant grapefruit and rosemary. This refreshing gin offers a perfect balance of citrus brightness and aromatic herbs for a modern twist on a classic.",
        features: ["Grapefruit-forward", "Aromatic rosemary", "Refreshing profile", "Perfect for summer cocktails"]
    },
    {
        id: 6,
        name: "The Botanist Islay Dry",
        category: "London Dry",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1609951651973-03b4c838b0d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 5.0,
        reviews: 31,
        description: "The Botanist Islay Dry Gin is a complex artisanal gin from the Scottish island of Islay. Distilled at the renowned Bruichladdich distillery, it features 22 hand-foraged local botanicals combined with classic gin ingredients for a truly unique expression of the island's terroir.",
        features: ["22 local botanicals", "Slow distillation", "Complex flavor profile", "Islay terroir"]
    },
    {
        id: 7,
        name: "Monkey 47 Schwarzwald",
        category: "Limited Edition",
        price: 69.99,
        oldPrice: 79.99,
        image: "https://images.unsplash.com/photo-1613063070179-9b82fb797036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        rating: 4.5,
        reviews: 45,
        description: "Monkey 47 Schwarzwald Dry Gin is an exceptional gin from Germany's Black Forest. Made with 47 botanicals and bottled at 47% ABV, this complex gin balances juniper with floral, fruity, and herbal notes for a truly sophisticated drinking experience.",
        features: ["47 botanicals", "Black Forest lingonberries", "Small batch production", "Complex and balanced"]
    }
];

// Cart functionality
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    }
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    showToast(`${product.name} added to cart!`);
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="cart-quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItems.appendChild(cartItemEl);
    });
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        renderCartItems();
        updateCartTotal();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    // Generate stars HTML
    let starsHtml = '';
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    // Generate features HTML
    let featuresHtml = '';
    product.features.forEach(feature => {
        featuresHtml += `<li><i class="fas fa-check"></i> ${feature}</li>`;
    });
    
    // Set modal content
    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-info">
            <div class="modal-category">${product.category}</div>
            <h2 class="modal-title">${product.name}</h2>
            <div class="modal-rating">
                <div class="stars">
                    ${starsHtml}
                </div>
                <span class="rating-count">(${product.reviews} reviews)</span>
            </div>
            <div class="modal-price">
                ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                $${product.price.toFixed(2)}
            </div>
            <p class="modal-description">${product.description}</p>
            
            <div class="modal-features">
                <h4>Key Features</h4>
                <ul class="features-list">
                    ${featuresHtml}
                </ul>
            </div>
            
            <div class="quantity-selector">
                <label>Quantity:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" id="decreaseQuantity">-</button>
                    <input type="number" class="quantity-input" id="productQuantity" value="1" min="1">
                    <button class="quantity-btn" id="increaseQuantity">+</button>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="addToCartFromModal(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-outline">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Setup quantity controls
    const quantityInput = document.getElementById('productQuantity');
    document.getElementById('decreaseQuantity').addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    document.getElementById('increaseQuantity').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    closeModal();
    showToast(`${quantity} ${product.name} added to cart!`);
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Filter products
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            overlay.style.display = 'block';
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            overlay.style.display = 'none';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Cart sidebar toggle
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        overlay.style.display = 'block';
    });
    
    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
    
    // Modal close
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', closeModal);
    
    // Toast close
    const toastClose = document.getElementById('toastClose');
    toastClose.addEventListener('click', () => {
        document.getElementById('toast').classList.remove('show');
    });
    
    // Overlay click
    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        cartSidebar.classList.remove('open');
        closeModal();
        overlay.style.display = 'none';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
    
    // Product filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProducts(button.dataset.filter);
        });
    });
    
    // Smooth scrolling for navigation links
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
                overlay.style.display = 'none';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});