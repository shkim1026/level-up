
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import ProductDetails from "./ProductDetails";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const products = await fetchAllShopifyProducts();
  const product = products.find((p) => p.handle === id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.title} | Level Up`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.[0]
        ? [{ url: product.images[0].src }]
        : [],
    },
  };
}

export default async function ProductDetailsPage({ params }) {

  const { id } = await params;

  const products = await fetchAllShopifyProducts();
  const product = products.find((p) => p.handle === id);

  if (!product) {
    return <p className="p-8 text-red-500">Product not found. ID: {id}</p>
  }

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails product={product} allProducts={products} />
    </Suspense>
  )
}
