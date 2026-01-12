export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="px-8 mx-auto lg:w-[1200px] lg:flex lg:pt-5 animate-pulse">
        {/* --- Image Gallery Skeleton --- */}
        <div className="mx-auto flex flex-col items-center md:w-[600px] md:h-[700px] lg:mr-20 lg:ml-auto gap-4">
          <div className="w-full h-[500px] bg-gray-200 rounded-lg relative" />
          <div className="w-full h-20 flex gap-2 overflow-x-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* --- Product Info Skeleton --- */}
        <div className="mr-auto lg:max-w-md flex flex-col gap-4">
          <div className="w-40 h-4 bg-gray-200 rounded mt-6" /> {/* Series */}
          <div className="w-80 h-8 bg-gray-300 rounded" /> {/* Title */}

          <div className="flex items-center gap-2">
            <div className="w-20 h-6 bg-gray-200 rounded" /> {/* Price */}
            <div className="w-20 h-6 bg-gray-300 rounded" /> {/* Compare Price */}
          </div>

          <hr className="text-gray-300 mt-4" />

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded" />
            <div className="w-full h-4 bg-gray-200 rounded" />
            <div className="w-3/4 h-4 bg-gray-200 rounded" />
          </div>

          {/* Size Selector Skeleton */}
          <div className="mt-4">
            <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-12 h-8 bg-gray-300 rounded" />
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart Skeleton */}
          <div className="flex gap-2 mt-6">
            <div className="w-24 h-10 bg-gray-300 rounded" /> {/* Quantity Box */}
            <div className="flex-1 h-10 bg-gray-400 rounded" /> {/* Add to Cart Button */}
          </div>
        </div>

        {/* Related Products Skeleton */}
      </div>
      <div className="mt-10 w-full">
        <hr className="my-13 text-gray-300"/>
        <div className="w-40 h-6 bg-gray-200 rounded mb-4" /> {/* Related Products Title */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full h-48 bg-gray-300 rounded-lg" />
          ))}
        </div>
      </div>
    </>
  );
}
