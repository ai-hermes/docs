# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for [Rethink AI](https://github.com/ai-hermes/wechat-mem0) — an Electron desktop application for intelligent WeChat data analysis using AI Agents. The docs site is built with Next.js 14 (App Router) and deployed on Vercel. Supports 8 languages via next-intl with phone-based authentication.

**Note**: The actual product (Rethink AI) is a desktop Electron app, NOT a web SaaS. This repo only contains the marketing website and documentation.

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
- `src/content/{locale}/` — Documentation content as MDX files
- `src/lib/` — Shared utilities (auth, prisma, docs config, cn helper)

### Database

- Prisma with SQLite (`prisma/schema.prisma`)
- Models: User, Session, Analysis, BillingHistory, VerificationCode
- Used for the docs website's own user management (not for the Rethink AI desktop app)

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
- Documentation content covers: Introduction, Quick Start, WeChat Data Integration, Usage Guide, Privacy Policy

### Client vs Server Components

- Pages are server components (async data fetching, `getTranslations()`)
- Interactive components (`LoginForm`, `Header`) use `'use client'`
- `NextIntlClientProvider` wraps locale layouts for client-side translations

## Content Guidelines

When updating documentation content in `src/content/`:

- Rethink AI is an **Electron desktop app**, not a web SaaS
- Core feature is **AI Agent chat for querying local WeChat data**
- Data access is via **local decryption** or **Docker container** (not file upload)
- The app supports multiple **LLM engines**: LangGraph, Claude Code, Pi-AI
- All WeChat data stays **local** — never uploaded to cloud
- There are **no pricing tiers** (free/pro/enterprise) for the app itself — it's open source
- LLM API costs are the user's responsibility
