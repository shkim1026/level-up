"use Client";
import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { slugify } from "@/utils/Slugify";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductCard({ product }) {
  const savedCost = product.compareAtPrice - product.price

  return (
    <div className="rounded-2x1 p-4 bg-white flex flex-col items-center group">
      <Link href={`/products/${product.handle}`} className="block w-full">
        <div className="relative w-full aspect-square">
          {product.compareAtPrice && (
            <p className="absolute left-px z-10 bg-red-500 px-2 py-1 text-white text-xs uppercase font-medium">
              {`Save $${(savedCost)}`}
            </p>
          )}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-cover group-hover:opacity-0 transition-opacity duration-300"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg w-full h-full flex items-center justify-center text-gray-500">No Image</div>
          )}
          {product.images?.[1] && (
            <Image
              src={product.images[1].url}
              alt={product.images[1].altText}
              fill
              className="rounded-lg object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>
      </Link>

      <Link href={`/collections/${slugify(product.metafields.series)}`}>
        <h2 className="mb-2 text-xs text-gray-800 font-semibold uppercase">
          {product.metafields.series}
        </h2>
      </Link>

      <Link href={`/products/${product.handle}`}>
        <h3 className={`mb-1 text-sm text-black text-center uppercase tracking-wider ${raleway.className}`}>
          {product.title}
        </h3>
      
        {product.compareAtPrice ? (
          <div className="flex flex-row items-center justify-center">
            <p className="text-red-500 mr-2">${product.price}</p>
            <p className="text-gray-500 line-through">${product.compareAtPrice}</p>
          </div>
        ) : (
          <p className="text-black text-center">${product.price}</p>
        )}
      </Link>
    </div>

  );
}
