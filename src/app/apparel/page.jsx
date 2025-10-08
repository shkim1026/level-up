import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { mockProducts } from "@/data/mockProducts";


export default function ApparelPage() {
  return (
    <ProductProvider initialProducts={mockProducts}>
      <ProductListing />
    </ProductProvider>
  )
}