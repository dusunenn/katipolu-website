// Alternatif Email Çözümleri - contact-email-alternatives.js

// 1. Mailto yaklaşımı (EmailJS yerine kullanılabilir)
function sendEmailViaMailto(formData) {
    const subject = `Katipoğlu Gayrimenkul - ${formData.subject || 'İletişim Formu'}`;
    const body = `
İsim: ${formData.firstName} ${formData.lastName}
Telefon: ${formData.phone}
Email: ${formData.email}
Konu: ${formData.subject}

Mesaj:
${formData.message}

---
Bu mesaj Katipoğlu Gayrimenkul web sitesi üzerinden gönderilmiştir.
    `;
    
    const mailtoLink = `mailto:mehmet.dusunen@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
}

// 2. WhatsApp alternativi
function sendViaWhatsApp(formData) {
    const message = `
Merhaba! Katipoğlu Gayrimenkul web sitesi üzerinden iletişime geçiyorum.

İsim: ${formData.firstName} ${formData.lastName}
Telefon: ${formData.phone}
Email: ${formData.email}
Konu: ${formData.subject}

Mesaj: ${formData.message}
    `;
    
    const whatsappLink = `https://wa.me/905305542001?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// 3. Form verilerini localStorage'a kaydetme (yedek)
function saveFormData(formData) {
    const timestamp = new Date().toISOString();
    const savedData = {
        ...formData,
        timestamp,
        id: Date.now()
    };
    
    let savedForms = JSON.parse(localStorage.getItem('contactForms') || '[]');
    savedForms.push(savedData);
    localStorage.setItem('contactForms', JSON.stringify(savedForms));
    
    console.log('Form data saved to localStorage:', savedData);
}

// 4. Basit backend endpoint (gerekirse)
async function sendToBackend(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Backend error');
        }
    } catch (error) {
        console.error('Backend submission failed:', error);
        throw error;
    }
}

// Ana fonksiyon - multiple fallback ile
async function submitContactForm(formData) {
    try {
        // Önce EmailJS deneyin
        await emailjs.send('your_service_id', 'your_template_id', formData);
        return { success: true, method: 'EmailJS' };
    } catch (emailError) {
        console.warn('EmailJS failed, trying alternatives:', emailError);
        
        try {
            // Backend'e göndermeyi deneyin
            await sendToBackend(formData);
            return { success: true, method: 'Backend' };
        } catch (backendError) {
            console.warn('Backend failed, using fallback methods:', backendError);
            
            // Verileri localStorage'a kaydedin
            saveFormData(formData);
            
            // Kullanıcıya seçenek sunun
            const useWhatsApp = confirm('Email gönderilemedi. WhatsApp ile gönderelim mi?');
            if (useWhatsApp) {
                sendViaWhatsApp(formData);
                return { success: true, method: 'WhatsApp' };
            } else {
                sendEmailViaMailto(formData);
                return { success: true, method: 'Mailto' };
            }
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitContactForm,
        sendEmailViaMailto,
        sendViaWhatsApp,
        saveFormData
    };
}