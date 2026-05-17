# Mentor Career Consulting - Platform Kullanım Rehberi

Bu rehber, Mentor Career Consulting Yurtdışı Eğitim Danışmanlığı platformunun tüm kullanıcı rolleri için nasıl kullanılacağını ve iş akışlarını detaylandırmaktadır.

---

## 1. Giriş
Mentor Career Consulting, öğrencilerin yurtdışındaki eğitim hayallerini (Üniversite, Yüksek Lisans, Dil Okulu vb.) gerçeğe dönüştürmek için tasarlanmış profesyonel bir yönetim platformudur. Platform; başvuru takibi, belge yönetimi, danışman iletişimi ve kurumsal raporlama süreçlerini dijitalleştirir.

---

## 2. Kullanıcı Rolleri ve Yetki Matrisi

| Özellik | Öğrenci | Danışman | Acente Müdürü | CEO | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Program Arama & İnceleme | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kendi Başvurusunu Yönetme | ✅ | ✅ | ✅ | ✅ | ✅ |
| Atanan Öğrencileri Yönetme | ❌ | ✅ | ✅ | ✅ | ✅ |
| Belge Onaylama/Reddetme | ❌ | ✅ | ✅ | ✅ | ✅ |
| Teklif Hazırlama & Gönderme | ❌ | ✅ | ✅ | ✅ | ✅ |
| Komisyon Takibi | ❌ | ❌ | ✅ | ✅ | ✅ |
| Finansal Raporlar (Genel) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Kullanıcı & Sistem Yönetimi | ❌ | ❌ | ❌ | ❌ | ✅ |
| İçerik (Blog/Okul) Yönetimi | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 3. Öğrenci Kullanım Rehberi

Öğrenciler için platform, eğitim yolculuğunun her adımını şeffaf bir şekilde takip etme olanağı sunar.

### 3.1. Kayıt ve Giriş
- **Kayıt**: E-posta adresinizle hesap oluşturun.
- **Profil**: Dashboard üzerinden kişisel bilgilerinizi ve akademik geçmişinizi eksiksiz doldurun.

### 3.2. Program Bulucu (SmartFinder)
- Ana sayfadaki veya Dashboard'daki "Program Bulucu" aracını kullanarak bütçenize, dil seviyenize ve hedeflerinize uygun okulları saniyeler içinde filtreleyin.

### 3.3. Başvuru Süreci
1. **Teklif Al**: İlgilendiğiniz okul/program için "Teklif Al" butonuna basarak süreci başlatın.
2. **Durum Takibi**: Başvurunuzun durumunu (Taslak, Belge Bekleniyor, İncelemede, Teklif Gönderildi vb.) canlı olarak izleyin.
3. **Mesajlaşma**: Atanan danışmanınızla sistem içi mesajlaşma üzerinden doğrudan iletişim kurun.

### 3.4. Belge Yönetimi
- Gerekli belgeleri (Pasaport, Transkript, Dil Belgesi vb.) "Belgelerim" sekmesine yükleyin.
- Danışmanınızdan gelen onay veya revizyon taleplerini bildirimlerle takip edin.

---

## 4. Danışman (Advisor) Kullanım Rehberi

Danışmanlar, öğrencilerin tüm süreçlerini koordine eden ana kullanıcılardır.

### 4.1. Öğrenci ve Talep Takibi
- Size atanan öğrencilerin listesine "Öğrenciler" sekmesinden ulaşın.
- Yeni gelen "Teklif Taleplerini" inceleyerek süreci başlatın.

### 4.2. Başvuru Yönetimi
- Başvuru durumlarını aşamalı olarak güncelleyin:
    - **Draft / Docs Pending**: Eksik belgeler için öğrenciyi bilgilendirin.
    - **Under Review**: Kurumla yapılan görüşmeleri takip edin.
    - **Offer Sent**: Okuldan gelen resmi kabulü/teklifi sisteme yükleyerek öğrenciye iletin.

### 4.3. Takvim ve Randevu
- Öğrencilerle yapacağınız görüşmeleri "Takvim" üzerinden planlayın.
- Randevu taleplerini onaylayın veya revize edin.

---

## 5. Yönetici (Admin) Kullanım Rehberi

Sistemin "beyni" olan Admin paneli, tüm veri ve ayarların yönetildiği alandır.

### 5.1. İçerik Yönetimi
- **Ülkeler & Kurumlar**: Yeni okullar ekleyin, mevcutların fiyat ve özelliklerini güncelleyin.
- **Blog & Duyurular**: Platformda yayınlanacak güncel haberleri ve akademik yazıları yönetin.

### 5.2. Kullanıcı Yönetimi
- Yeni danışmanlar, acenteler ve yöneticiler tanımlayın.
- Rol yetkilerini ve atamaları kontrol edin.

### 5.3. Sistem Ayarları ve Loglar
- Tüm sistem aktivitelerini "Activity Log" üzerinden izleyerek güvenliği ve verimliliği sağlayın.

---

## 6. Kurumsal Takip (CEO ve Acente Müdürü)

### 6.1. CEO Dashboard
- Toplam başvuru sayıları, başarı oranları ve finansal beklentileri konsolide raporlar üzerinden takip edin.

### 6.2. Acente Müdürü
- Kendi acentenizin performansını izleyin.
- Danışmanların iş yükünü ve komisyon hak edişlerini yönetin.

---

## 7. Teknik Bilgiler ve Geliştirici Notları (Draft)

### 7.1. Başvuru Durumları (Workflows)
1. **DRAFT**: Başvuru henüz taslak aşamasında.
2. **DOCS_PENDING**: Gerekli belgelerin yüklenmesi bekleniyor.
3. **UNDER_REVIEW**: Danışman belgeleri incelemeye aldı.
4. **OFFER_SENT**: Kurumdan kabul alındı ve teklif iletildi.
5. **CONTRACT_SIGNED**: Öğrenci kabulü onayladı ve sözleşme imzalandı.
6. **COMPLETED**: Kayıt süreci başarıyla tamamlandı.

### 7.2. Mock Hesap Bilgileri
Geliştirme ve test süreçleri için varsayılan şifre: `password123`

- **Admin**: admin@starberatung.com
- **CEO**: ceo@starberatung.com
- **Advisor**: advisor@starberatung.com
- **Agency**: agency@starberatung.com
- **Student**: student@starberatung.com
