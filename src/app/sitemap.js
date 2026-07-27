import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";
import { slugify } from "@/utils/Slugify";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://levelupthreads.com";

  // Static routes
  const staticRoutes = [
    "",
    "/apparel",
    "/best-sellers",
    "/new-arrivals",
    "/faq",
    "/contact",
    "/policies/privacy-policy",
    "/policies/refund-policy",
    "/policies/shipping-policy",
    "/policies/terms-of-service",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch products for dynamic product & collection routes
  let products = [];
  try {
    products = await fetchAllShopifyProducts();
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
  }

  // Dynamic product routes
  const productRoutes = products
    .filter((product) => product.handle)
    .map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  // Dynamic collection routes
  const collectionsSet = new Set();
  products.forEach((product) => {
    const series = product.metafields?.series;
    if (series) {
      collectionsSet.add(slugify(series));
    }
  });

  const collectionRoutes = Array.from(collectionsSet).map((seriesSlug) => ({
    url: `${baseUrl}/collections/${seriesSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
