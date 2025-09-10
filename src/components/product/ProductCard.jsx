"use Client"
import Image from "next/image";

export default function ProductCard({ product }) {
    return(
        <div className="rounded-2x1 shadow-md p-4 bg-white flex flex-col items-center">
            <Image 
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-lg object-cover"
            />
            <h2 className="mt-4 text-lg text-gray-800 font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Add to Cart
            </button>
        </div>
    );
}