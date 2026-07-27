import { fetchAllShopifyProducts } from '@/data/fetchAllShopifyProducts';
import { slugify } from '@/utils/Slugify';
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export async function generateMetadata({ params }) {
  const { series: seriesSlug } = await params;
  const products = await fetchAllShopifyProducts();

  const matchingProduct = products.find((p) => {
    const seriesValue = p?.metafields?.series?.trim();
    const categoryValue = p?.metafields?.categories?.trim();

    return (
      (seriesValue && slugify(seriesValue) === seriesSlug) ||
      (categoryValue && slugify(categoryValue) === seriesSlug)
    );
  });

  const rawName =
    matchingProduct?.metafields?.series ||
    matchingProduct?.metafields?.categories ||
    seriesSlug.replace(/-/g, " ");

  const collectionTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return {
    title: `${collectionTitle} Collection`,
    description: `Explore the exclusive ${collectionTitle} collection at Level Up Threads. Premium apparel, high quality streetwear, and unique designs.`,
    alternates: {
      canonical: `/collections/${seriesSlug}`,
    },
    openGraph: {
      title: `${collectionTitle} Collection | Level Up`,
      description: `Shop the official ${collectionTitle} apparel collection at Level Up.`,
      url: `/collections/${seriesSlug}`,
    },
  };
}

export default async function SeriesPage({ params }) {
  const { series: seriesSlug } = await params;

  const products = await fetchAllShopifyProducts();

  const seriesProducts = products.filter((p) => {
    const seriesValue = p?.metafields?.series?.trim();
    const categoryValue = p?.metafields?.categories?.trim();

    const seriesSlugified = seriesValue ? slugify(seriesValue) : null;
    const categorySlugified = seriesValue ? slugify(categoryValue) : null;

    return seriesSlugified === seriesSlug || categorySlugified === seriesSlug;
  });

  if (!seriesProducts.length) {
    return (
      <p className="p-8 text-red-500">
        Collection not found. Collection: {seriesSlug}
      </p>
    );
  }

  return (
    <ProductProvider>
      <ProductListing products={seriesProducts} />
    </ProductProvider>
  );
}