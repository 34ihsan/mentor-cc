## [2026-05-08 18:50] - Sed command not found on Windows

- **Type**: Agent
- **Severity**: Low
- **File**: `N/A`
- **Agent**: Antigravity
- **Root Cause**: Attempted to use `sed` in a Windows environment where it was not installed or in the PATH.
- **Error Message**: 
  ```
  sed : Die Benennung "sed" wurde nicht als Name eines Cmdlet, einer Funktion, einer Skriptdatei oder eines ausführbaren 
  Programms erkannt.
  ```
- **Fix Applied**: Used PowerShell's `Get-Content` and `-replace` operator to perform bulk text replacements in documentation and script files.
- **Prevention**: Always check for tool availability on the target OS before using platform-specific commands, or use cross-platform tools like Node.js scripts or PowerShell for file manipulations on Windows.
- **Status**: Fixed

---

## [2026-05-17 22:44] - ClientFetchError / Middleware 500 (Internal Server Error) in Edge Runtime

- **Type**: Runtime
- **Severity**: High
- **File**: `src/auth.config.ts:40`
- **Agent**: Antigravity
- **Root Cause**: Next-Auth v5 `jwt` callback runs inside the Next.js middleware which uses the Edge Runtime. Trying to import or invoke `cookies()` from `next/headers` inside Edge Runtime is unsupported and throws a fatal error, crashing the session endpoint with a 500 status.
- **Error Message**: 
  ```
  ClientFetchError: Unexpected token 'I', "Internal S"... is not valid JSON. Read more at https://errors.authjs.dev#autherror
  GET http://localhost:3000/ 500 (Internal Server Error)
  ```
- **Fix Applied**: Restricted checking of impersonation cookies in `auth.config.ts` using `process.env.NEXT_RUNTIME !== "edge"` to skip the check when running in the Edge Runtime/middleware while safely executing it in Node.js runtime (API routes, server components).
- **Prevention**: Never invoke server-exclusive dynamic headers/cookies routines inside Next.js configuration blocks that are shared with or run inside the Edge-runtime Middleware.
- **Status**: Fixed

---

## [2026-05-17 23:05] - Missing i18n keys for destinations in tr and en locales

- **Type**: Logic
- **Severity**: Medium
- **File**: `src/app/[locale]/(public)/rotalar/page.tsx:21`
- **Agent**: Antigravity
- **Root Cause**: The Rotalar page and metadata generator tried to resolve translation keys `Navbar.destinations` and `Navbar.ulkeler` which were not defined in either `messages/tr.json` or `messages/en.json`, causing a runtime translation error.
- **Error Message**: 
  ```
  MISSING_MESSAGE: Could not resolve `Navbar.destinations` in messages for locale `tr`.
  ```
- **Fix Applied**: Added `destinations` and `ulkeler` translation keys to the `Navbar` block in both `tr.json` and `en.json`.
- **Prevention**: Always ensure all keys used with `useTranslations` or `getTranslations` are defined in all locale dictionary files.
- **Status**: Fixed

---

## [2026-05-18 09:47] - Prisma migration failed due to UTF-16LE encoding and BOM in migration SQL files

- **Type**: Process
- **Severity**: High
- **File**: `prisma/migrations/0_init/migration.sql`
- **Agent**: Antigravity
- **Root Cause**: The migration SQL file was originally encoded in UTF-16LE (which has alternating null bytes `\x00`). Reading it as UTF-8 caused PostgreSQL to crash with an "embedded null" error. Subsequently, converting the file using PowerShell added a Byte Order Mark (BOM - `\u{feff}`), which caused PostgreSQL syntax errors.
- **Error Message**: 
  ```
  Database error: error encoding message to server: string contains embedded null
  FEHLER: Syntaxfehler bei »\u{feff}«
  ```
- **Fix Applied**: Converted `0_init/migration.sql` to UTF-8 and stripped the Byte Order Mark (BOM) using an inline Node.js script. Recreated the database and successfully re-ran migrations.
- **Prevention**: Ensure all SQL migration files are saved in UTF-8 without BOM encoding. Avoid using standard PowerShell output redirections that automatically append BOM.
- **Status**: Fixed

---

## [2026-05-18 13:35] - Prisma Seed Validation Failure: Unknown fields `title`, `title_en`, `title_de` on Model `Country`

- **Type**: Process
- **Severity**: High
- **File**: `prisma/seed-undergrad.ts` & `prisma/seed-masters.ts`
- **Agent**: Antigravity
- **Root Cause**: The seed scripts attempted to seed the `Country` model using old field names (`title`, `title_en`, `title_de`) which do not exist in the active Prisma schema where the fields are instead defined as `name`, `name_en`, `name_de`.
- **Error Message**: 
  ```
  Unknown field `title` for select statement on model `Country`. Available fields are: id, name, name_en, name_de, ...
  ```
- **Fix Applied**: Corrected `title`, `title_en`, and `title_de` to `name`, `name_en`, and `name_de` in both `seed-undergrad.ts` and `seed-masters.ts`.
- **Prevention**: Ensure that all seed scripts target the fields defined in the active `schema.prisma`.
- **Status**: Fixed

---

## [2026-05-18 15:55] - Login POST Fetch Failure / Server Actions Redirect Intercept in next-intl

- **Type**: Integration
- **Severity**: Critical
- **File**: `src/middleware.ts`
- **Agent**: Antigravity
- **Root Cause**: Two independent, critical issues:
  1. Next.js Server Actions execute via `POST` requests to the current page's URL (e.g. `/auth/login`). Because `/auth/login` does not have a locale prefix, the `next-intl` middleware intercepted and redirected the POST request to `/[locale]/auth/login`, which stripped Next.js action headers and failed the fetch.
  2. The custom `cookies` configuration in `auth.config.ts` hardcoded the session token name to `next-auth.session-token` and `secure: false`. However, in production, `getToken` in `middleware.ts` called with dynamic `secureCookie` searched for `__Secure-next-auth.session-token`, returning `null` and locking users in an infinite redirect back to `/auth/login` even after successful credentials validation.
- **Error Message**: 
  ```
  06~5z5xqywo74.js:1 Fetch failed loading: POST "https://mentor-cc.com/auth/login"
  ```
- **Fix Applied**: 
  1. Updated `middleware.ts` to immediately bypass the `next-intl` middleware and return `NextResponse.next()` for all `POST` requests or requests with the `next-action` header.
  2. Changed `secureCookie` option to `false` in `getToken` inside `middleware.ts` to perfectly align with `auth.config.ts`'s hardcoded non-secure cookie setup.
- **Prevention**: 
  1. Always bypass internationalization routing middlewares on client POST actions/server action requests.
  2. Ensure token retrieval options match the exact configured cookie scheme in `auth.config.ts`.
- **Status**: Fixed
