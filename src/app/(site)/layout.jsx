import Header from "@/components/layout/Header.jsx";
import CartDrawer from "@/components/cart/CartDrawer.jsx";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />

      <main className="max-w-6x1 mx-auto bg-white text-black min-h-screen">
        {children}
      </main>

      <CartDrawer />
    </>
  );
}
