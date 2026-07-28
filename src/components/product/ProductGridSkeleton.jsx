import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton() {
  return (
    <div>
      {/* Mobile Page Title Skeleton */}
      <div className="block md:hidden pt-6 pb-4 flex justify-center animate-pulse">
        <div className="w-36 h-6 bg-gray-200 rounded" />
      </div>

      <div className="flex md:px-10 px-4 min-h-screen">
        {/* Desktop Filter Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-gray-300 animate-pulse">
          <div className="w-20 h-6 bg-gray-200 rounded my-6" />

          {/* Series Section */}
          <div className="mb-6 space-y-3">
            <div className="w-16 h-4 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-24 h-4 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-20 h-4 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-28 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6 space-y-3">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-20 h-4 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-24 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-6 space-y-3">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-20 h-4 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-16 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Top Bar Skeleton (Filter button/Count, Desktop Title, Sort Dropdown) */}
          <div className="flex place-content-between items-center max-w-container py-4 md:py-6 lg:px-5 animate-pulse">
            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
            <div className="hidden md:block w-36 h-8 bg-gray-200 rounded" />
            <div className="w-[10.5rem] h-9 bg-gray-200 rounded-lg" />
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 max-w-container pb-[5rem]">
            {Array.from({ length: 15 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}