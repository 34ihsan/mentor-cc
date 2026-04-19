#!/bin/bash
set -e

# StarEducation Ubuntu VPS Deployment Script (PM2 Mode)
# Usage: chmod +x DEPLOYS.sh && ./DEPLOYS.sh

echo "🚀 Starting StarEducation Production Deployment..."

# 0. Sync with GitHub
echo "🔄 Pulling latest changes from GitHub..."
git fetch origin
git reset --hard origin/master

# 0.1 Firewall
echo "🛡️ Opening port 3005..."
sudo ufw allow 3005/tcp || true

# 0. Health Check & Hardening: Swap Memory
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
echo "🧹 Cleaning up old build artifacts..."
rm -rf .next out logs 2>/dev/null || true
mkdir -p logs

echo "📦 Installing dependencies (optimized)..."
npm install --legacy-peer-deps --no-audit --no-fund

# 4. Prisma Tasks
echo "🗄️ Running Prisma tasks..."
npx prisma generate
npx prisma migrate deploy

# 5. Build the application (MAXIMUM HARDENING)
echo "🏗️ Building the Next.js application..."
echo "💡 Optimization: Source Maps disabled to save CPU."
export NEXT_DISABLE_SOURCEMAPS=1
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

# 6. PM2 Process Management
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Prepare static assets for standalone server
echo "📂 Preparing standalone server files..."
cp -r public .next/standalone/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/ 2>/dev/null || true

echo "🔄 Restarting application with PM2 (Ecosystem Mode)..."
pm2 restart ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

pm2 save
echo "✨ Deployment complete! Site should be live."
echo "Check status with: pm2 status star-education"
