import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default function NewArrivalsPage() {
  return (
    <ProductProvider>
      <ProductListing />
    </ProductProvider>
  )
}