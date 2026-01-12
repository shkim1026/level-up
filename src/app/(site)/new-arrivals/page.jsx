import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

export default async function NewArrivalsPage() {
  const products = await fetchAllShopifyProducts();
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductProvider initialProducts={products}>
        <ProductListing products={products} />
      </ProductProvider>
    </Suspense>
  )
}