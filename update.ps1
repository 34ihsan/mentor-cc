# StarBeratung Windows Update Script (PowerShell)
# Usage: .\update.ps1

$ErrorActionPreference = "Stop"

function Write-Step($title) {
    Write-Host "`n🚀 Step: $title" -ForegroundColor Cyan
}

function Write-Success($msg) {
    Write-Host "✅ $msg" -ForegroundColor Green
}

function Write-ErrorMsg($msg) {
    Write-Host "❌ $msg" -ForegroundColor Red
}

try {
    Write-Host "----------------------------------------------------"
    Write-Host "  StarBeratung Automation: Site Update Starting     "
    Write-Host "----------------------------------------------------"

    # 1. Environment Check
    Write-Step "Checking Environment"
    if (-not (Test-Path ".env")) {
        Write-ErrorMsg "Error: .env file not found."
        Write-Host "💡 Action: Copy .env.example to .env and fill in credentials."
        exit 1
    }
    Write-Success ".env found."

    # 2. Git Fetch & Pull
    Write-Step "Syncing with Repository (Main Branch)"
    git fetch origin
    git pull origin main
    Write-Success "Git sync complete."

    # 3. Clean and Install Dependencies
    Write-Step "Installing Dependencies (npm install)"
    # Using --legacy-peer-deps to handle package conflicts specifically for this project
    npm install --legacy-peer-deps
    Write-Success "Dependencies installed."

    # 4. Prisma Generation & Migration
    Write-Step "Updating Database (Prisma)"
    npx prisma generate
    npx prisma migrate deploy
    Write-Success "Database schema and client updated."

    # 5. Build Project
    Write-Step "Building Application (npm run build)"
    npm run build
    Write-Success "Production build complete."

    Write-Host "`n----------------------------------------------------" -ForegroundColor Gray
    Write-Host "✨ ALL STEPS COMPLETED SUCCESSFULLY! ✨" -ForegroundColor Green
    Write-Host "----------------------------------------------------" -ForegroundColor Gray
    Write-Host "Final Action: If you use PM2, run 'pm2 restart star-beratung'"
    Write-Host "Otherwise, start with 'npm start' or your preferred command.`n"

} catch {
    Write-ErrorMsg "CRITICAL ERROR: $($_.Exception.Message)"
    Write-Host "`n💡 Deployment halted due to error." -ForegroundColor Yellow
    exit 1
}
