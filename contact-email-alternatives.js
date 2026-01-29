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


function sendViaWhatsApp(formData) {
    const message = `
Merhaba! Katipoğlu Gayrimenkul web sitesi üzerinden iletişime geçiyorum.

İsim: ${formData.firstName} ${formData.lastName}
Telefon: ${formData.phone}
Email: ${formData.email}
Konu: ${formData.subject}

Mesaj: ${formData.message}
    `;
    
    const whatsappLink = `https://wa.me/905528859792?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

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
}

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

async function submitContactForm(formData) {
    try {
        await emailjs.send('your_service_id', 'your_template_id', formData);
        return { success: true, method: 'EmailJS' };
    } catch (emailError) {
        console.warn('EmailJS failed, trying alternatives:', emailError);
        try {
            await sendToBackend(formData);
            return { success: true, method: 'Backend' };
        } catch (backendError) {
            console.warn('Backend failed, using fallback methods:', backendError);
            saveFormData(formData);
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitContactForm,
        sendEmailViaMailto,
        sendViaWhatsApp,
        saveFormData
    };
}