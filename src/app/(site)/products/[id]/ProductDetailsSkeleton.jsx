import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="px-8 mx-auto w-full lg:max-w-[1200px] lg:flex lg:items-start lg:pt-5 animate-pulse">
        {/* --- Image Gallery Skeleton --- */}
        <div className="mx-auto flex flex-col items-center w-full max-w-[600px] md:w-[600px] lg:mr-10 lg:ml-auto shrink-0 gap-[1rem]">
          {/* Main Image Aspect Square */}
          <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden" />
          
          {/* Thumbnail Carousel Placeholder */}
          <div className="w-full flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 aspect-square bg-gray-200 rounded-md shrink-0" />
            ))}
          </div>
        </div>

        {/* --- Product Info Skeleton --- */}
        <div className="mr-auto w-full lg:w-[28rem] min-w-0 flex flex-col">
          {/* Series Link */}
          <div className="w-24 h-4 bg-gray-200 rounded mt-6 mb-2" />

          {/* Title */}
          <div className="w-3/4 h-8 bg-gray-300 rounded mb-2" />

          {/* Prices & Star Rating Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="w-24 h-7 bg-gray-200 rounded" />
            <div className="w-24 h-5 bg-gray-200 rounded" />
          </div>

          <hr className="border-gray-300 mt-4" />

          {/* Color Selector */}
          <div className="mt-4">
            <div className="w-24 h-4 bg-gray-200 rounded mb-3" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-4 bg-gray-200 rounded" />
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-wrap gap-2 pb-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-10 h-9 bg-gray-200 rounded-sm" />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-2">
            <div className="w-10 h-4 bg-gray-200 rounded mb-2" />
            <div className="w-28 h-11 bg-gray-200 rounded-sm" />
          </div>

          {/* Add to Cart Button */}
          <div className="w-full h-11 bg-gray-300 rounded-lg mt-7" />

          {/* Accordion 1: Product Details */}
          <div className="mt-5 pb-2 border-b border-gray-100 flex justify-between items-center">
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>

          {/* Accordion 2: Fabric Care */}
          <div className="mt-5 pb-2 border-b border-gray-100 flex justify-between items-center">
            <div className="w-28 h-4 bg-gray-200 rounded" />
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* --- Related Products Skeleton --- */}
      <section className="w-full max-w-[1200px] mx-auto px-8 animate-pulse">
        <hr className="my-13 border-gray-300" />
        <div className="flex justify-center mb-6">
          <div className="w-48 h-7 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 max-w-container my-0 mx-auto pb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

