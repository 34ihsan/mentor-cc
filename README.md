# 🌟 Star Education Consulting
## Enterprise-Grade Cosmic Obsidian & Aurora Neon UI/UX

![StarEducation Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)

> **"Navigate your global future with strategic precision."**
> Star Education is an elite academic consultancy hub. This platform leverages a futuristic dark-mode design system, high-performance SEO architecture, and a secure multi-role ERP to manage global student placements.

---

## 🛠️ TECH STACK (V3.0 REDESIGN)

Built for speed, security, and extreme visual impact:

*   **Runtime**: [Next.js 15 (App Router)](https://nextjs.org/) - Advanced SSR/ISR.
*   **Design System**: [Tailwind CSS v4](https://tailwindcss.com/) - Custom "Cosmic Obsidian" utility engine.
*   **Database**: [Prisma 7](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/).
*   **Security & Auth**: [Auth.js v5](https://authjs.dev/) - Granular RBAC (Admin, CEO, Advisor, Agency, Student).
*   **Motion**: [Framer Motion](https://www.framer.com/motion/) - Magnetic interactions and neon transitions.
*   **Localization**: `next-intl` - Dynamic Multi-language Support (TR/EN).
*   **Monitoring**: [Sentry](https://sentry.io/) - Enterprise error tracking.

---

## 🏛️ ARCHITECTURE: 3-LAYER ORCHESTRATION

```mermaid
graph TD
    UI[Frontend: Next.js 15] --> API[Backend: Server Actions/APIs]
    API --> DB[(Prisma 7 & PostgreSQL)]
    UI --> GS[Global Styles: Cosmic Obsidian v3.0]
    
    subgraph "Design Tokens"
    GS --> AO[Asymmetric Geometry: 10rem]
    GS --> NT[Neon Turquoise Accents]
    GS --> GL[Glassmorphism Layers]
    end

    subgraph "Application Flow"
    P[Public Portal] --> F[Smart Finder]
    F --> D[Dashboard/ERP]
    D --> R[RBAC Core]
    end
```

---

## 🔗 DATABASE RELATIONSHIPS (ERD)

```mermaid
erDiagram
    USER ||--o{ PROFILE : "1:1"
    USER ||--o{ APPLICATION : "Student/Agency/Advisor"
    USER ||--o{ ACTIVITY_LOG : "Traceability"
    USER ||--o{ MESSAGE : "Real-time Sync"
    USER ||--o{ COMMISSION : "ERP Finance"
    
    INSTITUTION ||--o{ PROGRAM : "Academic Offers"
    PROGRAM ||--o{ APPLICATION : "Placement Pipe"
    
    COUNTRY ||--o{ INSTITUTION : "Regional Support"
    SERVICE ||--o{ INSTITUTION : "Classification"
    
    APPLICATION ||--o{ DOCUMENT : "KYC/Compliance"
    APPLICATION ||--o{ OFFER : "Lifecycle"
    OFFER ||--o| CONTRACT : "Legal Binding"
```

---

## 🛡️ SECURITY & VPS HARDENING (HOSTINGER UBUNTU)

This platform implements enterprise-level security to prevent leaks, scraping, and unauthorized access.

### 1. External Penetration Prevention (Nginx)
The included `nginx.conf.template` filters out common exploit attempts:
- **Exploit Blocks**: Automatically drops requests containing `eval(`, `base64_decode`, `.env`, `.git`.
- **Anti-Scraping**: High-frequency user-agent monitoring and rate-limiting.
- **PHP Masking**: Blocks direct hits to `.php` files to mitigate legacy CMS scanners.

### 2. System Hardening (Ubuntu)
```bash
# Firewall Setup
sudo ufw default deny incoming
sudo ufw allow 2222/tcp # Custom SSH Port
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Fail2Ban Activation
sudo apt install fail2ban
# Configuration: /etc/fail2ban/jail.local
# [sshd] port = 2222; maxretry = 3
```

### 3. Application Security (Next.js)
- **CSP**: Strict Content Security Policy avoiding `unsafe-eval`.
- **CSRF**: Built-in protection via Auth.js v5.
- **RBAC**: Middleware-enforced role checks for all dashboard routes.

---

## 📡 ENVIRONMENT CONFIGURATION

| KEY | FORMAT | PURPOSE |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://user:pass@host:port/dbname?sslmode=require` | Core persistence |
| `AUTH_SECRET` | `32-char high-entropy string` | Session encryption |
| `NEXT_PUBLIC_SENTRY_DSN` | `https://hash@ingest.sentry.io/id` | Performance & Errors |
| `NEXT_PUBLIC_SITE_URL` | `https://yoursite.com` | Metadata & Auth Redirects |

---

## 🚀 DEPLOYMENT: THE "STRIKE" PROTOCOL

1. **Clone & Install**: `git clone` && `npm install`
2. **Environment**: Copy `.env.template` to `.env` and fill variables.
3. **Database**: `npx prisma generate` && `npx prisma db push`
4. **Build**: `npm run build`
5. **Orchestrate**: `pm2 start ecosystem.config.js`

---

## 📍 AGENT WORKSPACE (INTERNAL LOG)

### CURRENT STATUS: ALPHA V3.0 (COMPLETED)
*   **Aesthetics**: Migrated to "Cosmic Obsidian & Aurora Neon".
*   **Layout**: Extreme asymmetry implemented on Home and Dashboard.
*   **Security**: Hardening logic documented and ready for VPS deployment.
*   **SmartFinder**: Fully modernized with obsidian glassmorphism.

### REMAINING TASKS
- [ ] Final multi-currency CRM widget optimization.
- [ ] Integration test for the Hostinger deployment script.

---
**© 2026 Star Education Consulting | Enterprise Academic Orchestration**
 ve Premium UI dökümantasyonu standartlaştırıldı.

### 📝 Devam Edilecek Konular (Backlog)
- [ ] Dashboard ekranlarındaki istatistik kartlarının dinamik hale getirilmesi.
- [ ] Blog modülüne resim yükleme (Cloudinary/S3) entegrasyonu.
- [ ] Çoklu para birimi desteğinin (Multi-currency) ERP tarafında aktifleştirilmesi.

### 🤖 AI / İnsan Devam Protokolü
Her yeni oturum açıldığında, AI ajanı bu `README.md` dosyasını okuyarak projenin kapsamını anlar ve **"Ajan Çalışma Alanı"** bölümündeki "Aktif Görev"den devam eder.

---
*© 2026 Star Education Consulting. All rights reserved.*
