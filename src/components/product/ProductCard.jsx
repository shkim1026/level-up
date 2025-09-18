"use Client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="rounded-2x1 p-4 bg-white flex flex-col items-center group">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="rounded-lg object-cover group-hover:opacity-0 transition-opacity duration-300"
          />
          <Image
            src={product.hoverImage}
            alt={product.title}
            fill
            className="rounded-lg object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <h2 className="mt-4 text-sm text-gray-800 font-semibold">{product.series}</h2>
        <h3 className="text-md text-black">{product.title}</h3>
        {product.sale ? (
          <div className="flex items-center">
            <p className="text-gray-500 line-through mr-2">${product.price}</p>
            <p className="text-red-500">${product.sale}</p>
          </div>
        ) : (
          <p className="text-black">${product.price}</p>
        )}
      </div>
    </Link>
  );
}
