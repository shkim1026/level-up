import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default function BestSellersPage() {
  return (
    <ProductProvider>
      <ProductListing />
    </ProductProvider>
  )
}