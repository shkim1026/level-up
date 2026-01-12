import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton() {
  return (
    <div>
      {/* Filters and Sort Skeleton */}
      <div className="flex justify-between mx-10 pt-8 mb-4">
        <div className="w-40 h-10 bg-gray-200 rounded" /> {/* FilterDrawer placeholder */}
        <div className="w-32 h-10 bg-gray-200 rounded" /> {/* FilterDropdown placeholder */}
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 mx-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}