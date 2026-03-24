# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rethink AI — an AI-powered conversation analysis SaaS tool built with Next.js 16 (App Router), deployed on Vercel. Supports 8 languages via next-intl with phone-based authentication.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server on localhost:3000
pnpm build            # Production build
pnpm lint             # ESLint
npx prisma migrate dev   # Run database migrations
npx prisma generate      # Regenerate Prisma client after schema changes
```

No test framework is configured yet.

## Architecture

### Routing & i18n

- All user-facing pages live under `src/app/[locale]/` with locale-prefixed URLs (always strategy)
- 8 locales: zh (default), en, ja, fr, ko, it, de, ru
- Translation files: `messages/{locale}.json`
- Locale routing configured in `src/middleware.ts` and `src/i18n/config.ts`
- API routes are NOT locale-prefixed: `src/app/api/`

### Key Directories

- `src/components/ui/` — shadcn/ui primitives (New York style, RSC-enabled)
- `src/components/layout/` — Header, Footer, LanguageSwitcher
- `src/components/home/` — Landing page sections
- `src/content/{locale}/` — Documentation content as TSX components
- `src/lib/` — Shared utilities (auth, prisma, docs config, cn helper)

### Database

- Prisma with SQLite (`prisma/schema.prisma`)
- Models: User, Session, Analysis, BillingHistory, VerificationCode
- User plans: free/pro/enterprise with analysis quotas

### Authentication

- Phone + verification code flow (API routes in `src/app/api/auth/`)
- Dev testing: any valid phone format, code is always "123456"
- Sessions: cookie-based (`session_token`), 7-day TTL, httpOnly
- Protected routes (`/dashboard/*`) call `getCurrentUser()` from `src/lib/auth.ts`

### Styling

- Tailwind CSS v4 with new `@import` syntax and `@theme inline`
- oklch() color space via CSS variables (light/dark modes in `src/app/globals.css`)
- Custom gradient utilities: `gradient-primary`, `text-gradient-primary`
- Fonts: Geist Sans + Geist Mono (Google Fonts, loaded in root layout)
- Path alias: `@/*` → `./src/*`

### Content & MDX

- `next.config.ts` composes next-intl plugin + MDX plugin
- Page extensions include `.md` and `.mdx`
- Docs use `generateStaticParams()` for static generation across all locales

### Client vs Server Components

- Pages are server components (async data fetching, `getTranslations()`)
- Interactive components (`LoginForm`, `Header`) use `'use client'`
- `NextIntlClientProvider` wraps locale layouts for client-side translations
