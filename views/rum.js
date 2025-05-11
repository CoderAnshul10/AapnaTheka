document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const cartCount = document.querySelector('.cart-count');
    const toast = document.querySelector('.toast');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize
    updateCart();
    
    // Event Listeners
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    cartIcon.addEventListener('click', function() {
        cartModal.classList.add('open');
        overlay.classList.add('open');
    });
    
    closeCart.addEventListener('click', function() {
        cartModal.classList.remove('open');
        overlay.classList.remove('open');
    });
    
    overlay.addEventListener('click', function() {
        cartModal.classList.remove('open');
        overlay.classList.remove('open');
    });
    
    // Filter Products
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category').includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Quantity Buttons
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                value = value > 1 ? value - 1 : 1;
            } else {
                value++;
            }
            
            input.value = value;
        });
    });
    
    // Add to Cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            const quantity = parseInt(this.parentElement.parentElement.querySelector('.product-quantity').value);
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart
            updateCart();
            
            // Show toast
            showToast('Item added to cart!');
        });
    });
    
    // Newsletter Form
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if (email) {
            this.querySelector('input').value = '';
            showToast('Thank you for subscribing!');
        }
    });
    
    // Functions
    function updateCart() {
        // Clear cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="#products" class="btn">Shop Now</a>
                </div>
            `;
            totalAmount.textContent = '$0.00';
            cartCount.textContent = '0';
        } else {
            let total = 0;
            let count = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;
                
                cartItemsContainer.innerHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">
                                <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
                                <span class="cart-quantity">${item.quantity}</span>
                                <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
            
            totalAmount.textContent = `$${total.toFixed(2)}`;
            cartCount.textContent = count;
            
            // Add event listeners to cart item buttons
            const cartQuantityBtns = document.querySelectorAll('.cart-quantity-btn');
            const removeItemBtns = document.querySelectorAll('.remove-item');
            
            cartQuantityBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const item = cart.find(item => item.id === id);
                    
                    if (this.classList.contains('minus')) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        }
                    } else {
                        item.quantity++;
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });
            });
            
            removeItemBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== id);
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                    showToast('Item removed from cart!');
                });
            });
        }
    }
    
    function showToast(message) {
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                // Close cart if open
                cartModal.classList.remove('open');
                overlay.classList.remove('open');
            }
        });
    });
});