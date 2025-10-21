"use Client";
import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { formattedPrice } from "@/utils/FormatPrice";
import { slugify } from "@/utils/Slugify";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductCard({ product }) {
  const savedCost = product.price - product.compare_at_price

  return (
    <div className="rounded-2x1 p-4 bg-white flex flex-col items-center group">
      <Link href={`/products/${product.id}`} className="block w-full">
        <div className="relative w-full aspect-square">
          {product.compare_at_price && (
            <p className="absolute left-px z-10 bg-red-500 px-2 py-1 text-white text-xs uppercase font-medium">
              {`Save ${formattedPrice(savedCost)}`}
            </p>
          )}
          <Image
            src={product.image.src}
            alt={product.title}
            fill
            className="rounded-lg object-cover group-hover:opacity-0 transition-opacity duration-300"
          />
          <Image
            src={product.metafields["hover-image"].src}
            alt={product.title}
            fill
            className="rounded-lg object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </Link>

      <Link href={`/collections/${slugify(product.metafields.series)}`}>
        <h2 className="mb-2 text-xs text-gray-800 font-semibold uppercase">
          {product.metafields.series}
        </h2>
      </Link>

      <Link href={`/products/${product.id}`}>
        <h3 className={`mb-1 text-sm text-black text-center uppercase tracking-wider ${raleway.className}`}>
          {product.title}
        </h3>
      
        {product.compare_at_price ? (
          <div className="flex flex-row items-center justify-center">
            <p className="text-red-500 mr-2">{formattedPrice(product.compare_at_price)}</p>
            <p className="text-gray-500 line-through">{formattedPrice(product.price)}</p>
          </div>
        ) : (
          <p className="text-black text-center">{formattedPrice(product.price)}</p>
        )}
      </Link>
    </div>

  );
}
