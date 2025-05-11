        // DOM Elements
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const cartIcon = document.getElementById('cart-icon');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCart = document.querySelector('.close-cart');
        const overlay = document.querySelector('.overlay');
        const themeToggle = document.querySelector('.theme-toggle');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        const quantityMinusBtns = document.querySelectorAll('.quantity-minus');
        const quantityPlusBtns = document.querySelectorAll('.quantity-plus');
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const checkoutBtn = document.querySelector('.checkout-btn');
        const newsletterForm = document.querySelector('.newsletter-form');

        // Cart Array
        let cart = [];

        // Event Listeners
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cart Toggle
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Testimonial Slider
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots and slides
                testimonialDots.forEach(d => d.classList.remove('active'));
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                
                // Add active class to current dot and slide
                dot.classList.add('active');
                testimonialSlides[index].classList.add('active');
            });
        });

        // Auto slide testimonials
        let currentSlide = 0;
        function autoSlideTestimonials() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            
            // Remove active class from all dots and slides
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to current dot and slide
            testimonialDots[currentSlide].classList.add('active');
            testimonialSlides[currentSlide].classList.add('active');
        }
        
        // Set interval for auto sliding (every 5 seconds)
        setInterval(autoSlideTestimonials, 5000);

        // Product Filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                productItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Quantity Controls
        quantityMinusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.nextElementSibling;
                let value = parseInt(input.value);
                if (value > 1) {
                    value--;
                }
                input.value = value;
            });
        });

        quantityPlusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                let value = parseInt(input.value);
                value++;
                input.value = value;
            });
        });

        // Add to Cart Functionality
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const productItem = btn.closest('.product-item');
                const productImage = productItem.querySelector('.product-image img').src;
                const productName = productItem.querySelector('h5').textContent;
                const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('$', ''));
                const productQuantity = parseInt(productItem.querySelector('.quantity-input').value);
                
                // Check if product already exists in cart
                const existingItemIndex = cart.findIndex(item => item.name === productName);
                
                if (existingItemIndex > -1) {
                    // Update quantity if product already in cart
                    cart[existingItemIndex].quantity += productQuantity;
                } else {
                    // Add new item to cart
                    cart.push({
                        image: productImage,
                        name: productName,
                        price: productPrice,
                        quantity: productQuantity
                    });
                }
                
                // Update cart UI
                updateCart();
                
                // Show cart sidebar
                cartSidebar.classList.add('open');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Update Cart UI
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                        <a href="#products" class="btn">Start Shopping</a>
                    </div>
                `;
            } else {
                let cartHTML = '';
                cart.forEach((item, index) => {
                    cartHTML += `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <h4 class="cart-item-title">${item.name}</h4>
                                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                                <div class="cart-item-quantity">
                                    <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                                    <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                                    <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                                    <button class="remove-item" data-index="${index}">Remove</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                cartItemsContainer.innerHTML = cartHTML;
                
                // Add event listeners to cart quantity buttons
                document.querySelectorAll('.cart-quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = btn.getAttribute('data-index');
                        if (cart[index].quantity > 1) {
                            cart[index].quantity--;
                            updateCart();
                        }
                    });
                });
                
                document.querySelectorAll('.cart-quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = btn.getAttribute('data-index');
                        cart[index].quantity++;
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.cart-quantity-input').forEach(input => {
                    input.addEventListener('change', () => {
                        const index = input.getAttribute('data-index');
                        const value = parseInt(input.value);
                        if (value >= 1) {
                            cart[index].quantity = value;
                            updateCart();
                        }
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = btn.getAttribute('data-index');
                        cart.splice(index, 1);
                        updateCart();
                    });
                });
            }
            
            // Update cart total
            const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        }

        // Checkout Button
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Thank you for your order! Your whiskey will be on its way soon.');
                cart = [];
                updateCart();
                cartSidebar.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Newsletter Form
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}! You'll receive our latest updates and exclusive offers.`);
                newsletterForm.reset();
            }
        });

        // Initialize cart UI
        updateCart();