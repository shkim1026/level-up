import "./globals.css";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/components/cart/CartContext.jsx";
import CartDrawer from "@/components/cart/CartDrawer.jsx";
import Footer from "@/components/footer/Footer";
import { ConsentProvider } from "@/context/ConsentContext";
import CookieConsentBanner from "@/components/consent/CookieConsentBanner";
import GoogleAnalyticsGate from "@/components/consent/GoogleAnalyticsGate";
import { AccountProvider } from "@/components/account/AccountContext";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://levelupthreads.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Level Up | Premium Apparel & Streetwear",
    template: "%s | Level Up",
  },
  description: "Elevate your everyday streetwear with Level Up Threads. Built with premium materials, designed for maximum comfort, and tailored to level up your wardrobe.",
  keywords: ["streetwear", "gaming apparel", "anime streetwear", "hoodies", "t-shirts", "Level Up"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Level Up",
    title: "Level Up | Premium Apparel & Streetwear",
    description: "Elevate your everyday streetwear with Level Up Threads. Built with premium materials, designed for maximum comfort.",
    images: [
      {
        url: "/Level_up_logo.png",
        width: 1200,
        height: 630,
        alt: "Level Up Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Level Up | Premium Apparel & Streetwear",
    description: "Elevate your everyday streetwear with Level Up Threads.",
    images: ["/Level_up_logo.png"],
  },
};

export default function RootLayout({ children }) {
  const klaviyoCompanyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Level Up",
    "url": siteUrl,
    "logo": `${siteUrl}/Level_up_logo.png`,
    "sameAs": [
      "https://instagram.com",
      "https://x.com"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Level Up",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.className} antialiased bg-white text-dark-gray`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:p-3 focus:bg-dark-gray focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <CartProvider>
          <AccountProvider>
            <ConsentProvider>
              <div className="max-w-6x1 mx-auto bg-white text-dark-gray min-h-screen">
                {children}
              </div>
              <Footer />
              <CartDrawer />
              <CookieConsentBanner />
              <GoogleAnalyticsGate gaId={process.env.NEXT_PUBLIC_GA_ID} />
              {klaviyoCompanyId && (
                <>
                  <Script
                    id="klaviyo-js"
                    src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoCompanyId}`}
                    strategy="afterInteractive"
                  />
                  <Script
                    id="klaviyo-reviews-js"
                    src={`https://static-v2.klaviyo.com/onsite/js/klaviyo_reviews.js?company_id=${klaviyoCompanyId}`}
                    strategy="afterInteractive"
                  />
                </>
              )}
            </ConsentProvider>
          </AccountProvider>
        </CartProvider>
      </body>
    </html>
  );
}
