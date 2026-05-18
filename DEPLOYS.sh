#!/bin/bash
set -e

# StarBeratung Ubuntu VPS Deployment Script (Standalone Mode)
# Usage: chmod +x DEPLOYS.sh && ./DEPLOYS.sh

echo "🚀 Starting StarBeratung Stabilization & Security Deployment..."

# 0. Security Cleanup (Anti-Crypto Mining)
echo "🛡️ Cleaning up unauthorized mining/scanning tools..."
pkill -f xmrig || true
rm -rf xmrig-6.21.0 xmrig.tar.gz scanner_linux exploited.log failed.log scanner_deployed.log

# 0.1 Server Hardening (Fail2Ban & Brute Force Protection)
echo "🛡️ Hardening server access with Fail2Ban..."
sudo apt-get install -y fail2ban
# Create a basic jail for SSH if it doesn't exist
if [ ! -f /etc/fail2ban/jail.local ]; then
    sudo bash -c 'cat <<EOF > /etc/fail2ban/jail.local
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
EOF'
fi
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban

# 1. OS Updates (Security Patching)
echo "🛡️ Updating OS packages..."
sudo apt update
# cloud-init is often 'held' on Hostinger/KVM. We allow changing held packages to fulfill the request.
sudo apt-get install -y --allow-change-held-packages cloud-init 
SWAP_SIZE=$(free -m | awk '/Swap/ {print $2}')
if [ "$SWAP_SIZE" -lt 1024 ]; then
    echo "⚠️ Low Swap space ($SWAP_SIZE MB). Attempting to create 2GB swap file for build stability..."
    if [ -f /swapfile ]; then
        sudo swapoff /swapfile || true
        sudo rm /swapfile || true
    fi
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo "✅ 2GB Swap file created and enabled."
else
    echo "✅ Sufficient swap memory detected ($SWAP_SIZE MB)."
fi

# 1. Environment Verification
echo "🔍 Verifying persistent environment..."
UPLOADS_DIR="/var/www/starberatung_uploads"
sudo mkdir -p "$UPLOADS_DIR"

# Move old uploads if they exist in the old location
if [ -d ~/starberatung_uploads ] && [ "$(ls -A ~/starberatung_uploads 2>/dev/null)" ]; then
    echo "📦 Migrating old uploads to new persistent location..."
    sudo cp -rn ~/starberatung_uploads/* "$UPLOADS_DIR/" || true
fi

sudo chown -R root:www-data "$UPLOADS_DIR"
sudo chmod -R 775 "$UPLOADS_DIR"

# Ensure public/uploads is a real directory (not a symlink) during build to satisfy Turbopack
if [ -L public/uploads ]; then
    rm public/uploads
fi
mkdir -p public/uploads

if [ ! -f .env ]; then
    echo "❌ Error: .env file not found."
    exit 1
fi

# 2. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found."
    exit 1
fi

# 3. Handle Dependency installation
echo "🧹 Cleaning up old build artifacts and cache..."
rm -rf .next out .next/cache 2>/dev/null || true

echo "📦 Installing dependencies (optimized)..."
npm install --legacy-peer-deps --no-audit --no-fund

# 4. Prisma Tasks
echo "🗄️ Running Prisma tasks..."
npx prisma generate
npx prisma migrate deploy
echo "🌱 Seeding all users and institutions into the database..."
npx tsx prisma/seed-all.ts

# 5. Build the application (MAXIMUM HARDENING)
echo "🏗️ Building the Next.js application..."
echo "💡 Optimization: Source Maps disabled to save CPU."
# Disabling sourcemaps significantly reduces CPU/RAM during build
export NEXT_DISABLE_SOURCEMAPS=1
export NODE_OPTIONS="--max-old-space-size=4096" # Increased to use available 8GB RAM better
nice -n 15 npm run build

# 6. PM2 Process Management
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# 6. Standalone Server Hazırlığı
echo "📂 Preparing standalone server files..."
# Create target directory and copy static files
mkdir -p .next/standalone/.next/static
cp -rf .next/static/* .next/standalone/.next/static/
mkdir -p .next/standalone/public
cp -rf public/* .next/standalone/public/ 2>/dev/null || true

# Middleware sync (Ensure root middleware is used)
if [ -f "middleware.ts" ]; then
    echo "✅ Root middleware detected."
fi

# 🔗 SYMLINK FIX
echo "🔗 Handing uploads..."
mkdir -p .next/standalone/public/uploads

# 8. Start/Reload PM2
echo "🔄 Deploying with PM2 (Standalone Mode)..."
# Check if pm2.config.json or ecosystem.config.js exists
if [ -f "pm2.config.json" ]; then
    pm2 delete star-beratung || true
    pm2 start pm2.config.json --env production
elif [ -f "ecosystem.config.js" ]; then
    pm2 delete star-beratung || true
    pm2 start ecosystem.config.js --env production
else
    pm2 delete star-beratung || true
    pm2 start "node .next/standalone/server.js" --name star-beratung
fi

# 9. Firewall (UFW) Health Check
echo "🔥 Ensuring Firewall is healthy..."
sudo ufw allow 80/tcp || true
sudo ufw allow 443/tcp || true
sudo ufw allow 3000/tcp || true
sudo ufw --force enable || true

pm2 save
echo "✨ Deployment complete! Site should be live at port 3000."

# 10. Automated Health Check
echo "🔍 Running final health check..."
sleep 5
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health || echo "failed")
if [ "$HEALTH_CHECK" == "200" ]; then
    echo "✅ Health check PASSED (HTTP 200)"
else
    echo "❌ Health check FAILED (HTTP $HEALTH_CHECK)"
    echo "Checking logs..."
    pm2 logs star-beratung --lines 20 --nostream
fi

echo "Check CPU usage with: top"
