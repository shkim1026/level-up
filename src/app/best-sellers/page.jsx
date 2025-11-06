import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default async function BestSellersPage() {
  const products = await fetchAllShopifyProducts();
  
  return (
    <ProductProvider initialProducts={products}>
      <ProductListing products={products}/>
    </ProductProvider>
  )
}