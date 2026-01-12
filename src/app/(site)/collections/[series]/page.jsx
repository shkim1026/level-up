import { fetchAllShopifyProducts } from '@/data/fetchAllShopifyProducts';
import { slugify } from '@/utils/Slugify';
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

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