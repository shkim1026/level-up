# Level Up

A headless e-commerce storefront built with Next.js, powered by Shopify's Storefront and Customer Account APIs, with print-on-demand fulfillment via Printful.

**Live site:** [level-up-rouge.vercel.app](https://level-up-rouge.vercel.app)

---

## Features

- **Product browsing & filtering** — series, category, and price-range filters shared across desktop (sidebar) and mobile (drawer/chips) layouts
- **Search** — debounced, portal-based dropdown matching product titles and tags
- **Product details** — color/size variant selection synced with an image carousel
- **Cart** — persisted to `localStorage`, supports multiple variants per product, syncs with Shopify's hosted checkout
- **Customer accounts** — OAuth/PKCE authentication via Shopify's Customer Account API, with order history
- **Consent management** — custom cookie consent banner integrated with Shopify's Customer Privacy API and Google Analytics
- **FAQ** — accordion UI with Printful-specific shipping/returns content

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Carousel | [Splide](https://splidejs.com/) (`@splidejs/react-splide`) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Commerce | [Shopify Storefront API](https://shopify.dev/docs/api/storefront) & [Customer Account API](https://shopify.dev/docs/api/customer) (GraphQL) |
| Fulfillment | [Printful](https://www.printful.com/) (print-on-demand) |
| Deployment | [Vercel](https://vercel.com/) |

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

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

Additional Customer Account API credentials (client ID, redirect URIs, etc.) are required for the `/auth` routes — configure these in your Shopify Customer Account API app settings and add the corresponding environment variables.

### Run the dev server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Note that OAuth login and cookie-based consent behavior rely on domain matching, so some flows are best verified on a deployed Vercel preview URL rather than `localhost`.

### Build & deploy

```powershell
npm run build
npm run start
```

Or deploy directly with the [Vercel CLI](https://vercel.com/docs/cli):

```powershell
vercel --prod
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/              # Main storefront routes (apparel, cart, products, etc.)
│   ├── auth/                 # OAuth/PKCE login, callback, logout routes
│   └── api/customer/         # Customer session API route
├── components/
│   ├── cart/                # CartContext, CartDrawer
│   ├── filters/              # FilterSidebar, FilterBar, FilterChips, FilterContent
│   ├── layout/               # Header
│   ├── product/              # ProductCard, ProductCarousel, ProductListing, etc.
│   ├── searchbar/             # Portal-based search dropdown
│   └── faq/                  # FAQ accordion
├── context/                # ProductContext, AccountContext
├── data/                   # Shopify data-fetching functions
├── lib/shopify/             # Cart mutations, customer privacy, color map
└── utils/                  # Slugify, formatPrice, PageTitle
```

## Key Implementation Notes

- **Shopify variant options are unordered** — always look up by `option.name` (e.g. `"color"`, `"size"`), never by array index.
- **Customer Account API vs. Admin API** — field names differ between the two; verify against the [Customer Account API schema](https://shopify.dev/docs/api/customer) specifically.
- **Non-Plus Shopify plan** — some checkout customizations (like post-purchase cart clearing) are implemented via a `theme.liquid` redirect script rather than Checkout UI Extensions or Shopify Plus–only features.

## Roadmap

- [ ] Refine post-checkout redirect to avoid unconditional script execution
- [ ] Newsletter/email capture (Klaviyo, Mailchimp, or Shopify Email)
- [ ] Automated end-to-end testing with Playwright

## License

This project is private and not currently licensed for public use.