# EmailJS Kurulum Rehberi - Katipoğlu Gayrimenkul

## Adım 1: EmailJS Hesabı Oluşturun
1. https://www.emailjs.com adresine gidin
2. "Sign Up" ile ücretsiz hesap açın
3. Email adresinizi doğrulayın

## Adım 2: Email Servis Sağlayıcı Ekleyin
1. Dashboard'da "Email Services" bölümüne gidin
2. "Add New Service" butonuna tıklayın
3. Outlook/Hotmail seçin (mehmet.dusunen@outlook.com için)
4. Şu bilgileri girin:
   - Service Name: "Outlook Service" 
   - Email: mehmet.dusunen@outlook.com
   - Password: Email şifreniz (uygulama şifresi önerilir)

## Adım 3: Email Template Oluşturun
1. "Email Templates" bölümüne gidin
2. "Create New Template" butonuna tıklayın
3. Template Name: "Contact Form Template"
4. Şu template'i kullanın:

```
Konu: Katipoğlu Gayrimenkul - İletişim Formu

Yeni bir iletişim formu mesajı geldi:

İsim: {{from_name}}
Email: {{from_email}} 
Telefon: {{phone}}
Konu: {{subject}}

Mesaj:
{{message}}

---
Bu mesaj Katipoğlu Gayrimenkul web sitesi iletişim formu üzerinden gönderildi.
Yanıtlamak için: {{reply_to}}
```

## Adım 4: Kodda Değiştirmeniz Gerekenler
contact.html dosyasında şu satırları güncelleyin:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // EmailJS Dashboard'dan alacağınız Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

## Public Key ve ID'leri Nereden Bulacaksınız:
- **Public Key**: Account > API Keys > Public Key
- **Service ID**: Email Services > Your Service > Service ID
- **Template ID**: Email Templates > Your Template > Template ID

## Test Etmek İçin:
1. Web sitenizi açın
2. İletişim formu doldurun
3. "Mesajı Gönder" butonuna tıklayın
4. mehmet.dusunen@outlook.com adresine email gelecek

## Güvenlik Notları:
- Public Key'i paylaşmakta sakınca yoktur
- Outlook için 2FA açık ise "uygulama şifresi" kullanın
- EmailJS ayda 200 email ücretsiz gönderim hakkı verir

## Sorun Giderme:
- Console'da hata varsa kontrol edin
- Email gelmiyorsa spam klasörüne bakın
- Template değişkenleri {{}} içinde olmalı

---
Kurulum tamamlandıktan sonra form çalışmaya hazır olacak!