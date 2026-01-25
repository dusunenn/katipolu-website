// Listing Detail Page JavaScript
let currentListing = null;
let currentImageIndex = 0;
let galleryImages = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const listingId = localStorage.getItem('selectedListing');
    
    if (!listingId || !window.KatipogluGayrimenkul) {
        showError();
        return;
    }
    
    currentListing = window.KatipogluGayrimenkul.listings.find(l => l.id == listingId);
    
    if (!currentListing) {
        showError();
        return;
    }
    
    loadListingDetail();
    loadSimilarListings();
    setupEventListeners();
});

function loadListingDetail() {
    const container = document.getElementById('listingDetailContainer');
    
    // Generate additional images for gallery (mock data)
    galleryImages = [
        currentListing.image,
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1600607687644-aac4c5b4f71d?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1600563438938-a42d098817ef?auto=format&fit=crop&w=800'
    ];
    
    container.innerHTML = `
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Ana Sayfa</a></li>
                <li class="breadcrumb-item"><a href="all-listings.html">Tüm İlanlar</a></li>
                <li class="breadcrumb-item active">${currentListing.title}</li>
            </ol>
        </nav>
        
        <div class="row g-4">
            <!-- Image Gallery -->
            <div class="col-lg-8">
                <div class="image-gallery">
                    <img src="${galleryImages[0]}" alt="${currentListing.title}" class="main-image" id="mainImage" onclick="openImageModal(0)">
                    <div class="thumbnail-row d-flex gap-2 flex-wrap">
                        ${galleryImages.map((img, index) => `
                            <img src="${img}" alt="Resim ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(${index})">
                        `).join('')}
                    </div>
                </div>
                
                <!-- Listing Info -->
                <div class="info-box mt-4">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="badge badge-type ${currentListing.type === 'Satılık' ? 'bg-danger' : 'bg-primary'}">${currentListing.type}</span>
                            <h1 class="h2 fw-bold mt-2 mb-1">${currentListing.title}</h1>
                            <p class="text-muted mb-0"><i class="fas fa-map-marker-alt me-2"></i>${currentListing.location}</p>
                        </div>
                        <div class="text-end">
                            <div class="price-tag">${formatPrice(currentListing.price)} ${currentListing.currency}</div>
                            <small class="text-muted">${currentListing.area} m² | ${currentListing.rooms}</small>
                        </div>
                    </div>
                    
                    <!-- Features -->
                    <div class="row g-2 mb-4">
                        ${currentListing.features.map(feature => `
                            <div class="col-auto">
                                <span class="badge bg-light text-dark border">${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Description -->
                <div class="description-section">
                    <h4 class="fw-bold mb-3">İlan Açıklaması</h4>
                    <p class="text-muted">Bu özel ${currentListing.rooms} emlak, ${currentListing.location} konumunda yer almaktadır. ${currentListing.area} metrekare kullanım alanına sahip bu ${currentListing.type.toLowerCase()} emlak, modern yaşamın tüm konforunu sunmaktadır.</p>
                    
                    <p class="text-muted">Katipoğlu Gayrimenkul güvencesiyle sunulan bu özel fırsat için detaylı bilgi almak ve gezme randevusu oluşturmak için bizimle iletişime geçin.</p>
                    
                    <h5 class="fw-bold mt-4 mb-3">Özellikler</h5>
                    <ul class="feature-list">
                        <li><span>Alan</span><strong>${currentListing.area} m²</strong></li>
                        <li><span>Oda Sayısı</span><strong>${currentListing.rooms}</strong></li>
                        <li><span>Durum</span><strong>${currentListing.type}</strong></li>
                        <li><span>Konum</span><strong>${currentListing.location}</strong></li>
                        <li><span>İlan Tarihi</span><strong>15 Ocak 2024</strong></li>
                        <li><span>İlan No</span><strong>KG${currentListing.id.toString().padStart(4, '0')}</strong></li>
                    </ul>
                </div>
                
                <!-- Map -->
                <div class="info-box">
                    <h4 class="fw-bold mb-3">Konum</h4>
                    <div class="map-container">
                        <div class="text-center">
                            <i class="fas fa-map-marked-alt fa-3x mb-3"></i>
                            <p class="h5">${currentListing.location}</p>
                            <p class="text-muted">Detaylı konum bilgisi için iletişime geçin</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Contact Sidebar -->
            <div class="col-lg-4">
                <div class="contact-sticky">
                    <div class="contact-card">
                        <div class="text-center mb-4">
                            <img src="https://via.placeholder.com/80" alt="Danışman" class="rounded-circle mb-3">
                            <h5 class="mb-1">Katipoğlu Gayrimenkul</h5>
                            <p class="mb-0 opacity-75">Emlak Danışmanı</p>
                        </div>
                        
                        <div class="d-grid gap-3">
                            <a href="tel:+905000000000" class="btn btn-outline-light btn-lg">
                                <i class="fas fa-phone me-2"></i> Hemen Ara
                            </a>
                            <button class="btn btn-outline-light btn-lg" onclick="openWhatsApp()">
                                <i class="fab fa-whatsapp me-2"></i> WhatsApp
                            </button>
                            <button class="btn btn-outline-light btn-lg" data-bs-toggle="modal" data-bs-target="#contactModal">
                                <i class="fas fa-envelope me-2"></i> Mesaj Gönder
                            </button>
                        </div>
                        
                        <hr class="my-4 opacity-50">
                        
                        <div class="text-center">
                            <small class="opacity-75">
                                <i class="fas fa-shield-alt me-1"></i>
                                Katipoğlu Güvencesi ile
                            </small>
                        </div>
                    </div>
                    
                    <!-- Quick Info -->
                    <div class="info-box mt-3">
                        <h6 class="fw-bold mb-3">Hızlı Bilgiler</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Görüntülenme</span>
                            <strong>1,247</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">İlan Tarihi</span>
                            <strong>15 Ocak</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-muted">İlan No</span>
                            <strong>KG${currentListing.id.toString().padStart(4, '0')}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update page title
    document.title = `${currentListing.title} | Katipoğlu Gayrimenkul`;
}

function loadSimilarListings() {
    const container = document.getElementById('similarListings');
    const similarListings = window.KatipogluGayrimenkul.listings
        .filter(l => l.id !== currentListing.id && l.type === currentListing.type)
        .slice(0, 3);
    
    if (similarListings.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="text-muted">Benzer ilan bulunamadı.</p>
                <a href="all-listings.html" class="btn btn-outline-danger">Tüm İlanları Gör</a>
            </div>
        `;
        return;
    }
    
    similarListings.forEach(listing => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card listing-card h-100 border-0 shadow-sm" onclick="goToListing(${listing.id})">
                <div class="position-relative">
                    <img src="${listing.image}" class="card-img-top" alt="${listing.title}">
                    <span class="badge ${listing.type === 'Satılık' ? 'bg-danger' : 'bg-primary'} position-absolute top-0 start-0 m-3">${listing.type}</span>
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
        container.appendChild(col);
    });
}

function setupEventListeners() {
    // Contact form
    document.getElementById('sendContactForm').addEventListener('click', sendContactForm);
}

function changeMainImage(index) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = galleryImages[index];
    currentImageIndex = index;
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function openImageModal(index) {
    currentImageIndex = index;
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body position-relative">
                    <img src="${galleryImages[index]}" class="modal-image" id="modalImage" alt="Resim ${index + 1}">
                    <button class="btn gallery-nav prev" onclick="navigateGallery(-1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="btn gallery-nav next" onclick="navigateGallery(1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function navigateGallery(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

function goToListing(id) {
    localStorage.setItem('selectedListing', id);
    window.location.reload();
}

function openWhatsApp() {
    const message = encodeURIComponent(`Merhaha, "${currentListing.title}" ilanınız hakkında detaylı bilgi almak istiyorum. İlan No: KG${currentListing.id.toString().padStart(4, '0')}`);
    window.open(`https://wa.me/905528858792?text=${message}`, '_blank');
}

function sendContactForm() {
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !phone) {
        alert('Lütfen ad soyad ve telefon alanlarını doldurun.');
        return;
    }
    
    // Mock form submission
    alert(`Teşekkürler ${name}! Mesajınız alınmıştır. En kısa sürede ${phone} numarasından sizi arayacağız.`);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    modal.hide();
    
    // Clear form
    document.getElementById('contactForm').reset();
}

function showError() {
    const container = document.getElementById('listingDetailContainer');
    container.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
            <h3 class="mt-3">İlan Bulunamadı</h3>
            <p class="text-muted">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
            <a href="all-listings.html" class="btn btn-danger">Tüm İlanları Gör</a>
        </div>
    `;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}