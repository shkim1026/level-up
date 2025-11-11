
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetails({ params }) {

  const { id } = await params;

  const products = await fetchAllShopifyProducts();
  const product = products.find((p) => p.handle === id);

  if (!product) {
    return <p className="p-8 text-red-500">Product not found. ID: {id}</p>
  }

  return <ProductDetailsClient product={product} allProducts={products} />;
}
