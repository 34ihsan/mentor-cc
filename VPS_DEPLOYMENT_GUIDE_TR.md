# StarEducation VPS Dağıtım Rehberi (Türkçe)

Bu rehber, StarEducation projesini Hostinger VPS (Ubuntu/Debian) üzerinde, halihazırda başka bir web sitesi çalışıyorken nasıl yayına alacağınızı adım adım anlatır.

## 📋 Gereksinimler
- Hostinger VPS SSH Erişimi (Root veya Sudo yetkili kullanıcı).
- Temel Node.js, PM2 ve Nginx bilgisi (Zaten mevcut siteniz olduğu için bu hazırdır).
- GitHub Personal Access Token (Kodları VPS'e çekmek için).

---

## 🛠️ Adım 1: VPS'e Bağlanma ve Dizini Hazırlama

Önce terminalden VPS'inize bağlanın:
```bash
ssh root@vps_ip_adresiniz
```

Projenin yer alacağı klasörü oluşturun (örneğin `/var/www/` altında):
```bash
mkdir -p /var/www/stareducation
cd /var/www/stareducation
```

---

## 🏗️ Adım 2: Kodları GitHub'dan Çekme

Dosyaları klasöre çekin:
```bash
git clone https://github.com/34ihsan/Stareducation.git .
```
*(NOT: Eğer token hatası alırsanız, GitHub üzerinden bir PAT -Personal Access Token- oluşturup şifre kısmında onu kullanmalısınız.)*

---

## 🗄️ Adım 3: Veritabanı (PostgreSQL) Hazırlığı

Mevcut PostgreSQL'inizde bu proje için yeni bir veritabanı ve kullanıcı oluşturun:
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE stareducation_db;
CREATE USER stareducation_user WITH PASSWORD 'guclu_sifreniz';
GRANT ALL PRIVILEGES ON DATABASE stareducation_db TO stareducation_user;
\q
```

---

## 🔐 Adım 4: Ortam Değişkenleri (.env) Kurulumu

GitHub'da olmayan `.env` dosyasını VPS'te oluşturun:
```bash
cp .env.example .env
nano .env
```

Aşağıdaki alanları güncelleyin:
- `DATABASE_URL`: `postgresql://stareducation_user:guclu_sifreniz@localhost:5432/stareducation_db?schema=public`
- `AUTH_SECRET`: Rastgele güçlü bir dizi (örneğin: `openssl rand -base64 32`).
- `NEXT_PUBLIC_APP_URL`: `https://yeni-domaininiz.com`
- `SMTP` ayarlarını Hostinger e-posta bilgilerinizle doldurun.

---

## 🚀 Adım 5: Dağıtım Scriptini Çalıştırma

Hazırladığım otomatik dağıtım scriptini çalıştırın. Bu script bağımlılıkları yükleyecek, Prisma şemasını güncelleyecek ve projeyi build edecektir:
```bash
chmod +x DEPLOYS.sh
./DEPLOYS.sh
```

---

## 🌐 Adım 6: Nginx Yapılandırması (Yeni Site Ekleme)

Mevcut sitenizi bozmadan yeni bir konfigürasyon dosyası oluşturun:
```bash
sudo nano /etc/nginx/sites-available/stareducation
```

Projedeki `nginx.conf.template` içeriğini buraya yapıştırın ve şu alanları güncelleyin:
- `server_name`: `yeni-domaininiz.com www.yeni-domaininiz.com`
- `proxy_pass`: `http://localhost:3001;` (Bu proje 3001 portunda çalışacak şekilde ayarlandı).

Ardından siteyi aktif edin:
```bash
sudo ln -s /etc/nginx/sites-available/stareducation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 Adım 7: SSL (HTTPS) Kurulumu

Ücretsiz SSL sertifikası için Certbot kullanın:
```bash
sudo certbot --nginx -d yeni-domaininiz.com -d www.yeni-domaininiz.com
```

---

## 📈 İzleme

Sitenin durumunu şu komutla kontrol edebilirsiniz:
```bash
pm2 status
pm2 info star-education
pm2 logs star-education
```

**Tebrikler! Siteniz artık yayında.**
