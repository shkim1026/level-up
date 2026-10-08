# Level Up

A headless e-commerce storefront built with Next.js 15 (App Router) and React 19, powered by Shopify's Storefront, Customer Account, and Admin APIs, print-on-demand fulfillment via Printful, Klaviyo review & newsletter marketing integrations, Brevo contact form email delivery, and complete SEO & Rich Snippet optimizations.

**Live site:** [level-up-rouge.vercel.app](https://level-up-rouge.vercel.app)

---

## Features

- **Product Browsing & Filtering** — Series, category, tag, and price-range filters shared across desktop (sidebar) and mobile (drawer/chips) layouts with custom colormaps and dynamic URL sync
- **Multi-Field Search** — Debounced, portal-based dropdown matching titles, descriptions, and tags with query lowercasing and instant navigation
- **Product Details & High-DPI Carousel** — Color/size variant selection synced with a Splide image carousel, interactive size chart popup modal, and high-density Shopify CDN images
- **Optimized Shopify Image Delivery** — Direct Shopify CDN image loading (`unoptimized`) bypassing Vercel Image Transformation limits while ensuring crisp Retina resolution
- **Product View & Popularity Tracking** — Serverless API route (`/api/track-view`) leveraging Shopify Admin API GraphQL to record product view counts in `custom.popularity` metafields
- **Cart & Checkout** — Persisted to `localStorage` and synchronized with Shopify's GraphQL Storefront Cart API. Handles color/size variant state mutations, prevents header layout shift on drawer toggle, and seamlessly redirects to Shopify hosted checkout
- **Customer Accounts & Order History** — OAuth 2.0 PKCE authentication flow via Shopify's Customer Account API (`/auth/login`, `/auth/callback`, `/auth/logout`), featuring customer profile management and order history
- **Contact Form & Automated Emailing** — `/api/contact` route powered by Brevo API for background email delivery directly to the support inbox with fallback notifications
- **SEO & Rich Snippets (Schema.org)** — Next.js App Router metadata API, dynamic XML sitemaps (`/sitemap.xml`), `robots.txt` crawler rules, canonical URLs, Open Graph & Twitter card previews, and JSON-LD structured data (`Product`, `Offer`, `FAQPage`, `Organization`, `WebSite` with `SearchAction`)
- **Reviews & Newsletter Marketing** — Klaviyo star ratings, PDP review widgets (toggleable via environment flag), and integrated footer newsletter subscription form
- **Privacy & Cookie Consent** — Dual-tier cookie consent banner syncing with Shopify's Customer Privacy API, with `localStorage` fallback persistence when scripts are blocked by ad-blockers. Includes `GoogleAnalyticsGate` with default-on opt-out behavior
- **Error Monitoring & Resilience** — Complete Sentry (`@sentry/nextjs`) instrumentation across client, server, and edge runtimes with custom network error suppression filters
- **UX & Dynamic Skeletons** — Custom `loading.jsx` skeleton screens across all core storefront routes (PDP, Collections, Best Sellers, New Arrivals) to prevent layout shift
- **Legal Policies & FAQ** — Full policy pages (Shipping, Refund, Terms, Privacy) and an accessible FAQ accordion paired with `FAQPage` JSON-LD schema

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) & [Headless UI](https://headlessui.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Carousel | [Splide](https://splidejs.com/) (`@splidejs/react-splide`) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Commerce APIs | [Shopify Storefront API](https://shopify.dev/docs/api/storefront), [Customer Account API](https://shopify.dev/docs/api/customer), & [Admin API](https://shopify.dev/docs/api/admin-graphql) (2025-01 GraphQL) |
| Reviews & Marketing | [Klaviyo](https://www.klaviyo.com/) (Reviews, Ratings, Newsletter) |
| Email Service | [Brevo API](https://www.brevo.com/) (Contact Form Transactional Emails) |
| Fulfillment | [Printful](https://www.printful.com/) (Print-on-demand) |
| Monitoring | [Sentry](https://sentry.io/) (`@sentry/nextjs` v10) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A Shopify store with Storefront API & Customer Account API enabled
- A Shopify Admin API Access Token (for product popularity tracking)
- A Brevo account & API key (for contact form email delivery)

### Installation

```powershell
git clone https://github.com/shkim1026/level-up.git
cd level-up
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site Domain URLs
NEXT_PUBLIC_SITE_URL=https://levelupthreads.com
NEXT_PUBLIC_BASE_URL=https://levelupthreads.com

# Shopify Storefront & Admin APIs
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
SHOPIFY_ADMIN_API_TOKEN=your-shopify-admin-api-token

# Shopify Customer Account API (OAuth / PKCE)
NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID=your-customer-api-client-id

# Contact Form / Brevo Email API
BREVO_API_KEY=your-brevo-api-key
NEXT_PUBLIC_SUPPORT_EMAIL=lvlupsupport@gmail.com

# Marketing & Reviews (Klaviyo)
NEXT_PUBLIC_KLAVIYO_COMPANY_ID=your-klaviyo-company-id
NEXT_PUBLIC_ENABLE_REVIEWS=true

# Analytics & Consent
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring (Sentry)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Development

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application. Note that Shopify Customer Account OAuth authentication and cookie consent domains require exact domain matches, so full authentication flows are best verified on deployed preview environments.

### Build & Production

```powershell
npm run build
npm run start
```

Or deploy to Vercel:

```powershell
vercel --prod
```

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages & API handlers
│   ├── (site)/                  # Main storefront routes
│   │   ├── account/             # Orders & account details (redirects to /account/orders)
│   │   ├── apparel/             # Apparel collection page
│   │   ├── best-sellers/        # Best sellers page
│   │   ├── cart/                # Dedicated cart page
│   │   ├── collections/         # Dynamic collection routes ([series])
│   │   ├── contact/             # Contact page & ContactForm component
│   │   ├── faq/                 # FAQ page with JSON-LD schema
│   │   ├── new-arrivals/        # New arrivals collection page
│   │   ├── policies/            # Shipping, Refund, Privacy, Terms policies
│   │   ├── products/            # Dynamic PDP routes ([id])
│   │   └── search/              # Search results page
│   ├── api/                     # Serverless API routes
│   │   ├── contact/             # Brevo API email dispatch route
│   │   ├── customer/            # Customer Account API GraphQL query handler
│   │   └── track-view/          # Shopify Admin API product popularity tracker
│   ├── auth/                    # Customer Account API OAuth routes (login, callback, logout)
│   ├── checkout/                # Checkout redirect handler
│   ├── global-error.jsx         # Global error boundary handler
│   ├── layout.js                # Root layout, OpenGraph/Twitter defaults & JSON-LD
│   ├── loading.jsx               # Global dynamic loading indicator
│   ├── not-found.jsx            # Custom branded 404 page
│   ├── page.js                  # Homepage with hero banners & featured collections
│   ├── robots.js                # Dynamic crawler instructions generator
│   └── sitemap.js               # Dynamic XML sitemap generator
├── components/
│   ├── account/                 # AccountContext, AccountMenu, Orders List
│   ├── cart/                    # CartContext, CartDrawer, CartProvider
│   ├── consent/                 # CookieConsentBanner, ConsentContext, GoogleAnalyticsGate
│   ├── faq/                     # FAQAccordion, faqData
│   ├── filters/                 # FilterSidebar, FilterBar, FilterChips, FilterDropdown
│   ├── footer/                  # Footer & Klaviyo Newsletter subscription
│   ├── layout/                  # Navigation Header & Search trigger
│   ├── product/                 # ProductCard, ProductCarousel, ProductListing, Klaviyo widgets, Skeletons
│   ├── searchbar/               # Search dropdown portal & SearchResults
│   └── ui/                      # SizePopupChart modal component
├── context/                    # ConsentContext, ProductContext
├── data/                       # Shopify GraphQL data fetching (fetchAllShopifyProducts, etc.)
├── lib/
│   └── shopify/                 # Cart API methods, Customer Privacy, PKCE, Color Map, Size Charts
├── utils/                      # FormatPrice, PageTitle, Slugify
├── instrumentation.js          # Sentry server-side & edge instrumentation
└── instrumentation-client.js   # Sentry client-side error filtering & reporting
```

---

## Key Implementation Notes

- **Unoptimized Shopify CDN Images** — Product images use Next.js `<Image>` configured with the `unoptimized` flag to load directly from Shopify's CDN. This bypasses Vercel Image Transformation quotas while preserving visual clarity.
- **Shopify Metafield Namespace** — Product popularity tracking and custom attributes use Shopify's standard `custom` namespace (`custom.popularity`).
- **Ad-blocker Resilient Privacy Sync** — Consent preferences sync with Shopify's Customer Privacy API, but automatically fall back to saving state in `localStorage` when external privacy scripts are blocked by browser extensions.
- **Transactional Brevo API** — Contact submissions submit to `/api/contact`, which formats and posts HTML emails using Brevo's REST API (`https://api.brevo.com/v3/smtp/email`).
- **Sentry Error Filtering** — Client instrumentation in `instrumentation-client.js` ignores transient `Network Error` logs to prevent noise in error reporting dashboard.
- **Customer Account API vs. Storefront API** — Customer authentication uses Shopify's Customer Account API with OAuth/PKCE, while storefront products, collections, and carts query the Storefront API.

---

## Roadmap

- [x] SEO optimizations, dynamic XML sitemap, `robots.txt`, and Schema.org JSON-LD rich snippets
- [x] Klaviyo star ratings & product review widgets
- [x] Klaviyo newsletter subscription integration in footer
- [x] Contact form email delivery via Brevo API backend
- [x] Cookie privacy banner with ad-blocker fallback to `localStorage`
- [x] Direct Shopify CDN image optimization (Vercel transform bypass)
- [x] Dynamic page skeletons (`loading.jsx`) across all major routes
- [x] Shopify Admin API product view tracking
- [ ] Automated end-to-end testing with Playwright

---

## License

This project is private and not currently licensed for public use.