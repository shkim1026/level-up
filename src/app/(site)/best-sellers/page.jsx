import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

export const metadata = {
  title: "Best Sellers",
  description: "Shop the most popular Level Up streetwear, hoodies, and graphic tees voted top choice by our community.",
  alternates: {
    canonical: "/best-sellers",
  },
  openGraph: {
    title: "Best Sellers | Level Up",
    description: "Shop the most popular Level Up streetwear and graphic tees.",
    url: "/best-sellers",
  },
};

export default async function BestSellersPage() {
  const products = await fetchAllShopifyProducts();
  const bestSellers = [...products].sort((a, b) => {
    const popA = a.metafields?.popularity ?? 0;
    const popB = b.metafields?.popularity ?? 0;
    return popB - popA;
  });
  
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={bestSellers}>
        <ProductListing products={bestSellers}/>
      </ProductProvider>
    </Suspense>
  )
}