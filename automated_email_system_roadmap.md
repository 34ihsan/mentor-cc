# 🗺️ Otomatik E-Posta Tetikleme & Müşteri Deneyimi Yol Haritası (Automated Email System Roadmap)

Bu belge, **Mentor Career Consulting** platformunda müşteri memnuniyetini zirveye taşımak, yurtdışı eğitim, vize ve denklik süreçlerindeki operasyonel yükü azaltmak ve müşterilerle sürekli, profesyonel bir iletişim kanalı kurmak için tasarlanmış **Otomatik E-Posta Tetikleme & Deneyim Sistemini** açıklar.

---

## 🎯 Temel Hedefler
- **Sıfır Gecikme:** Durum değişikliklerinde (Kabul mektubu, eksik evrak vb.) anında bilgilendirme.
- **Marka Güveni:** Tüm yazışmalarda kurumsal, tutarlı ve kurumsal kimliğe uygun premium görsel tasarım.
- **Operasyonel Verimlilik:** Danışmanların manuel e-posta gönderme yükünü ortadan kaldırarak insan hatasını minimize etme.

---

## 🗺️ 1. Akıllı E-Posta Tetikleyicileri (Trigger Matrix)

Veritabanındaki durum değişimleri, hazırladığımız gelişmiş e-posta şablonlarını tamamen otomatik olarak tetikleyecektir:

| İş Akışı / Senaryo | Tetikleyici Durum (Database Trigger) | Gönderilecek Şablon | Kod İçi Entegrasyon Noktası | Oluşturacağı Etki & Amaç |
| :--- | :--- | :--- | :--- | :--- |
| **1. Üye Karşılama** | Sisteme yeni bir öğrenci veya acente kaydolduğunda. | `WELCOME` | `src/app/api/register/route.ts` | Marka sadakati oluşturma ve sisteme hızlı adaptasyon (Onboarding). |
| **2. İletişim / Reklam** | Siteden yeni bir iletişim formu gönderildiğinde. | `CONTACT_REPLY` | `src/app/api/public/contact/route.ts` | Güven oluşturma: *"Talebiniz alındı, 24 saat içinde döneceğiz."* |
| **3. Eksik Belge Uyarısı** | Danışman başvuru durumunu `DOCS_PENDING` yaptığında. | `DOCUMENT_PENDING` | `src/app/api/applications/[id]/route.ts` | Sürecin eksik evrak nedeniyle gecikmesini engelleme. |
| **4. Üniversite Kabulü** | Sisteme resmi kabul mektubu yüklenip durum `OFFER_SENT` olduğunda. | `OFFER_READY` | `src/app/api/offers/route.ts` | Büyük heyecan paylaşımı + Kayıt depozitosu için hızlı yönlendirme. |

---

## 🚀 2. Eklenebilecek Gelişmiş & Katma Değerli Özellikler (Recommended Features)

Müşteri deneyimini daha da ileriye taşımak için e-posta sistemine entegre edilebilecek ek akıllı özellikler ve tetikleyiciler aşağıda sıralanmıştır:

### 🛡️ A. GDPR Veri Saklama Süresi ve Silme Uyarısı (`GDPR_RETENTION_NOTICE`)
*   **Tetikleyici:** Yüklenen evrakın saklama süresinin dolmasına 30 gün kaldığında (Cron Job).
*   **Amaç:** Kullanıcıya yüklediği hassas belgelerin (Pasaport, Diploma vb.) güvenlik ve KVKK/GDPR gereği silineceğini bildirmek ve gerekirse indirmesi için süre tanımak.
*   **Etki:** Yüksek yasal uyumluluk ve güvenlik algısı.

### 📅 B. Akıllı Randevu Onay ve Hatırlatıcıları (`APPOINTMENT_CONFIRMED` / `REMINDER`)
*   **Tetikleyici:** Bir danışman öğrenciyle randevu onayladığında veya randevuya 24 saat/1 saat kaldığında.
*   **İçerik:** Randevu saati, platform linki (Google Meet/Zoom), görüşme konusu ve danışman bilgileri.
*   **Etki:** Danışmanlık randevularına katılım oranını (show-up rate) %40 oranında artırır.

### 🛂 C. Vize Süreci Aşama Bildirimleri (`VISA_STEP_UPDATE`)
*   **Tetikleyici:** Vize takip modülündeki adımlardan biri (`Vize Hazırlığı`, `Randevu Alındı`, `Sonuç Bekleniyor`) güncellendiğinde.
*   **İçerik:** *"Vize başvurunuz için randevunuz başarıyla alındı! Randevu Tarihi: [Tarih]. Hazırlamanız gereken son evraklar..."*
*   **Etki:** Öğrencinin en stresli olduğu vize sürecinde şeffaf ve anlık bilgilendirme sağlayarak çağrı merkezi yükünü azaltır.

### 📑 D. Dinamik Eksik Belge Listesi (`DYNAMIC_MISSING_DOCS`)
*   **Tetikleyici:** Danışman başvuruyu `DOCS_PENDING` olarak işaretlediğinde sadece genel bir uyarı yerine, **veritabanından eksik olan belgelerin listesini çekerek** e-postanın içerisine otomatik ekler.
*   **Etki:** Müşterinin tek tek "Hangi belgem eksik?" diye sormasını engeller, süreci günlerce hızlandırır.

### 🤝 E. Acente / Danışman Atama Uyarısı (`LEAD_ASSIGNED`)
*   **Tetikleyici:** CEO veya Admin sisteme düşen yeni bir başvuruyu (Lead) belirli bir danışmana veya acenteye atadığında.
*   **Gönderilen Kişi:** İlgili Danışman / Acente.
*   **İçerik:** *"Yeni sıcak başvuru atandı! [Öğrenci Adı] isimli öğrenci [Ülke/Program] ile ilgileniyor. Hemen iletişime geçin."*
*   **Etki:** Müşteriye dönüş süresini (Lead Response Time) minimuma indirir.

---

## 🛠️ 3. Teknik Mimari & Veritabanı Uyumlaması

E-posta sistemi projenizdeki mevcut güçlü **Nodemailer + Prisma** altyapısı üzerine inşa edilmiştir.

### 🎨 Görsel Tasarım Sistemi
Tüm e-postalar, **Mentor Career**'in premium kurumsal renk şemasını (Lacivert: `#0B1751` ve Altın Sarısı: `#B4943E`) kullanan, mobil uyumlu ve modern HTML şablonları (`wrapInBase`) ile otomatik sarmalanır.

### 🧬 Örnek Veritabanı Şablonları (EmailTemplate)

Sistemde dinamik değişkenleri yerleştirmek için `{{isim}}`, `{{program}}`, `{{kurum}}` gibi yer tutucular kullanılır. 

```prisma
// Örnek Şablon Kaydı (DOCUMENT_PENDING)
EmailTemplate {
  type: "DOCUMENT_PENDING",
  name: "Eksik Evrak Bildirimi",
  subject: "Başvurunuz İçin Eksik Evrak Bulunmaktadır - Mentor Career",
  body: "Merhaba {{isim}}, <br/><br/><b>{{program}}</b> başvurunuz danışmanlarımız tarafından incelenmiş ve sürecin devam edebilmesi için eksik/güncellenmesi gereken belgeler olduğu tespit edilmiştir. Lütfen en kısa sürede profilinize giriş yaparak gerekli belgeleri yükleyiniz."
}
```

---

> [!IMPORTANT]
> **Tavsiye Edilen Dağıtım Adımları:**
> 1. `src/lib/mail.ts` dosyasına yeni yardımcı fonksiyonları (`sendDocsPendingEmail`, `sendOfferReadyEmail`) entegre etmek.
> 2. API ve Action dosyalarında ilgili durum değişikliklerinin yapıldığı satırlara bu fonksiyonları asenkron çağrılar olarak yerleştirmek.
> 3. E-posta şablonlarının ilk kurulum esnasında veritabanında bulunmaması ihtimaline karşı kodda her zaman **güvenli HTML şablonu (fallback)** yapısını korumak.
