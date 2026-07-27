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
  console.log("Products:", JSON.stringify(products, null, 2));
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={products}>
        <ProductListing products={products} />
      </ProductProvider>
    </Suspense>
  )
}