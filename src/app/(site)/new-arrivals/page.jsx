import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

export const metadata = {
  title: "New Arrivals",
  description: "Check out the newest streetwear drops, anime hoodies, graphic tees, and accessories from Level Up.",
  alternates: {
    canonical: "/new-arrivals",
  },
  openGraph: {
    title: "New Arrivals | Level Up",
    description: "Check out the newest streetwear drops from Level Up.",
    url: "/new-arrivals",
  },
};

export default async function NewArrivalsPage() {
  const products = await fetchAllShopifyProducts();
  const newArrivals = [...products].sort((a, b) => {
    const isNewA = a.metafields?.new ? 1 : 0;
    const isNewB = b.metafields?.new ? 1 : 0;
    return isNewB - isNewA;
  });

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={newArrivals}>
        <ProductListing products={newArrivals} />
      </ProductProvider>
    </Suspense>
  )
}