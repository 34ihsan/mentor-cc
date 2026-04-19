# StarBeratung Remote Deployment Automation
# This script pushes local changes to GitHub and then triggers the deployment script on the VPS.

$vps_ip = "72.62.94.83"
$vps_user = "root"
$vps_path = "/var/www/StarBeratung_db"

Write-Host "🚀 Starting StarBeratung Remote Deployment..." -ForegroundColor Cyan

# 1. Sync with GitHub
Write-Host "📦 Pushing latest changes to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "chore: sync design and content to production"
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git push failed. Please check for conflicts." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 2. Trigger VPS Update
Write-Host "🌐 Connecting to VPS ($vps_ip) to trigger update..." -ForegroundColor Yellow
Write-Host "This will run: git pull, npx prisma db seed, and npm run build on the server." -ForegroundColor Gray

ssh "$vps_user@$vps_ip" "cd $vps_path && git pull origin main && chmod +x DEPLOYS.sh && ./DEPLOYS.sh"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ SUCCESS! StarBeratung is now updated on the live server." -ForegroundColor Green
    Write-Host "Check it out at: http://starberatung.com" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment failed on the VPS. Please check the SSH output above." -ForegroundColor Red
}
