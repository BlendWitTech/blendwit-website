# mero-cms-theme-starter

The official theme template for [Mero CMS](https://github.com/BlendWitTech/mero-cms).

Fork this repo every time you build a new client theme. Replace the placeholder components with the client's design. Deploy to Vercel. Connect via the CMS dashboard.

---

## What's included

```
src/
  lib/cms.ts               ← CMS data fetching — do not modify
  app/
    layout.tsx             ← Root layout (Header + Footer)
    page.tsx               ← Home page (services, testimonials, team)
    blog/page.tsx          ← Blog list
    blog/[slug]/page.tsx   ← Blog post
    [slug]/page.tsx        ← Dynamic CMS pages
    api/revalidate/        ← Cache invalidation (called by CMS dashboard)
  components/layout/
    Header.tsx             ← Placeholder — replace with client design
    Footer.tsx             ← Placeholder — replace with client design

theme.json                 ← Theme metadata + seed data (fill this in)
.env.local.example         ← 3 required env vars
```

---

## How to use

### 1. Fork this repo

```
GitHub → Use this template → Create a new repository
Name it: client-name-theme
```

### 2. Set up locally

```bash
npm install

cp .env.local.example .env.local
# Fill in:
# CMS_API_URL=http://localhost:3001   (your local backend)
# NEXT_PUBLIC_SITE_URL=http://localhost:3002
# REVALIDATE_SECRET=any-string-for-local

npm run dev
# Theme runs on http://localhost:3002
```

### 3. Build the client's design

Replace the placeholder components:

| File | What to do |
|------|-----------|
| `src/components/layout/Header.tsx` | Client's navigation, logo, menu |
| `src/components/layout/Footer.tsx` | Client's footer, links, social |
| `src/app/page.tsx` | Client's home page sections |
| `src/app/globals.css` | Client's fonts, base styles |

Keep `src/lib/cms.ts` and `src/app/api/revalidate/route.ts` unchanged.

### 4. Fill in `theme.json`

```json
{
  "name": "Client Name Theme",
  "slug": "client-name",
  "version": "1.0.0",
  "description": "Theme for Client Name website",
  "requiredModules": ["pages", "menus", "blogs", "services"],
  "defaultSettings": {
    "site_title": "Client Name",
    "contact_email": "hello@client.com"
  },
  "seedData": {
    "pages": [...],
    "menus": [...]
  }
}
```

### 5. Deploy to Vercel

```
Vercel → New Project → Connect this repo (client-name-theme)
Framework: Next.js

Add environment variables:
  CMS_API_URL         = https://client-backend.railway.app
  NEXT_PUBLIC_SITE_URL = https://client-name.vercel.app
  REVALIDATE_SECRET   = (same value as backend REVALIDATE_SECRET)
```

### 6. Connect to the CMS

In the CMS dashboard:
- Settings → Themes → enter the Vercel URL → Save
- Themes page → find your theme → Setup → Activate

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CMS_API_URL` | Backend Railway URL |
| `NEXT_PUBLIC_SITE_URL` | This theme's Vercel URL |
| `REVALIDATE_SECRET` | Must match backend's `REVALIDATE_SECRET` |

---

## Available CMS data

Everything comes from `src/lib/cms.ts`:

```typescript
// Site settings, menus, services, testimonials, team
const siteData = await getSiteData();

// Blog posts (paginated)
const posts = await getPublishedPosts({ page: 1, limit: 10 });

// Single post by slug
const post = await getPostBySlug('my-post');

// CMS-managed page by slug
const page = await getPageBySlug('about');

// SEO meta for a route
const seo = await getSeoMeta('/about');

// Convert a CMS media path to a full URL
const url = cmsImageUrl(settings.logoUrl);
```

---

## Cache invalidation

The `src/app/api/revalidate/route.ts` endpoint is called automatically by the CMS dashboard (Settings → Clear Theme Cache). It revalidates all pages.

Requires `REVALIDATE_SECRET` to match on both sides.

---

## Packaging as a ZIP (Model C delivery)

If you need to hand a theme to a client as a file:

```bash
# From the theme directory:
zip -r client-name-theme.zip . \
  --exclude "node_modules/*" \
  --exclude ".next/*" \
  --exclude ".env.local" \
  --exclude ".git/*"
```

Client uploads the ZIP via: CMS Dashboard → Themes → Upload Theme

---

Built by [Blendwit Tech](https://blendwit.com)
