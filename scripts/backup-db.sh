#!/bin/bash
set -euo pipefail

# ── Ayarlar ──────────────────────────────────────────────────────────
DB_NAME="starberatung"
DB_USER="postgres"
BACKUP_DIR="/var/backups/starberatung"
RETENTION_DAYS=7
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_$TIMESTAMP.sql.gz"

# ── Klasörü oluştur ──────────────────────────────────────────────────
mkdir -p "$BACKUP_DIR"

# ── Yedek al ─────────────────────────────────────────────────────────
echo "[$(date)] Yedek alınıyor: $BACKUP_FILE"
sudo -u postgres pg_dump "$DB_NAME" | gzip > "$BACKUP_FILE"

# ── Eski yedekleri sil ───────────────────────────────────────────────
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "[$(date)] $RETENTION_DAYS günden eski yedekler silindi."

# ── Opsiyonel: Uzak sunucuya veya S3'e yükle ─────────────────────────
# aws s3 cp "$BACKUP_FILE" "s3://starberatung-backups/"

echo "[$(date)] ✅ Yedek tamamlandı: $BACKUP_FILE"
