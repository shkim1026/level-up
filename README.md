# Level Up

A headless e-commerce storefront built with Next.js (App Router), powered by Shopify's Storefront and Customer Account APIs, with print-on-demand fulfillment via Printful, Klaviyo review & marketing integrations, and full SEO & Rich Snippet optimizations.

**Live site:** [level-up-rouge.vercel.app](https://level-up-rouge.vercel.app)

---

## Features

- **Product Browsing & Filtering** — Series, category, and price-range filters shared across desktop (sidebar) and mobile (drawer/chips) layouts
- **Search** — Debounced, portal-based dropdown matching product titles and tags with instant navigation
- **Product Details & High-DPI Carousel** — Color/size variant selection synced with a Splide image carousel optimized via Next.js `<Image>` (1200px Retina resolution, high-quality WebP/AVIF formats, eager/lazy loading)
- **Cart** — Persisted to `localStorage`, supports multiple variants per product, syncs seamlessly with Shopify's hosted checkout
- **Customer Accounts** — OAuth/PKCE authentication via Shopify's Customer Account API, with order history and profile management
- **SEO & Rich Snippets (Schema.org)** — Full Next.js App Router metadata API, dynamic XML sitemap (`/sitemap.xml`), `robots.txt` crawler rules, canonical URLs, Open Graph & Twitter card previews, and JSON-LD structured data (`Product`, `Offer`, `FAQPage`, `Organization`, `WebSite` with `SearchAction`)
- **Reviews & Marketing** — Klaviyo star ratings, review widgets, newsletter subscription, and onsite script integration
- **Consent & Analytics** — Custom cookie consent banner integrated with Shopify's Customer Privacy API and Google Analytics (`GoogleAnalyticsGate`)
- **Error Tracking & Monitoring** — Sentry integration (`@sentry/nextjs`) for client and server error monitoring
- **FAQ** — Accessible accordion UI paired with `FAQPage` JSON-LD schema for Google rich search results

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Carousel | [Splide](https://splidejs.com/) (`@splidejs/react-splide`) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) & [FontAwesome 6](https://fontawesome.com/) |
| Commerce | [Shopify Storefront API](https://shopify.dev/docs/api/storefront) & [Customer Account API](https://shopify.dev/docs/api/customer) (GraphQL) |
| Reviews & Marketing | [Klaviyo](https://www.klaviyo.com/) (Reviews & Onsite JS) |
| Fulfillment | [Printful](https://www.printful.com/) (Print-on-demand) |
| Monitoring | [Sentry](https://sentry.io/) (`@sentry/nextjs`) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A Shopify store on a Storefront API–enabled plan
- Shopify Storefront API access token and Customer Account API app credentials

### Installation

```powershell
git clone https://github.com/shkim1026/level-up.git
cd level-up
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://levelupthreads.com
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_KLAVIYO_COMPANY_ID=your-klaviyo-company-id
```

Additional Customer Account API credentials (client ID, redirect URIs, etc.) are required for the `/auth` routes — configure these in your Shopify Customer Account API app settings and add the corresponding environment variables.

### Run the Dev Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Note that OAuth login and cookie-based consent behavior rely on domain matching, so some flows are best verified on a deployed Vercel preview URL rather than `localhost`.

### Build & Deploy

```powershell
npm run build
npm run start
```

Or deploy directly with the [Vercel CLI](https://vercel.com/docs/cli):

```powershell
vercel --prod
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/              # Main storefront routes (apparel, cart, products, collections, contact, faq, etc.)
│   ├── api/                 # API handlers (tracking, customer session)
│   ├── auth/                # OAuth/PKCE login, callback, logout routes
│   ├── robots.js            # Dynamic crawler instructions & sitemap link
│   ├── sitemap.js           # Dynamic XML sitemap generator (products, collections, static pages)
│   └── layout.js            # Root layout, metadataBase, OpenGraph/Twitter defaults & JSON-LD
├── components/
│   ├── account/             # AccountProvider, AccountMenu
│   ├── cart/                # CartContext, CartDrawer, CartProvider
│   ├── consent/              # CookieConsentBanner, ConsentContext, GoogleAnalyticsGate
│   ├── faq/                 # FAQAccordion, faqData
│   ├── filters/             # FilterSidebar, FilterBar, FilterChips, FilterContent
│   ├── footer/              # Footer & Newsletter Subscription banner
│   ├── layout/              # Header navigation & search trigger
│   ├── product/             # ProductCard, ProductCarousel, ProductDetails, KlaviyoStarRating, etc.
│   └── searchbar/           # Portal-based search dropdown & SearchResults
├── context/                # ConsentContext, ProductContext
├── data/                   # Shopify data-fetching functions (fetchAllShopifyProducts, etc.)
├── utils/                  # Slugify, FormatPrice, PageTitle
├── instrumentation.js      # Server-side Sentry error instrumentation
└── instrumentation-client.js # Client-side Sentry error instrumentation
```

---

## Key Implementation Notes

- **Next.js App Router Metadata API** — All titles, meta descriptions, Open Graph tags, Twitter cards, and canonical URLs use Next.js `metadata` exports and dynamic `generateMetadata` functions.
- **JSON-LD Rich Snippets** — Product pages render Schema.org `Product` & `Offer` data, FAQ pages render `FAQPage` schema, and root layout renders `Organization` & `WebSite` schemas.
- **Image Optimization** — Product carousels use Next.js `<Image>` with high-density Retina sizing (`1200px`), `quality={90}`, and responsive sizes for crisp visuals and fast WebP delivery.
- **Shopify Variant Options** — Shopify variant options are unordered; always look up by `option.name` (e.g. `"color"`, `"size"`), never by array index.
- **Customer Account API vs. Admin API** — Field names differ between the two; verify against the [Customer Account API schema](https://shopify.dev/docs/api/customer) specifically.
- **Non-Plus Shopify Plan** — Some checkout customizations (like post-purchase cart clearing) are implemented via a `theme.liquid` redirect script rather than Checkout UI Extensions or Shopify Plus–only features.

---

## Roadmap

- [x] SEO optimizations, dynamic XML sitemaps, `robots.txt`, and Schema.org JSON-LD rich snippets
- [x] Newsletter/email capture banner in footer
- [x] High-density image optimization for Retina displays
- [x] Klaviyo star ratings & reviews integration
- [ ] Automated end-to-end testing with Playwright

---

## License

This project is private and not currently licensed for public use.