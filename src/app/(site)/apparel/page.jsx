import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export const metadata = {
  title: "All Apparel & Streetwear",
  description: "Browse the complete collection of Level Up apparel. High-quality gaming and anime inspired hoodies, t-shirts, and streetwear.",
  alternates: {
    canonical: "/apparel",
  },
  openGraph: {
    title: "All Apparel & Streetwear | Level Up",
    description: "Browse the complete collection of Level Up apparel.",
    url: "/apparel",
  },
};

export default async function ApparelPage() {
  const products = await fetchAllShopifyProducts();
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={products}>
        <ProductListing products={products}/>
      </ProductProvider>
    </Suspense>
  );
}