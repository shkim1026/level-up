import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";

export default async function NewArrivalsPage() {
  const products = await fetchAllShopifyProducts();
  return (
    <ProductProvider initialProducts={products}>
      <ProductListing products={products} />
    </ProductProvider>
  )
}