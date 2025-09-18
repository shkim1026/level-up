import mockProducts from "@/data/mockProducts.json";
import ProductCard from "@/components/product/ProductCard";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center text-white">
        <Image 
          src="/mockHero.jpg"
          alt="hero"
          width={1920}
          height={1080}
          size="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      <h1 className="text-3x1 text-black font-bold mb-6 p-6">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {mockProducts.map((product) => (
          product.featured && <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}