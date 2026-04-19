# Star Beratung - VPS Canlıya Alma Özeti

Star Beratung platformu Hostinger VPS (Ubuntu 24.04) üzerine başarıyla kuruldu ve yayına alındı.

## 🚀 Başarı ile Tamamlanan Adımlar
1.  **Sunucu Hazırlığı:** Node.js v20 ve PM2 kuruldu.
2.  **Veritabanı:** PostgreSQL (`starberatung_db`) yapılandırıldı, kullanıcı yetkileri ve şema senkronizasyonu tamamlandı.
3.  **Next.js 15 Geçişi:** Kod tabanı Next.js 15'in asenkron `params` yapısına uyarlandı ve TypeScript hataları giderildi.
4.  **Nginx:** Ters vekil sunucu (Reverse Proxy) olarak yapılandırıldı ve statik dosya sunumu optimize edildi.
5.  **Build:** Uygulama başarıyla derlendi ve PM2 ile servis edildi.

## 🌐 Erişim Bilgileri
-   **Canlı IP:** [http://72.62.94.83](http://72.62.94.83)
-   **Proje Yolu:** `/var/www/StarBeratung_db`

## 🛠 Bakım Komutları
-   **Logları İzleme:** `pm2 logs star-beratung`
-   **Yeniden Başlatma:** `pm2 restart star-beratung`
-   **Yeni Kod Çekme:** `git pull && npm run build && pm2 restart star-beratung`

## 📝 Son Notlar
-   Şu an site **HTTP** üzerinden çalışmaktadır. Bir domain yönlendirildiğinde **Certbot (SSL)** kurulumu yapılması önerilir.
-   `DATABASE_URL` sunucudaki `.env` dosyasında güvenli bir şekilde saklanmaktadır.

**Star Beratung artık yayında!**
