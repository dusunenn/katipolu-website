
const listings = [
    {
        id: 1,
        title: "3+1 Lüks Daire - Zeytinburnu Sahil(TEST)",
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
        title: "Merkezi Konumda Ofis Katı(TEST)",
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
        title: "Bahçeli Müstakil Ev Fırsatı(TEST)",
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
        title: "Yeni Yapı 4+1 Dubleks(TEST)",
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
        title: "Kiralık 2+1 Eşyalı Daire(TEST)",
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
        title: "Satılık Dükkan - Ana Cadde Üzeri(TEST)",
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
        title: "Satılık İmarlı Arsa - Gebze(TEST)",
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
        title: "Satılık Villa Arsası - Çayırova(TEST)",
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

const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.btn-danger');
const listingsContainer = document.querySelector('.row.g-4');


function searchListings(query) {
    const queryLower = query.toLowerCase();
    const filtered = listings.filter(listing => {
        const basicMatch = listing.title.toLowerCase().includes(queryLower) ||
                          listing.location.toLowerCase().includes(queryLower) ||
                          listing.rooms.toLowerCase().includes(queryLower) ||
                          listing.type.toLowerCase().includes(queryLower);
        
        const featureMatch = listing.features.some(feature => 
            feature.toLowerCase().includes(queryLower)
        );
        
        const arsaMatch = (queryLower.includes('arsa') && listing.type === 'Arsa') ||
                         (queryLower.includes('imarlı') && listing.type === 'Arsa') ||
                         (queryLower.includes('imar') && listing.type === 'Arsa') ||
                         (queryLower.includes('villa arsası') && listing.features.includes('Villa İmarı'));
        
        return basicMatch || featureMatch || arsaMatch;
    });
    
    displayListings(filtered);
}

function displayListings(listingsToShow) {
    if (!listingsContainer) return;
    
    listingsContainer.innerHTML = '';
    
    listingsToShow.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
    });
}


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

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getBadgeClass(type) {
    switch(type) {
        case 'Satılık': return 'bg-danger';
        case 'Kiralık': return 'bg-primary';
        case 'Arsa': return 'bg-success';
        default: return 'bg-secondary';
    }
}

function goToListing(id) {
    localStorage.setItem('selectedListing', id);
    window.location.href = 'listing-detail.html';
}

function showAllListings() {
    localStorage.setItem('showAllListings', 'true');
    window.location.href = 'all-listings.html';
}


function callPhone() {
    window.location.href = 'tel:+905528859792';
}

function openWhatsApp() {
    window.open('https://wa.me/905528859792?text=Merhaba, emlak ilanlarınız hakkında bilgi almak istiyorum.', '_blank');
}

const EMAIL_CONFIG = {
    serviceId: 'service_katipoglu',
    templateId: 'template_contact',
    publicKey: 'YOUR_PUBLIC_KEY'
};

function initEmailJS() {
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
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            return true;
        })
        .catch((error) => {
            alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya telefon ile iletişime geçin.');
            return false;
        });
}

function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.name?.value || '',
        email: event.target.email?.value || '',
        phone: event.target.phone?.value || '',
        message: event.target.message?.value || ''
    };
    
    if (!formData.message.trim()) {
        alert('Lütfen bir mesaj yazın.');
        return;
    }
    
    sendContactEmail(formData);
}


function sendQuickMessage(message, senderInfo = {}) {
    const formData = {
        name: senderInfo.name || 'Web Sitesi Ziyaretçisi',
        email: senderInfo.email || '',
        phone: senderInfo.phone || '',
        message: message
    };
    
    return sendContactEmail(formData);
}

function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}


function subscribeNewsletter(email) {
    if (email && email.includes('@')) {
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

document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    
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
    
    const showAllLink = document.querySelector('a[href="#"]');
    if (showAllLink && showAllLink.textContent.includes('Tümünü Gör')) {
        showAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAllListings();
        });
    }
    
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
    
    const contactForm = document.querySelector('#contactForm, form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
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
});



let currentSlideIndex = 0;
let slides = null;
let indicators = null;
let slideInterval;

function showSlide(index) {
    if (!slides) slides = document.querySelectorAll('.slide');
    if (!indicators) indicators = document.querySelectorAll('.indicator');
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        console.log(`Showing slide ${index}`);
    }
    if (indicators[index % 5]) {
        indicators[index % 5].classList.add('active');
    }
    
    currentSlideIndex = index;
}

function nextSlide() {
    if (!slides) slides = document.querySelectorAll('.slide');
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    if (!slides) slides = document.querySelectorAll('.slide');
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
    
    startAutoSlide();
}

function currentSlide(index) {
    clearInterval(slideInterval);
    
    const slideGroupSize = Math.ceil(slides.length / 5);
    const startIndex = (index - 1) * slideGroupSize;
    showSlide(startIndex);
    
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function initHeroSlider() {
    // DOM elementlerinin yüklenmesini biraz bekle
    setTimeout(() => {
        slides = document.querySelectorAll('.slide');
        indicators = document.querySelectorAll('.indicator');
        
        if (slides && slides.length > 0) {
            console.log(`${slides.length} slide found, starting slider...`);
            showSlide(0);
            startAutoSlide();
            
            const sliderContainer = document.querySelector('.hero-slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', stopAutoSlide);
                sliderContainer.addEventListener('mouseleave', startAutoSlide);
            }
        } else {
            console.log('No slides found');
        }
    }, 100);
}

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
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    }
}

function initTouchEvents() {
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', handleTouchStart, false);
        sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }
}

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.KatipogluGayrimenkul = {
        listings: listings
    };
    
    initEmailJS();
    
    // Slider'ı başlat
    initHeroSlider();
    initTouchEvents();
    
    // Klavye kontrollerini ekle
    document.addEventListener('keydown', handleKeyDown);
    
    // Search buton event listener'ları
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
    
    // Diğer event listener'lar
    const showAllLink = document.querySelector('a[href="#"]');
    if (showAllLink && showAllLink.textContent.includes('Tümünü Gör')) {
        showAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAllListings();
        });
    }
    
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
    
    const contactForm = document.querySelector('#contactForm, form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
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
});

window.KatipogluGayrimenkul = {
    listings,
    searchListings,
    displayListings,
    goToListing
};