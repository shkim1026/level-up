
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
      title: "Product Not Found",
    };
  }

  // Strip HTML tags for meta description
  const plainDescription = product.description
    ? product.description.replace(/<[^>]*>?/gm, "").trim()
    : `${product.title} - Available at Level Up.`;

  const imageUrl = product.images?.[0]?.url || product.image || "";

  return {
    title: product.title,
    description: plainDescription,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      type: "website",
      title: `${product.title} | Level Up`,
      description: plainDescription,
      url: `/products/${product.handle}`,
      siteName: "Level Up",
      images: imageUrl ? [{ url: imageUrl, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Level Up`,
      description: plainDescription,
      images: imageUrl ? [imageUrl] : [],
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

  const plainDescription = product.description
    ? product.description.replace(/<[^>]*>?/gm, "").trim()
    : `${product.title} - Available at Level Up.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://levelupthreads.com";
  const productImages = product.images?.map((img) => img.url).filter(Boolean) || [];
  if (product.image && !productImages.includes(product.image)) {
    productImages.unshift(product.image);
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": productImages,
    "description": plainDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Level Up",
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product.handle}`,
      "priceCurrency": product.currency || "USD",
      "price": product.price || "0.00",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} allProducts={products} />
      </Suspense>
    </>
  );
}
