// Mobile Navigation Toggle with full accessibility compliance
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Create overlay element for mobile menu
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

if (hamburger && nav && navList) {
    // Toggle mobile menu
    function toggleMenu() {
        const isOpen = navList.classList.contains('active');
        
        if (isOpen) {
            // Close menu
            navList.classList.remove('active');
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Move focus back to hamburger
            hamburger.focus();
        } else {
            // Open menu
            navList.classList.add('active');
            hamburger.classList.add('active');
            navOverlay.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
            
            // Move focus to first link in menu
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }
    }
    
    // Close menu function
    function closeMenu() {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Event listener for hamburger button
    hamburger.addEventListener('click', toggleMenu);
    
    // Event listener for hamburger button keyboard interaction
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
        
        // Add keyboard support for navigation links
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                hamburger.focus();
            }
        });
    });
    
    // Close mobile menu when clicking on overlay
    navOverlay.addEventListener('click', () => {
        closeMenu();
    });
    
    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navList.classList.contains('active')) {
            closeMenu();
            hamburger.focus();
        }
    });
    
    // Focus trapping within mobile menu
    function trapFocusInMenu() {
        const focusableElements = navList.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        navList.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab - move focus to last element if currently on first
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab - move focus to first element if currently on last
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    // Initialize focus trapping
    trapFocusInMenu();
}

// Enhanced Carousel Functionality with better mobile support
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryLinks = document.querySelectorAll('.sub-nav-list a');
    const productCards = document.querySelectorAll('.product-card');
    
    console.log('Category links found:', categoryLinks.length);
    console.log('Product cards found:', productCards.length);
    
    if (categoryLinks.length > 0 && productCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                console.log('Category link clicked:', this.getAttribute('data-category'));
                
                // Remove active class from all links
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get category
                const category = this.getAttribute('data-category');
                
                // Filter products
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Sorting functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productGrid = document.getElementById('productGrid');
            const products = Array.from(productGrid.children);
            
            products.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                
                switch(sortBy) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'newest':
                        // For demo purposes, we'll sort by product ID (higher IDs are newer)
                        const idA = parseInt(a.querySelector('.btn-add-to-cart').getAttribute('data-id'));
                        const idB = parseInt(b.querySelector('.btn-add-to-cart').getAttribute('data-id'));
                        return idB - idA;
                    case 'popular':
                    default:
                        // Default sorting (original order)
                        return 0;
                }
            });
            
            // Re-append sorted products to the grid
            products.forEach(product => productGrid.appendChild(product));
        });
    }
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.close');
    const addToCartBtn = document.getElementById('addToCart');
    
    if (quickViewButtons.length > 0 && modal) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const productCard = this.closest('.product-card');
                const productImage = productCard.querySelector('img').src;
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Update modal content
                document.getElementById('modalImage').src = productImage;
                document.getElementById('modalTitle').textContent = productName;
                document.getElementById('modalPrice').textContent = productPrice;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Focus on modal for accessibility
                modal.focus();
            });
        });
        
        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal when pressing Escape key
        window.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add to cart functionality
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productName = document.getElementById('modalTitle').textContent;
                const size = document.getElementById('size').value;
                const quantity = document.getElementById('quantity').value;
                
                alert(`Exploring ${productName} collection! Redirecting to collection page...`);
                
                // Close modal
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // In a real implementation, you would redirect to the collection page
                // window.location.href = 'pages/collections.html#' + size;
            });
        }
    }
    
    // Shopping Cart Object
    let shoppingCart = [];
    
    // Initialize cart from localStorage
    // For testing purposes, we're clearing the cart on each page load
    // In production, uncomment the following lines to preserve cart between sessions
    // if (localStorage.getItem('lightworkCart')) {
    //     shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    // }
    
    // Clear cart on page load (as per user request)
    shoppingCart = [];
    localStorage.removeItem('lightworkCart');
    
    // Update cart icon with item count
    function updateCartIcon() {
        // Get cart from localStorage
        let currentCart = [];
        if (localStorage.getItem('lightworkCart')) {
            currentCart = JSON.parse(localStorage.getItem('lightworkCart'));
        }
        
        const cartIcons = document.querySelectorAll('.fa-shopping-cart');
        const cartItemCount = currentCart.reduce((total, item) => total + item.quantity, 0);
        
        cartIcons.forEach(icon => {
            // Remove any existing badge
            const existingBadge = icon.parentElement.querySelector('.cart-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Add badge if there are items in cart
            if (cartItemCount > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = cartItemCount;
                badge.style.position = 'absolute';
                badge.style.top = '-8px';
                badge.style.right = '-8px';
                badge.style.backgroundColor = '#d22f27';
                badge.style.color = 'white';
                badge.style.borderRadius = '50%';
                badge.style.width = '20px';
                badge.style.height = '20px';
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
                badge.style.fontSize = '12px';
                badge.style.fontWeight = 'bold';
                icon.parentElement.style.position = 'relative';
                icon.parentElement.appendChild(badge);
            }
        });
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('lightworkCart', JSON.stringify(shoppingCart));
        updateCartIcon();
    }
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            // Get product image for flying animation
            let productImage = null;
            let productCard = this.closest('.product-card');
            
            // Check if we're on product detail page
            if (!productCard) {
                // We might be on the product detail page
                const mainImage = document.querySelector('.main-image img');
                if (mainImage) {
                    productImage = mainImage;
                }
            } else {
                productImage = productCard.querySelector('img');
            }
            
            // Create flying image animation
            if (productImage) {
                flyImageToCart(productImage);
            }
            
            // Get selected size and color (if available)
            let size = 'M'; // Default size
            let color = 'Black'; // Default color
            
            // Try to get selected size from product detail page
            const selectedSize = document.querySelector('.size-btn.active');
            if (selectedSize) {
                size = selectedSize.getAttribute('data-size');
            }
            
            // Try to get selected color from product detail page
            const selectedColor = document.querySelector('.color-swatch.active');
            if (selectedColor) {
                color = selectedColor.getAttribute('data-color');
            }
            
            // Create a unique key for the cart item based on id, size, and color
            const cartItemKey = `${productId}-${size}-${color}`;
            
            // Check if product with same size and color already exists in cart
            const existingItemIndex = shoppingCart.findIndex(item => item.key === cartItemKey);
            
            if (existingItemIndex !== -1) {
                // Increase quantity if product with same attributes already exists
                shoppingCart[existingItemIndex].quantity += 1;
            } else {
                // Add new product to cart with size and color attributes
                shoppingCart.push({
                    key: cartItemKey,
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    size: size,
                    color: color
                });
            }
            
            // Save cart and update UI
            saveCart();
            
            // Show confirmation message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.backgroundColor = '#d22f27';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
            
            console.log(`Product ${productId} (${productName}) added to cart for N$${productPrice}`);
        });
    });
    
    // Function to create flying image animation
    function flyImageToCart(imageElement) {
        const flyingImg = imageElement.cloneNode(true);
        flyingImg.classList.add('flying-image');
        
        // Position the flying image at the product image location
        const rect = imageElement.getBoundingClientRect();
        flyingImg.style.left = rect.left + 'px';
        flyingImg.style.top = rect.top + 'px';
        flyingImg.style.width = rect.width + 'px';
        flyingImg.style.height = rect.height + 'px';
        
        document.body.appendChild(flyingImg);
        
        // Get cart icon position
        const cartIcon = document.querySelector('.fa-shopping-cart');
        if (cartIcon) {
            const cartRect = cartIcon.getBoundingClientRect();
            
            // Animate to cart icon
            flyingImg.style.transition = 'all 0.2s ease-out';
            flyingImg.style.transform = 'scale(0.1)';
            flyingImg.style.left = cartRect.left + 'px';
            flyingImg.style.top = cartRect.top + 'px';
            
            // Remove the flying image after animation
            setTimeout(() => {
                if (flyingImg.parentNode) {
                    flyingImg.parentNode.removeChild(flyingImg);
                }
            }, 200);
        }
    }
    
// Initialize cart icon on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateCartIcon();
        
        // Cart icon event listeners are handled elsewhere
    });
    
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (carouselContainer && slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        let isScrolling = false;

        // Function to update carousel position
        function updateCarousel() {
            const translateX = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;
        }

        // Next button event
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });

        // Previous button event
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });

        // Auto slide every 5 seconds
        const autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
        
        // Pause auto slide when user interacts with carousel
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        });
        
        // Touch swipe functionality for mobile with improved detection
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const touch = e.touches[0];
            const diffX = startX - touch.clientX;
            const diffY = startY - touch.clientY;
            
            // Determine if user is trying to scroll vertically or swipe horizontally
            if (!isScrolling) {
                isScrolling = Math.abs(diffY) > Math.abs(diffX);
            }
            
            // Prevent horizontal scrolling if user is trying to scroll vertically
            if (!isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', (e) => {
            if (!startX || !startY || isScrolling) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only consider significant horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    currentIndex = (currentIndex + 1) % slideCount;
                } else {
                    // Swipe right - previous slide
                    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                }
                updateCarousel();
            }
            
            startX = 0;
            startY = 0;
        });
        
        // Keyboard navigation for carousel
        carouselContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }
        });
        
        // Initialize carousel
        updateCarousel();
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Show success message
                const originalHTML = this.innerHTML;
                this.innerHTML = '<p style="color: #d22f27; font-family: \'Montserrat\', sans-serif; font-size: 1.2rem;">Thank you for subscribing!</p>';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 3000);
                
                // Clear input
                emailInput.value = '';
            } else {
                // Show error
                emailInput.style.borderColor = '#d22f27';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    // Footer newsletter form
    const footerNewsletterForm = document.querySelector('.footer-newsletter');
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Show success message
                const originalHTML = this.innerHTML;
                this.innerHTML = '<p style="color: #d22f27; font-family: \'Montserrat\', sans-serif; font-size: 0.9rem;">Thank you for subscribing!</p>';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 3000);
                
                // Clear input
                emailInput.value = '';
            } else {
                // Show error
                emailInput.style.borderColor = '#d22f27';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    // Focus trapping for modals (accessibility)
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trapping to modal
    if (modal) {
        trapFocus(modal);
    }
    
    // Product gallery thumbnail selection
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.querySelector('.main-image img');
    
    if (thumbnailImages.length > 0 && mainImage) {
        thumbnailImages.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnailImages.forEach(img => img.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            });
        });
    }
    
    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    if (sizeButtons.length > 0) {
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    }
    
    // Quantity controls
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    if (quantityBtns.length > 0) {
        quantityBtns.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (this.textContent === '+') {
                    if (value < 10) {
                        input.value = value + 1;
                    }
                } else if (this.textContent === '-') {
                    if (value > 1) {
                        input.value = value - 1;
                    }
                }
            });
        });
    }
    
    // Cart item quantity controls
    const cartQuantityBtns = document.querySelectorAll('.item-quantity .quantity-btn');
    if (cartQuantityBtns.length > 0) {
        cartQuantityBtns.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (this.textContent === '+') {
                    if (value < 10) {
                        input.value = value + 1;
                    }
                } else if (this.textContent === '-') {
                    if (value > 1) {
                        input.value = value - 1;
                    }
                }
            });
        });
    }
    
    // Remove item from cart
    const removeButtons = document.querySelectorAll('.remove-btn');
    if (removeButtons.length > 0) {
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                if (cartItem) {
                    cartItem.remove();
                    alert('Item removed from cart!');
                }
            });
        });
    }
    
    // Wishlist button
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    if (wishlistBtns.length > 0) {
        wishlistBtns.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                }
            });
        });
    }
    
    // Toggle shipping address form
    const sameAsBillingCheckbox = document.getElementById('sameAsBilling');
    if (sameAsBillingCheckbox) {
        sameAsBillingCheckbox.addEventListener('change', function() {
            const shippingAddress = document.querySelector('.shipping-address');
            if (shippingAddress) {
                if (this.checked) {
                    shippingAddress.style.display = 'none';
                } else {
                    shippingAddress.style.display = 'block';
                }
            }
        });
    }
    
    // Place order button
    const placeOrderBtn = document.querySelector('.btn-primary.btn-full');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            alert('Order placed successfully! Thank you for your purchase.');
            // In a real implementation, you would submit the form to your backend
        });
    }
    
    // Add click event to cart icons to show cart modal
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            showCartModal();
        });
    });
});

// Function to show cart as a modal/popup
function showCartModal() {
    // Create modal if it doesn't exist
    let cartModal = document.getElementById('cartModal');
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cartModal';
        cartModal.className = 'cart-modal';
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-modal-header">
                    <h2>Your Shopping Cart</h2>
                    <span class="cart-modal-close">&times;</span>
                </div>
                <div class="cart-modal-body">
                    <div class="cart-items-container">
                        <!-- Cart items will be loaded here -->
                    </div>
                    <div class="cart-modal-footer">
                        <!-- Cart summary will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cartModal);
        
        // Add event listeners for modal controls
        cartModal.querySelector('.cart-modal-close').addEventListener('click', hideCartModal);
        
        // Close modal when clicking outside
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                hideCartModal();
            }
        });
    }
    
    // Load cart items
    loadCartItems();
    
    // Show modal
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to hide cart modal
function hideCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Function to load and display cart items in the modal
function loadCartItems() {
    // Get cart from localStorage
    let shoppingCart = [];
    if (localStorage.getItem('lightworkCart')) {
        shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    }
    
    const cartItemsContainer = document.querySelector('.cart-items-container');
    
    if (shoppingCart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        updateCartSummary();
        return;
    }
    
    let cartHTML = '';
    
    shoppingCart.forEach(item => {
        // Map product IDs to their respective images
        const productImages = {
            '1': '../images/hoodie.jpg',
            '2': '../images/hoodie 2.jpg',
            '3': '../images/hoodie 3.jpg',
            '4': '../images/hoodie 4.jpg',
            '5': '../images/hoodie 5.jpg',
            '6': '../images/hoodie 6.jpg',
            '14': '../images/Tee.jpg',
            '15': '../images/Tee 2.jpg',
            '16': '../images/Tee 3.jpg',
            '17': '../images/Tee 4.jpg',
            '18': '../images/Tee 5.jpg',
            '19': '../images/Tee 6.jpg',
            '20': '../images/crop hoodie.jpg',
            '21': '../images/crop hoodie 2.jpg'
        };
        
        // Use product-specific image if available, otherwise fallback to default
        const productImage = productImages[item.id] || '../images/hoodie.jpg';
        
        cartHTML += `
            <div class="cart-item-modal" data-key="${item.key}">
                <div class="cart-item-image">
                    <img src="${productImage}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">N$${item.price.toFixed(2)}</p>
                    <div class="cart-item-attributes">
                        <p>Size: ${item.size} | Color: ${item.color}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn-modal decrease" data-key="${item.key}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn-modal increase" data-key="${item.key}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <p>N$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item-modal" data-key="${item.key}">&times;</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    updateCartSummary();
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn-modal.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const itemKey = this.getAttribute('data-key');
            updateCartItemQuantity(itemKey, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn-modal.increase').forEach(button => {
        button.addEventListener('click', function() {
            const itemKey = this.getAttribute('data-key');
            updateCartItemQuantity(itemKey, 1);
        });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item-modal').forEach(button => {
        button.addEventListener('click', function() {
            const itemKey = this.getAttribute('data-key');
            removeCartItem(itemKey);
        });
    });
}

// Function to update cart summary with subtotal, tax, and shipping
function updateCartSummary() {
    // Get cart from localStorage
    let shoppingCart = [];
    if (localStorage.getItem('lightworkCart')) {
        shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    }
    
    // Calculate totals
    const subtotal = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 150.00 : 0.00; // Free shipping for empty cart
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + shipping + tax;
    
    // Update cart summary in modal
    const cartModalFooter = document.querySelector('.cart-modal-footer');
    if (cartModalFooter) {
        cartModalFooter.innerHTML = `
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span>N$${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Shipping</span>
                    <span>N$${shipping.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Tax</span>
                    <span>N$${tax.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row total">
                    <span>Total</span>
                    <span>N$${total.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-actions">
                <button id="continueShopping" class="btn btn-outline">Continue Shopping</button>
                <button id="proceedToCheckout" class="btn btn-primary">Proceed to Checkout</button>
            </div>
        `;
        
        // Add event listeners for action buttons
        document.getElementById('continueShopping').addEventListener('click', hideCartModal);
        document.getElementById('proceedToCheckout').addEventListener('click', proceedToCheckout);
    }
}

// Function to update cart item quantity
function updateCartItemQuantity(itemKey, change) {
    // Get cart from localStorage
    let shoppingCart = [];
    if (localStorage.getItem('lightworkCart')) {
        shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    }
    
    const itemIndex = shoppingCart.findIndex(item => item.key === itemKey);
    if (itemIndex !== -1) {
        shoppingCart[itemIndex].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (shoppingCart[itemIndex].quantity <= 0) {
            shoppingCart.splice(itemIndex, 1);
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('lightworkCart', JSON.stringify(shoppingCart));
        
        // Reload cart items in modal
        loadCartItems();
        
        // Update cart icon
        updateCartIcon();
    }
}

// Function to remove item from cart
function removeCartItem(itemKey) {
    // Get cart from localStorage
    let shoppingCart = [];
    if (localStorage.getItem('lightworkCart')) {
        shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    }
    
    // Remove item from cart
    shoppingCart = shoppingCart.filter(item => item.key !== itemKey);
    
    // Save updated cart to localStorage
    localStorage.setItem('lightworkCart', JSON.stringify(shoppingCart));
    
    // Reload cart items in modal
    loadCartItems();
    
    // Update cart icon
    updateCartIcon();
}

// Function to proceed to checkout
function proceedToCheckout() {
    // Get cart from localStorage
    let shoppingCart = [];
    if (localStorage.getItem('lightworkCart')) {
        shoppingCart = JSON.parse(localStorage.getItem('lightworkCart'));
    }
    
    // Log cart data to console
    console.log('Proceeding to checkout with cart:', shoppingCart);
    
    // In a real implementation, you would redirect to the checkout page
    // window.location.href = 'checkout.html';
    
    // For now, just show an alert
    alert('Proceeding to checkout! Cart data has been logged to the console.');
}
