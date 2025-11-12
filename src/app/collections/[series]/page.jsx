
import { fetchAllShopifyProducts } from '@/data/fetchAllShopifyProducts';
import { slugify } from '@/utils/Slugify';
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default async function SeriesPage({ params }) {
  const { series: seriesSlug } = params;

  const products = await fetchAllShopifyProducts();

  const seriesProducts = products.filter((p) => slugify(p.metafields.series || "") === seriesSlug);

  products.forEach(p => {
    const productSlug = slugify((p.metafields.series || "").trim());
  });

  if (!seriesProducts.length) {
    return <p className="p-8 text-red-500">Collection not found. Collection: {seriesSlug}</p>
  }

  return (
    <ProductProvider>
      <ProductListing products={seriesProducts} />
    </ProductProvider>
  )
}