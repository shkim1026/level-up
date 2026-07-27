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
  
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={products}>
        <ProductListing products={products}/>
      </ProductProvider>
    </Suspense>
  )
}