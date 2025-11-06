import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import ApparelClient from "./ApparelClient";

export default async function ApparelPage() {
  try {
    const products = await fetchAllShopifyProducts();
    console.log("Shopify products:", products)
    return <ApparelClient initialProducts={products} />
  } catch (error) {
    console.log("Failed to fetch Shopify products:", error);
    return <div>Error loading products</div>
  }
}