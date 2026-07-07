import "./globals.css";
import { Montserrat } from "next/font/google";
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

export const metadata = {
  description: "Level up Your Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Level Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${montserrat.className} antialiased bg-white text-dark-gray`}
      >
        <CartProvider>
          <AccountProvider>
            <ConsentProvider>
              <main className="max-w-6x1 mx-auto bg-white text-dark-gray min-h-screen">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <CookieConsentBanner />
              <GoogleAnalyticsGate gaId={process.env.NEXT_PUBLIC_GA_ID} />
            </ConsentProvider>
          </AccountProvider>
        </CartProvider>
      </body>
    </html>
  );
}
