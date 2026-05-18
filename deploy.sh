#!/bin/bash
# Clean deployment script for Mentor-cc running on Port 3002
set -e

echo "🚀 Starting Mentor-cc Production Deployment..."

# 1. Pull latest changes
echo "📦 Pulling latest changes from master..."
git pull origin master

# 2. Reinstall dependencies and clean build cache
echo "🧹 Cleaning up old build cache & node_modules..."
rm -rf .next 2>/dev/null || true
# Always remove node_modules AND package-lock.json to prevent Windows/Linux binary mismatch
# (package-lock.json generated on Windows excludes Linux-native optional deps like lightningcss, swc)
rm -rf node_modules package-lock.json 2>/dev/null || true

echo "📦 Installing dependencies (Linux-native, with optional binaries)..."
npm install --legacy-peer-deps --include=optional --no-audit --no-fund

# 3. Prisma setup
echo "🗄️ Running Prisma generation & db push..."
npx prisma generate
npx prisma db push
echo "🌱 Seeding all users and institutions into the database..."
npx tsx prisma/seed-all.ts

# 4. Build application
echo "🏗️ Building Next.js application..."
export NEXT_DISABLE_SOURCEMAPS=1
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

# 5. Start or reload in PM2
echo "🔄 Reloading Mentor-cc in PM2..."
pm2 delete mentor-cc || true
pm2 start npm --name "mentor-cc" --max-memory-restart 600M --exp-backoff-restart-delay=100 -- run start -- -p 3002
pm2 save

echo "✨ Mentor-cc Deployment complete and running on port 3002!"
