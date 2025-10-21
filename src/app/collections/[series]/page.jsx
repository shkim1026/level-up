
import products from '@/data/mockProducts.json';
import { slugify } from '@/utils/Slugify';
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default function SeriesPage({ params }) {
  const { series: seriesSlug } = params;

  const seriesProducts = products.filter((p) => slugify(p.metafields.series || "") === seriesSlug);

  console.log(products.map(p => p.metafields.series))
  console.log(seriesProducts)

  products.forEach(p => {
  const productSlug = slugify((p.metafields.series || "").trim());
  console.log("Product:", slugify(p.metafields.series), "Slug:", productSlug);
});

console.log("seriesSlug from URL:", seriesSlug);
  if (!seriesProducts.length) {
    return <p className="p-8 text-red-500">Collection not found. Collection: {seriesSlug}</p>
  }

  return (
    <ProductProvider>
      <ProductListing products={seriesProducts} />
    </ProductProvider>
  )
}