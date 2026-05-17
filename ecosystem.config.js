require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'star-beratung',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 2,           // 'max' yerine 2: crash döngüsünü sınırlar
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        ...process.env
      },
      listen_timeout: 15000,
      kill_timeout: 5000,
      wait_ready: true,

      // ── Crash Recovery ──────────────────────────────────────────
      // Çöküşten 3 saniye sonra yeniden başlat (anlık döngüyü önler)
      restart_delay: 3000,
      // Arka arkaya max 10 crash sonra PM2 durur ve bildirim gönderir
      max_restarts: 10,
      // 10 saniyeden az yaşarsa "crash" sayılır (yanlış pozitifi önler)
      min_uptime: '10s',
      // Exponential backoff: her restart'ta bekleme süresini artır
      exp_backoff_restart_delay: 100,

      // ── Loglar ─────────────────────────────────────────────────
      error_file: './.logs/pm2-error.log',
      out_file: './.logs/pm2-out.log',
      merge_logs: true,
      time: true
    }
  ]
};

