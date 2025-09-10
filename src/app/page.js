import mockProducts from "@/data/mockProducts.json";
import ProductCard from "@/components/product/ProductCard";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3x1 text-black font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}