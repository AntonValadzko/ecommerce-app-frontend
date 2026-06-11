# Product Catalog Frontend

Next.js 15 + React 19 + TypeScript storefront for the Product Catalog API.

## Features

- Product listing with grid layout
- Search with autocomplete (name, description, SKU, brand)
- Filters: category, price range, brands, rating, attributes, in-stock
- Sorting and page size (24 / 48 / 96)
- Pagination and infinite scroll modes
- Quick view modal
- Product detail pages with SEO (metadata + JSON-LD)
- Saved searches (session-based)
- Related products

## Prerequisites

Start the backend API first (port **3000**):

```bash
# from project root
npm run dev
```

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3001

## Configuration

Environment variables are validated at build time (`next.config.ts`) and via `npm run validate:env`.

| Variable | Default | Description |
|----------|---------|-------------|
| `API_URL` | `http://localhost:3000` | Backend URL for SSR and `/api/v1` rewrites |
| `NEXT_PUBLIC_API_BASE` | `/api/v1` | Browser API path (relative via rewrite, or absolute URL) |
| `LOG_LEVEL` | `debug` (dev) / `info` (prod) | Winston log level: `error`, `warn`, `info`, `debug` |

### Local development

```bash
cp .env.local.example .env.local
npm run validate:env
npm run dev
```

Defaults work without `.env.local` when the API runs on port 3000.

### Production

```bash
cp .env.production.example .env.production
# Set API_URL to your deployed backend (must not be localhost)
npm run validate:env
npm run build
npm run start
```

**Important:** `API_URL` is read at **build time** (rewrites) and **runtime** (SSR). Set the same value in both phases. `NEXT_PUBLIC_*` variables are inlined at build time.

Copy `.env.local.example` or `.env.production.example` and customize for your environment.

### AWS Amplify Hosting

Amplify console variables are **not** available to Next.js SSR unless they are written into a `.env.production` file during the build. This repo includes `amplify.yml` and `scripts/write-amplify-env.sh` to do that automatically.

**1. Set variables in Amplify Console** (Hosting → Environment variables):

| Variable | Required | Example |
|----------|----------|---------|
| `API_URL` | Yes | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_API_BASE` | No | `/api/v1` |
| `LOG_LEVEL` | No | `info` |

**2. Commit and deploy** — `amplify.yml` runs before `npm run build`:

```bash
bash scripts/write-amplify-env.sh   # API_URL + NEXT_PUBLIC_* → .env.production
npm run build
```

**3. Verify** in the build log: `Amplify env: wrote N variables to .env.production`

If `API_URL` is missing, the build fails early with a clear error.

## Linting

ESLint 9 (flat config) with `eslint-config-next` (core-web-vitals + TypeScript) and Storybook rules:

```bash
npm run lint          # TypeScript + ESLint
npm run lint:types    # tsc --noEmit only
npm run lint:eslint   # ESLint only
npm run lint:fix      # auto-fix ESLint issues
```

Config: `eslint.config.mjs`

## Storybook

Component workshop for UI development and visual testing:

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static export to storybook-static/
```

Stories live next to components (`*.stories.tsx`) with shared fixtures in `src/stories/fixtures/`.

## Tech stack

- **Next.js 15** App Router
- **React 19** with client/server components
- **TypeScript** strict mode
- **Tailwind CSS**
- **Storybook 10** with Next.js + Vite
- **SWR** for client data fetching
- URL-driven filter state (shareable links)
