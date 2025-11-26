import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import ApparelClient from "./ApparelClient";

export default async function ApparelData() {
  const products = await fetchAllShopifyProducts();
  return <ApparelClient initialProducts={products} />;
}