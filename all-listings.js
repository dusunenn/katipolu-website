// All Listings Page JavaScript
let currentPage = 1;
const itemsPerPage = 9;
let filteredListings = [];

// DOM Elements
const allListingsGrid = document.getElementById('allListingsGrid');
const filterType = document.getElementById('filterType');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const filterRooms = document.getElementById('filterRooms');
const applyFiltersBtn = document.getElementById('applyFilters');
const clearFiltersBtn = document.getElementById('clearFilters');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const resultCount = document.getElementById('resultCount');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Use listings from main script
    if (window.KatipogluGayrimenkul) {
        filteredListings = [...window.KatipogluGayrimenkul.listings];
        displayListings();
        updateResultCount();
        
        // Setup event listeners
        setupEventListeners();
    }
});

function setupEventListeners() {
    applyFiltersBtn.addEventListener('click', applyFilters);
    clearFiltersBtn.addEventListener('click', clearFilters);
    loadMoreBtn.addEventListener('click', loadMoreListings);
    
    // Real-time filtering on input change
    [filterType, filterRooms].forEach(element => {
        element.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const typeValue = filterType.value;
    const minPriceValue = parseFloat(minPrice.value) || 0;
    const maxPriceValue = parseFloat(maxPrice.value) || Infinity;
    const roomsValue = filterRooms.value;
    
    filteredListings = window.KatipogluGayrimenkul.listings.filter(listing => {
        const matchesType = !typeValue || listing.type === typeValue;
        const matchesMinPrice = parseFloat(listing.price.replace(/\./g, '')) >= minPriceValue;
        const matchesMaxPrice = parseFloat(listing.price.replace(/\./g, '')) <= maxPriceValue;
        const matchesRooms = !roomsValue || listing.rooms === roomsValue;
        
        return matchesType && matchesMinPrice && matchesMaxPrice && matchesRooms;
    });
    
    currentPage = 1;
    displayListings();
    updateResultCount();
}

function clearFilters() {
    filterType.value = '';
    minPrice.value = '';
    maxPrice.value = '';
    filterRooms.value = '';
    
    filteredListings = [...window.KatipogluGayrimenkul.listings];
    currentPage = 1;
    displayListings();
    updateResultCount();
}

function displayListings() {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const listingsToShow = filteredListings.slice(startIndex, endIndex);
    
    allListingsGrid.innerHTML = '';
    
    if (listingsToShow.length === 0) {
        allListingsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search text-muted" style="font-size: 3rem;"></i>
                <h3 class="text-muted mt-3">Aradığınız kriterlere uygun ilan bulunamadı</h3>
                <p class="text-muted">Lütfen filtreleri değiştirerek tekrar deneyin.</p>
                <button class="btn btn-outline-danger" onclick="clearFilters()">Filtreleri Temizle</button>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    listingsToShow.forEach(listing => {
        const listingCard = createListingCard(listing);
        allListingsGrid.appendChild(listingCard);
    });
    
    // Show/hide load more button
    if (endIndex < filteredListings.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function createListingCard(listing) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    
    col.innerHTML = `
        <div class="card listing-card h-100 border-0 shadow-sm" onclick="goToListingDetail(${listing.id})">
            <div class="position-relative">
                <img src="${listing.image}" class="card-img-top" alt="${listing.title}">
                <span class="badge ${listing.type === 'Satılık' ? 'bg-danger' : 'bg-primary'} position-absolute top-0 start-0 m-3">${listing.type}</span>
                <div class="position-absolute top-0 end-0 m-3">
                    <button class="btn btn-light btn-sm rounded-circle" onclick="event.stopPropagation(); toggleFavorite(${listing.id})" title="Favorilere Ekle">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title fw-bold">${listing.title}</h5>
                <p class="text-muted small mb-2"><i class="fas fa-map-marker-alt"></i> ${listing.location}</p>
                
                <!-- Features -->
                <div class="mb-3">
                    ${listing.features.slice(0, 2).map(feature => 
                        `<span class="badge bg-light text-dark me-1">${feature}</span>`
                    ).join('')}
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <span class="h5 mb-0 text-danger fw-bold">${formatPrice(listing.price)} ${listing.currency}</span>
                    <span class="text-muted small">${listing.area} m² | ${listing.rooms}</span>
                </div>
                
                <!-- Action buttons -->
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-outline-danger btn-sm flex-fill" onclick="event.stopPropagation(); callAboutListing(${listing.id})">
                        <i class="fas fa-phone me-1"></i> Ara
                    </button>
                    <button class="btn btn-outline-success btn-sm flex-fill" onclick="event.stopPropagation(); whatsappAboutListing(${listing.id})">
                        <i class="fab fa-whatsapp me-1"></i> Mesaj
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function loadMoreListings() {
    currentPage++;
    displayListings();
}

function updateResultCount() {
    resultCount.textContent = `Toplam: ${filteredListings.length} ilan`;
}

function goToListingDetail(id) {
    localStorage.setItem('selectedListing', id);
    window.location.href = 'listing-detail.html';
}

function toggleFavorite(id) {
    // Mock favorite functionality
    const heartIcon = event.target;
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = '#e03131';
        
        // Show toast notification
        showToast('İlan favorilere eklendi!', 'success');
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '';
        
        showToast('İlan favorilerden çıkarıldı!', 'info');
    }
}

function callAboutListing(id) {
    const listing = window.KatipogluGayrimenkul.listings.find(l => l.id === id);
    if (listing) {
        window.location.href = `tel:+905305542001`;
    }
}

function whatsappAboutListing(id) {
    const listing = window.KatipogluGayrimenkul.listings.find(l => l.id === id);
    if (listing) {
        const message = encodeURIComponent(`Merhaba Katipoğlu Gayrimenkul,

"${listing.title}" ilanınız hakkında detaylı bilgi almak istiyorum.

İlan Detayları:
- Konum: ${listing.location}
- Fiyat: ${listing.price}
- Boyut: ${listing.area} m² | ${listing.rooms}

Ofis Adresiniz: Ekber Yılmaz İş Merkezi
Hacı Halil Mahallesi Adliye Caddesi Güzeltepe İş Merkezi, D:34/c, 41455 Gebze/Kocaeli

En kısa sürede geri dönüş bekliyorum.
Teşekkürler.`);
        window.open(`https://wa.me/905528858792?text=${message}`, '_blank');
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed`;
    toast.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

// Format price function
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);