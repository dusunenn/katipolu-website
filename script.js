// Katipoğlu Gayrimenkul - Ana JavaScript Dosyası

// Sample listings data - Normally this would come from a database
const listings = [
    {
        id: 1,
        title: "3+1 Lüks Daire - Zeytinburnu Sahil",
        location: "Kazlıçeşme Mah. / Zeytinburnu",
        price: "12.500.000",
        currency: "TL",
        area: 145,
        rooms: "3+1",
        type: "Satılık",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500",
        features: ["Merkezi Konumda", "Deniz Manzaralı", "Asansörlü", "Otopark"]
    },
    {
        id: 2,
        title: "Merkezi Konumda Ofis Katı",
        location: "Telsiz Mah. / Zeytinburnu",
        price: "45.000",
        currency: "TL",
        area: 85,
        rooms: "2 Oda",
        type: "Kiralık",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500",
        features: ["Merkezi Konumda", "Işıklı", "Asansörlü", "24/7 Güvenlik"]
    },
    {
        id: 3,
        title: "Bahçeli Müstakil Ev Fırsatı",
        location: "Beştelsiz / Zeytinburnu",
        price: "8.750.000",
        currency: "TL",
        area: 120,
        rooms: "2+1",
        type: "Satılık",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500",
        features: ["Bahçeli", "Müstakil", "Sakin Konum", "Otopark"]
    },
    {
        id: 4,
        title: "Yeni Yapı 4+1 Dubleks",
        location: "Yeşiltepe Mah. / Zeytinburnu", 
        price: "15.200.000",
        currency: "TL",
        area: 180,
        rooms: "4+1",
        type: "Satılık",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500",
        features: ["Yeni Yapı", "Dubleks", "Balkonlu", "Modern"]
    },
    {
        id: 5,
        title: "Kiralık 2+1 Eşyalı Daire",
        location: "Sümer Mah. / Zeytinburnu",
        price: "28.000",
        currency: "TL", 
        area: 100,
        rooms: "2+1",
        type: "Kiralık",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500",
        features: ["Eşyalı", "Merkezi", "Temiz", "Ulaşım Kolay"]
    },
    {
        id: 6,
        title: "Satılık Dükkan - Ana Cadde Üzeri",
        location: "Maltepe Mah. / Zeytinburnu",
        price: "4.500.000",
        currency: "TL",
        area: 45,
        rooms: "Tek Kat",
        type: "Satılık",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500",
        features: ["Ana Cadde", "İşlek Konum", "Yatırımlık", "Geniş Vitrin"]
    },
    {
        id: 7,
        title: "Satılık İmarlı Arsa - Gebze",
        location: "Pelitli Mah. / Gebze",
        price: "2.800.000",
        currency: "TL",
        area: 500,
        rooms: "Arsa",
        type: "Arsa",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500",
        features: ["İmarlı", "Köşe Parsel", "Yatırımlık", "Konum Avantajı"]
    },
    {
        id: 8,
        title: "Satılık Villa Arsası - Çayırova",
        location: "Akse Mah. / Çayırova",
        price: "1.950.000",
        currency: "TL",
        area: 400,
        rooms: "Arsa",
        type: "Arsa",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=500",
        features: ["Villa İmarı", "Sakin Konum", "Yatırım Fırsatı", "Temiz Tapu"]
    }
];

// DOM Elements
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.btn-danger');
const listingsContainer = document.querySelector('.row.g-4');

// Search functionality
function searchListings(query) {
    const filtered = listings.filter(listing => 
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.location.toLowerCase().includes(query.toLowerCase()) ||
        listing.rooms.toLowerCase().includes(query.toLowerCase()) ||
        listing.type.toLowerCase().includes(query.toLowerCase())
    );
    
    displayListings(filtered);
}

// Display listings
function displayListings(listingsToShow) {
    if (!listingsContainer) return;
    
    listingsContainer.innerHTML = '';
    
    listingsToShow.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
    });
}

// Create listing card
function createListingCard(listing) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    
    col.innerHTML = `
        <div class="card listing-card h-100 border-0 shadow-sm" onclick="goToListing(${listing.id})">
            <div class="position-relative">
                <img src="${listing.image}" class="card-img-top" alt="${listing.title}">
                <span class="badge ${getBadgeClass(listing.type)} position-absolute top-0 start-0 m-3">${listing.type}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title fw-bold">${listing.title}</h5>
                <p class="text-muted small mb-2"><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="h5 mb-0 text-danger fw-bold">${formatPrice(listing.price)} ${listing.currency}</span>
                    <span class="text-muted small">${listing.area} m² | ${listing.rooms}</span>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Format price with thousand separators
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Get badge class for listing type
function getBadgeClass(type) {
    switch(type) {
        case 'Satılık': return 'bg-danger';
        case 'Kiralık': return 'bg-primary';
        case 'Arsa': return 'bg-success';
        default: return 'bg-secondary';
    }
}

// Navigate to listing detail
function goToListing(id) {
    localStorage.setItem('selectedListing', id);
    window.location.href = 'listing-detail.html';
}

// Show all listings
function showAllListings() {
    localStorage.setItem('showAllListings', 'true');
    window.location.href = 'all-listings.html';
}

// Contact functions
function callPhone() {
    window.location.href = 'tel:+905305542001';
}

function openWhatsApp() {
    window.open('https://wa.me/905305542001?text=Merhaba, emlak ilanlarınız hakkında bilgi almak istiyorum.', '_blank');
}

// Email configuration for contact form
const EMAIL_CONFIG = {
    serviceId: 'service_katipoglu', // You'll need to set this up in EmailJS
    templateId: 'template_contact', // You'll need to create this template
    publicKey: 'YOUR_PUBLIC_KEY' // You'll get this from EmailJS
};

// Initialize EmailJS when page loads
function initEmailJS() {
    // Load EmailJS if not already loaded
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            emailjs.init(EMAIL_CONFIG.publicKey);
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAIL_CONFIG.publicKey);
    }
}

// Send contact form email
function sendContactEmail(formData) {
    const templateParams = {
        from_name: formData.name || 'İsimsiz Ziyaretçi',
        from_email: formData.email || 'email belirtilmedi',
        from_phone: formData.phone || 'telefon belirtilmedi',
        message: formData.message,
        to_email: 'mehmet.dusunen@outlook.com',
        reply_to: formData.email || 'noreply@example.com'
    };

    return emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
        .then((response) => {
            console.log('Email sent successfully:', response);
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            return true;
        })
        .catch((error) => {
            console.error('Email send failed:', error);
            alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya telefon ile iletişime geçin.');
            return false;
        });
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.name?.value || '',
        email: event.target.email?.value || '',
        phone: event.target.phone?.value || '',
        message: event.target.message?.value || ''
    };
    
    // Basic validation
    if (!formData.message.trim()) {
        alert('Lütfen bir mesaj yazın.');
        return;
    }
    
    // Send email
    sendContactEmail(formData);
}

// Alternative function for simple text input (like newsletter or quick contact)
function sendQuickMessage(message, senderInfo = {}) {
    const formData = {
        name: senderInfo.name || 'Web Sitesi Ziyaretçisi',
        email: senderInfo.email || '',
        phone: senderInfo.phone || '',
        message: message
    };
    
    return sendContactEmail(formData);
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Newsletter subscription (updated to send email)
function subscribeNewsletter(email) {
    if (email && email.includes('@')) {
        // Send confirmation email
        sendQuickMessage(
            `Yeni bülten aboneliği: ${email}`,
            { email: email, name: 'Bülten Abonesi' }
        ).then(() => {
            alert('Bültene başarıyla abone oldunuz! ' + email);
        });
        return true;
    }
    alert('Lütfen geçerli bir email adresi girin.');
    return false;
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Search event listeners
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                searchListings(query);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query.length > 0) {
                    searchListings(query);
                }
            }
        });
    }
    
    // "Tümünü Gör" link
    const showAllLink = document.querySelector('a[href="#"]');
    if (showAllLink && showAllLink.textContent.includes('Tümünü Gör')) {
        showAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAllListings();
        });
    }
    
    // Phone and WhatsApp links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', callPhone);
    });
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
    
    // Contact form event listener
    const contactForm = document.querySelector('#contactForm, form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Listen for any text input that might be a message
    const messageInputs = document.querySelectorAll('textarea, input[type="text"][placeholder*="mesaj"], input[type="text"][placeholder*="yorum"]');
    messageInputs.forEach(input => {
        const form = input.closest('form');
        if (form && !form.hasAttribute('data-email-handled')) {
            form.setAttribute('data-email-handled', 'true');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const message = input.value.trim();
                if (message) {
                    sendQuickMessage(message);
                }
            });
        }
    });
    
    console.log('Katipoğlu Gayrimenkul sitesi yüklendi!');
});

// Utility functions
const utils = {
    formatCurrency: formatPrice,
    scrollToTop: () => window.scrollTo({top: 0, behavior: 'smooth'}),
    getCurrentPage: () => window.location.pathname.split('/').pop() || 'index.html'
};

// Hero Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index % 5]) { // Only 5 indicators for 35 slides
        indicators[index % 5].classList.add('active');
    }
    
    currentSlideIndex = index;
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function changeSlide(direction) {
    clearInterval(slideInterval);
    
    if (direction > 0) {
        nextSlide();
    } else {
        previousSlide();
    }
    
    // Restart auto-slide after manual navigation
    startAutoSlide();
}

function currentSlide(index) {
    clearInterval(slideInterval);
    
    // Map indicator index to slide groups
    const slideGroupSize = Math.ceil(slides.length / 5);
    const startIndex = (index - 1) * slideGroupSize;
    showSlide(startIndex);
    
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Initialize slider when DOM loads
function initHeroSlider() {
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.hero-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Add touch event listeners for mobile swipe
function initTouchEvents() {
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', handleTouchStart, false);
        sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }
}

// Keyboard navigation
function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize Hero Slider
    initHeroSlider();
    initTouchEvents();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Search event listeners
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                searchListings(query);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query.length > 0) {
                    searchListings(query);
                }
            }
        });
    }
    
    // "Tümünü Gör" link
    const showAllLink = document.querySelector('a[href="#"]');
    if (showAllLink && showAllLink.textContent.includes('Tümünü Gör')) {
        showAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAllListings();
        });
    }
    
    // Phone and WhatsApp links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', callPhone);
    });
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
    
    // Contact form event listener
    const contactForm = document.querySelector('#contactForm, form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Listen for any text input that might be a message
    const messageInputs = document.querySelectorAll('textarea, input[type="text"][placeholder*="mesaj"], input[type="text"][placeholder*="yorum"]');
    messageInputs.forEach(input => {
        const form = input.closest('form');
        if (form && !form.hasAttribute('data-email-handled')) {
            form.setAttribute('data-email-handled', 'true');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const message = input.value.trim();
                if (message) {
                    sendQuickMessage(message);
                }
            });
        }
    });
    
    console.log('Katipoğlu Gayrimenkul sitesi yüklendi!');
    console.log(`Hero slider başlatıldı: ${slides.length} fotoğraf`);
});

// Export for other scripts if needed
window.KatipogluGayrimenkul = {
    listings,
    searchListings,
    displayListings,
    goToListing,
    utils
};