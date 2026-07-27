import Header from "@/components/layout/Header.jsx";
import CartDrawer from "@/components/cart/CartDrawer.jsx";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1} className="max-w-6x1 mx-auto bg-white text-dark-gray min-h-screen outline-none">
        {children}
      </main>
    </>
  );
}
