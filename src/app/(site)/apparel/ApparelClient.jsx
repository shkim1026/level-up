"use client";

import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default function ApparelClient({ initialProducts }) {
  return (
    <ProductProvider initialProducts={initialProducts}>
      <ProductListing products={initialProducts}/>
    </ProductProvider>
  );
}