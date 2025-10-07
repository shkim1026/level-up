"use Client";
import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductCard({ product }) {
  const formattedPrice = (priceInCents) => `$${(priceInCents / 100).toFixed(2)}`;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="rounded-2x1 p-4 bg-white flex flex-col items-center group">
        <div className="relative w-full aspect-square">
        {product.compare_at_price && (
          <p className="absolute right-px z-10 bg-red-500 px-3 py-1 rounded-sm text-white text-sm lowercase">Sale</p>
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
        <h2 className="mt-4 text-sm text-gray-800 font-semibold">{product.series}</h2>
        <h3 className={`text-md text-black text-center ${raleway.className}`}>{product.title}</h3>
        {product.compare_at_price ? (
          <div className="flex items-center">
            <p className="text-gray-500 line-through mr-2">{formattedPrice(product.price)}</p>
            <p className="text-red-500">{formattedPrice(product.compare_at_price)}</p>
          </div>
        ) : (
          <p className="text-black">{formattedPrice(product.price)}</p>
        )}
      </div>
    </Link>
  );
}
