#!/bin/bash
set -euo pipefail

echo "🚀 Deploy başlıyor..."

# 0. GÜVENLİK ADIMI: Önce veritabanı yedeği al (Mevcut veriyi koruma)
echo "🛡️ Olası bir hataya karşı veritabanı yedeği alınıyor..."
# backup-db.sh scriptini çalıştırıyoruz. Eğer hata verirse deploy işlemi (set -e sayesinde) durdurulur!
bash ./scripts/backup-db.sh

# 1. Kodları çek (Sadece kod dosyalarını günceller, .env veya /public/uploads gibi yoksayılan dosyaları ellemez)
echo "1️⃣ Kodlar çekiliyor..."
git pull origin main

# 2. Bağımlılıkları güncelle 
echo "2️⃣ Bağımlılıklar yükleniyor..."
rm -f package-lock.json
npm install --legacy-peer-deps --no-save

# 3. Veritabanı Şemasını Güncelle (Sadece GÜVENLİ güncellemeleri yapar, veriyi silmez)
echo "3️⃣ Veritabanı migrate ediliyor (migrate deploy)..."
npx prisma migrate deploy

# 3.5. Prisma Client'ı yeniden oluştur (yeni alanların TypeScript'te tanınması için)
echo "3.5️⃣ Prisma Client generate ediliyor..."
npx prisma generate

# 4. Next.js Build al
echo "4️⃣ Proje build alınıyor..."
npm run build

# 5. PM2 Zero-Downtime Reload (Kullanıcıları kesintiye uğratmadan yeni koda geçiş)
echo "5️⃣ PM2 ile yeniden başlatılıyor..."
pm2 reload star-beratung --update-env

echo "✅ Deploy başarıyla tamamlandı ve veri güvenliği sağlandı!"
pm2 status star-beratung

