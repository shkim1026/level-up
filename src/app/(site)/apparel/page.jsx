import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

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